import { Router, Request, Response } from "express";
import { SignJWT } from "jose";
import { prisma } from "../lib/prisma";
import { adminAuth, AdminRequest } from "../middleware/adminAuth";

const router = Router();

// ── Admin Login ───────────────────────────────────────────────────────────────
/**
 * @swagger
 * /api/admin/login:
 *   post:
 *     summary: Admin login
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: { type: string }
 *               password: { type: string }
 *     responses:
 *       200:
 *         description: Admin JWT token
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body as { email: string; password: string };
  if (
    email !== process.env.ADMIN_EMAIL ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }
  const secret = process.env.ADMIN_JWT_SECRET!;
  const key = new TextEncoder().encode(secret);
  const token = await new SignJWT({ email, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("8h")
    .sign(key);
  res.json({ token });
});

// ─── All routes below require admin JWT ──────────────────────────────────────
router.use(adminAuth);

// ── Stats ─────────────────────────────────────────────────────────────────────
/**
 * @swagger
 * /api/admin/stats:
 *   get:
 *     summary: Platform overview stats
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.get("/stats", async (_req: AdminRequest, res: Response) => {
  const [
    totalUsers,
    totalInvestments,
    totalDeposited,
    totalWithdrawn,
    pendingDeposits,
    pendingWithdrawals,
    openTickets,
  ] = await Promise.all([
    prisma.profile.count(),
    prisma.investment.count(),
    prisma.transaction.aggregate({
      _sum: { amount: true },
      where: { type: "deposit", status: "approved" },
    }),
    prisma.transaction.aggregate({
      _sum: { amount: true },
      where: { type: "withdrawal", status: "approved" },
    }),
    prisma.transaction.count({ where: { type: "deposit", status: "pending" } }),
    prisma.transaction.count({ where: { type: "withdrawal", status: "pending" } }),
    prisma.ticket.count({ where: { status: { not: "closed" } } }),
  ]);

  res.json({
    totalUsers,
    totalInvestments,
    totalDeposited: totalDeposited._sum.amount ?? 0,
    totalWithdrawn: totalWithdrawn._sum.amount ?? 0,
    pendingDeposits,
    pendingWithdrawals,
    openTickets,
  });
});

// ── Users ─────────────────────────────────────────────────────────────────────
/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: List all users
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.get("/users", async (_req: AdminRequest, res: Response) => {
  const users = await prisma.profile.findMany({
    orderBy: { createdAt: "desc" },
  });
  res.json(users);
});

/**
 * @swagger
 * /api/admin/users/{id}:
 *   get:
 *     summary: Get user details
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 */
router.get("/users/:id", async (req: AdminRequest, res: Response) => {
  const id = (req.params.id as string);
  const [profile, wallet, investments, transactions] = await Promise.all([
    prisma.profile.findUnique({ where: { id } }),
    prisma.wallet.findUnique({ where: { userId: id } }),
    prisma.investment.findMany({ where: { userId: id }, include: { plan: true } }),
    prisma.transaction.findMany({ where: { userId: id }, orderBy: { createdAt: "desc" } }),
  ]);
  if (!profile) { res.status(404).json({ error: "User not found" }); return; }
  res.json({ profile, wallet, investments, transactions });
});

/**
 * @swagger
 * /api/admin/users/{id}/balance:
 *   patch:
 *     summary: Adjust user wallet balance
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.patch("/users/:id/balance", async (req: AdminRequest, res: Response) => {
  const userId = (req.params.id as string);
  const { balance } = req.body as { balance: number };
  const wallet = await prisma.wallet.upsert({
    where: { userId },
    create: { userId, balance },
    update: { balance },
  });
  res.json(wallet);
});

/**
 * @swagger
 * /api/admin/users/{id}/kyc:
 *   patch:
 *     summary: Update KYC status (verified | unverified | rejected)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.patch("/users/:id/kyc", async (req: AdminRequest, res: Response) => {
  const id = (req.params.id as string);
  const { kycStatus } = req.body as { kycStatus: string };
  const profile = await prisma.profile.update({ where: { id }, data: { kycStatus } });
  res.json(profile);
});

// ── Transactions ──────────────────────────────────────────────────────────────
/**
 * @swagger
 * /api/admin/transactions:
 *   get:
 *     summary: List all transactions (optionally filter by type/status)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.get("/transactions", async (req: AdminRequest, res: Response) => {
  const type = req.query.type as string | undefined;
  const status = req.query.status as string | undefined;
  const transactions = await prisma.transaction.findMany({
    where: {
      ...(type ? { type } : {}),
      ...(status ? { status } : {}),
    },
    orderBy: { createdAt: "desc" },
  });
  res.json(transactions);
});

/**
 * @swagger
 * /api/admin/transactions/{id}/approve:
 *   patch:
 *     summary: Approve a transaction and credit/debit wallet
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.patch("/transactions/:id/approve", async (req: AdminRequest, res: Response) => {
  const id = (req.params.id as string);
  const tx = await prisma.transaction.findUnique({ where: { id } });
  if (!tx) { res.status(404).json({ error: "Transaction not found" }); return; }

  const updated = await prisma.$transaction(async (p) => {
    const t = await p.transaction.update({ where: { id }, data: { status: "approved" } });
    const wallet = await p.wallet.findUnique({ where: { userId: tx.userId } });
    const current = Number(wallet?.balance ?? 0);
    const amt = Number(tx.amount);
    if (tx.type === "deposit") {
      await p.wallet.upsert({
        where: { userId: tx.userId },
        create: { userId: tx.userId, balance: amt },
        update: { balance: current + amt },
      });
    } else if (tx.type === "withdrawal") {
      await p.wallet.upsert({
        where: { userId: tx.userId },
        create: { userId: tx.userId, balance: 0 },
        update: { balance: Math.max(0, current - amt) },
      });
    }
    return t;
  });
  res.json(updated);
});

/**
 * @swagger
 * /api/admin/transactions/{id}/reject:
 *   patch:
 *     summary: Reject a transaction
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.patch("/transactions/:id/reject", async (req: AdminRequest, res: Response) => {
  const id = (req.params.id as string);
  const updated = await prisma.transaction.update({ where: { id }, data: { status: "rejected" } });
  res.json(updated);
});

// ── Plans ─────────────────────────────────────────────────────────────────────
/**
 * @swagger
 * /api/admin/plans:
 *   get:
 *     summary: List all investment plans
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.get("/plans", async (_req: AdminRequest, res: Response) => {
  const plans = await prisma.plan.findMany({ orderBy: { sortOrder: "asc" } });
  res.json(plans);
});

/**
 * @swagger
 * /api/admin/plans:
 *   post:
 *     summary: Create an investment plan
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.post("/plans", async (req: AdminRequest, res: Response) => {
  const { slug, name, tagline, minDeposit, maxDeposit, roiPercent, referralPercent, durationDays, sortOrder } = req.body;
  const plan = await prisma.plan.create({
    data: { slug, name, tagline, minDeposit, maxDeposit, roiPercent, referralPercent, durationDays, sortOrder },
  });
  res.status(201).json(plan);
});

/**
 * @swagger
 * /api/admin/plans/{id}:
 *   patch:
 *     summary: Update an investment plan
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.patch("/plans/:id", async (req: AdminRequest, res: Response) => {
  const id = (req.params.id as string);
  const plan = await prisma.plan.update({ where: { id }, data: req.body });
  res.json(plan);
});

/**
 * @swagger
 * /api/admin/plans/{id}:
 *   delete:
 *     summary: Delete an investment plan
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.delete("/plans/:id", async (req: AdminRequest, res: Response) => {
  const id = (req.params.id as string);
  await prisma.plan.delete({ where: { id } });
  res.status(204).send();
});

// ── Investments ───────────────────────────────────────────────────────────────
/**
 * @swagger
 * /api/admin/investments:
 *   get:
 *     summary: List all investments
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.get("/investments", async (_req: AdminRequest, res: Response) => {
  const investments = await prisma.investment.findMany({
    orderBy: { createdAt: "desc" },
    include: { plan: true },
  });
  res.json(investments);
});

// ── Tickets ───────────────────────────────────────────────────────────────────
/**
 * @swagger
 * /api/admin/tickets:
 *   get:
 *     summary: List all support tickets
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.get("/tickets", async (_req: AdminRequest, res: Response) => {
  const tickets = await prisma.ticket.findMany({
    orderBy: { createdAt: "desc" },
    include: { messages: { orderBy: { createdAt: "asc" } } },
  });
  res.json(tickets);
});

/**
 * @swagger
 * /api/admin/tickets/{id}/reply:
 *   post:
 *     summary: Reply to a ticket (as admin)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.post("/tickets/:id/reply", async (req: AdminRequest, res: Response) => {
  const ticketId = (req.params.id as string);
  const { body } = req.body as { body: string };
  // Use a sentinel UUID for admin userId
  const ADMIN_USER_ID = "00000000-0000-0000-0000-000000000000";
  const msg = await prisma.ticketMessage.create({
    data: { ticketId, userId: ADMIN_USER_ID, body },
  });
  res.status(201).json(msg);
});

/**
 * @swagger
 * /api/admin/tickets/{id}/close:
 *   patch:
 *     summary: Close a ticket
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.patch("/tickets/:id/close", async (req: AdminRequest, res: Response) => {
  const id = (req.params.id as string);
  const ticket = await prisma.ticket.update({ where: { id }, data: { status: "closed" } });
  res.json(ticket);
});

// ── Public Ledger ─────────────────────────────────────────────────────────────
/**
 * @swagger
 * /api/admin/ledger:
 *   get:
 *     summary: List all public ledger entries
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.get("/ledger", async (_req: AdminRequest, res: Response) => {
  const entries = await prisma.publicLedger.findMany({ orderBy: { sortOrder: "asc" } });
  res.json(entries);
});

/**
 * @swagger
 * /api/admin/ledger:
 *   post:
 *     summary: Create a ledger entry
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.post("/ledger", async (req: AdminRequest, res: Response) => {
  const { kind, gateway, name, amount, hoursAgo, sortOrder } = req.body;
  const entry = await prisma.publicLedger.create({
    data: { kind, gateway, name, amount, hoursAgo, sortOrder: sortOrder ?? 0 },
  });
  res.status(201).json(entry);
});

/**
 * @swagger
 * /api/admin/ledger/{id}:
 *   patch:
 *     summary: Update a ledger entry
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.patch("/ledger/:id", async (req: AdminRequest, res: Response) => {
  const id = (req.params.id as string);
  const entry = await prisma.publicLedger.update({ where: { id }, data: req.body });
  res.json(entry);
});

/**
 * @swagger
 * /api/admin/ledger/{id}:
 *   delete:
 *     summary: Delete a ledger entry
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.delete("/ledger/:id", async (req: AdminRequest, res: Response) => {
  const id = (req.params.id as string);
  await prisma.publicLedger.delete({ where: { id } });
  res.status(204).send();
});

export default router;
