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

// ── Payment Suspension Status (public - no auth required) ─────────────────────
/**
 * @swagger
 * /api/admin/payment-status:
 *   get:
 *     summary: Get payment suspension status
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Payment suspension status
 */
router.get("/payment-status", (req: Request, res: Response) => {
  const isSuspended = process.env.PAYMENT_SUSPENDED === "true";
  res.json({ suspended: isSuspended });
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
    pendingKyc,
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
    prisma.kycDocument.count({ where: { status: "pending" } }),
  ]);

  res.json({
    totalUsers,
    totalInvestments,
    totalDeposited: totalDeposited._sum.amount ?? 0,
    totalWithdrawn: totalWithdrawn._sum.amount ?? 0,
    pendingDeposits,
    pendingWithdrawals,
    pendingKyc,
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
  try {
    const [profile, wallet, investments, transactions] = await Promise.all([
      prisma.profile.findUnique({ where: { id } }),
      prisma.wallet.findUnique({ where: { userId: id } }),
      prisma.investment.findMany({ where: { userId: id }, include: { plan: true } }),
      prisma.transaction.findMany({ where: { userId: id }, orderBy: { createdAt: "desc" } }),
    ]);
    if (!profile) { res.status(404).json({ error: "User not found" }); return; }
    res.json({ profile, wallet, investments, transactions });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ error: "Failed to fetch user details" });
  }
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
 * /api/admin/users/{id}/deposit:
 *   post:
 *     summary: Add money to user wallet
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.post("/users/:id/deposit", async (req: AdminRequest, res: Response) => {
  const userId = (req.params.id as string);
  const { amount } = req.body as { amount: number };
  
  // Update wallet balance
  const wallet = await prisma.wallet.upsert({
    where: { userId },
    create: { userId, balance: amount },
    update: { balance: { increment: amount } },
  });

  // Create transaction record for the deposit
  await prisma.transaction.create({
    data: {
      userId,
      type: "deposit",
      gateway: "admin",
      amount: amount,
      status: "completed",
      meta: { admin_deposit: true },
    },
  });

  res.json(wallet);
});

/**
 * @swagger
 * /api/admin/users/{id}/profit:
 *   patch:
 *     summary: Adjust user wallet total profit
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.patch("/users/:id/profit", async (req: AdminRequest, res: Response) => {
  const userId = (req.params.id as string);
  const { totalProfit } = req.body as { totalProfit: number };
  const wallet = await prisma.wallet.upsert({
    where: { userId },
    create: { userId, totalProfit },
    update: { totalProfit },
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

/**
 * @swagger
 * /api/admin/users/{id}/plan-assignments:
 *   get:
 *     summary: Get user's plan assignments
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.get("/users/:id/plan-assignments", async (req: AdminRequest, res: Response) => {
  const userId = (req.params.id as string);
  const assignments = await prisma.planAssignment.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
  
  // Fetch plans separately
  const planIds = assignments.map(a => a.planId);
  const plans = await prisma.plan.findMany({
    where: { id: { in: planIds } },
  });
  
  const planMap = new Map(plans.map(p => [p.id, p]));
  
  const enrichedAssignments = assignments.map(a => ({
    ...a,
    plan: planMap.get(a.planId),
  }));
  
  res.json(enrichedAssignments);
});

/**
 * @swagger
 * /api/admin/users/{id}/plan-assignments:
 *   post:
 *     summary: Assign user to a plan
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.post("/users/:id/plan-assignments", async (req: AdminRequest, res: Response) => {
  const userId = (req.params.id as string);
  const { planId, amount } = req.body as { planId: string; amount: number };
  
  const plan = await prisma.plan.findUnique({ where: { id: planId } });
  if (!plan) {
    res.status(404).json({ error: "Plan not found" });
    return;
  }

  const endAt = new Date();
  endAt.setDate(endAt.getDate() + plan.durationDays);

  const [assignment] = await prisma.$transaction([
    prisma.planAssignment.create({
      data: {
        userId,
        planId,
        amount,
        roiPercent: plan.roiPercent,
        endAt,
      },
    }),
    prisma.transaction.create({
      data: {
        userId,
        type: "plan_assignment",
        gateway: "admin",
        amount,
        status: "completed",
        meta: { planId, planName: plan.name },
      },
    }),
  ]);

  res.status(201).json(assignment);
});

/**
 * @swagger
 * /api/admin/plan-assignments/{id}:
 *   patch:
 *     summary: Update plan assignment status
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.patch("/plan-assignments/:id", async (req: AdminRequest, res: Response) => {
  const id = (req.params.id as string);
  const { status } = req.body as { status: string };
  
  const assignment = await prisma.planAssignment.update({
    where: { id },
    data: { status },
  });
  
  res.json(assignment);
});

/**
 * @swagger
 * /api/admin/plan-assignments/{id}:
 *   delete:
 *     summary: Delete plan assignment
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.delete("/plan-assignments/:id", async (req: AdminRequest, res: Response) => {
  const id = (req.params.id as string);
  await prisma.planAssignment.delete({ where: { id } });
  res.status(204).send();
});

/**
 * @swagger
 * /api/admin/users/{id}:
 *   delete:
 *     summary: Delete user account and all associated data
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.delete("/users/:id", async (req: AdminRequest, res: Response) => {
  const id = (req.params.id as string);
  try {
    // Delete all associated data in correct order due to foreign key constraints
    await prisma.$transaction([
      prisma.ticketMessage.deleteMany({ where: { userId: id } }),
      prisma.ticket.deleteMany({ where: { userId: id } }),
      prisma.kycDocument.deleteMany({ where: { userId: id } }),
      prisma.copyFollow.deleteMany({ where: { userId: id } }),
      prisma.referral.deleteMany({ where: { referrerId: id } }),
      prisma.referral.deleteMany({ where: { referredId: id } }),
      prisma.transaction.deleteMany({ where: { userId: id } }),
      prisma.investment.deleteMany({ where: { userId: id } }),
      prisma.wallet.deleteMany({ where: { userId: id } }),
      prisma.profile.delete({ where: { id } }),
    ]);
    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

/**
 * @swagger
 * /api/admin/kyc:
 *   get:
 *     summary: List all pending KYC submissions
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.get("/kyc", async (_req: AdminRequest, res: Response) => {
  const kycDocs = await prisma.kycDocument.findMany({
    where: { status: "pending" },
    include: { profile: true },
    orderBy: { createdAt: "desc" },
  });
  res.json(kycDocs);
});

/**
 * @swagger
 * /api/admin/kyc/{id}:
 *   patch:
 *     summary: Approve or reject a KYC document
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.patch("/kyc/:id", async (req: AdminRequest, res: Response) => {
  const id = (req.params.id as string);
  const { status } = req.body as { status: string };
  const kycDoc = await prisma.kycDocument.update({
    where: { id },
    data: { status },
    include: { profile: true },
  });

  // If approving all documents for a user, update their KYC status
  if (status === "approved") {
    const pendingDocs = await prisma.kycDocument.findMany({
      where: { userId: kycDoc.userId, status: "pending" },
    });
    if (pendingDocs.length === 0) {
      await prisma.profile.update({
        where: { id: kycDoc.userId },
        data: { kycStatus: "verified" },
      });
    }
  } else if (status === "rejected") {
    await prisma.profile.update({
      where: { id: kycDoc.userId },
      data: { kycStatus: "rejected" },
    });
  }

  res.json(kycDoc);
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

/**
 * @swagger
 * /api/admin/investments/{id}:
 *   patch:
 *     summary: Update an investment (status, profit, etc.)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.patch("/investments/:id", async (req: AdminRequest, res: Response) => {
  const id = (req.params.id as string);
  const { status, profit, amount } = req.body as { status?: string; profit?: number; amount?: number };
  const investment = await prisma.investment.update({
    where: { id },
    data: {
      ...(status ? { status } : {}),
      ...(profit !== undefined ? { profit } : {}),
      ...(amount !== undefined ? { amount } : {}),
    },
    include: { plan: true },
  });
  res.json(investment);
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

// ── Live Sessions ─────────────────────────────────────────────────────────────
/**
 * @swagger
 * /api/admin/sessions:
 *   get:
 *     summary: List all live sessions
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.get("/sessions", async (_req: AdminRequest, res: Response) => {
  const sessions = await prisma.liveSession.findMany({
    orderBy: [{ sortOrder: "asc" }, { scheduledAt: "asc" }],
  });
  res.json(sessions);
});

/**
 * @swagger
 * /api/admin/sessions:
 *   post:
 *     summary: Create a live session
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.post("/sessions", async (req: AdminRequest, res: Response) => {
  const { title, host, role, avatarLabel, topic, status, scheduledAt, duration, embedUrl, tags, premium, sortOrder } = req.body;
  const session = await prisma.liveSession.create({
    data: {
      title, host, role, avatarLabel, topic,
      status: status ?? "upcoming",
      scheduledAt: new Date(scheduledAt),
      duration,
      embedUrl: embedUrl ?? null,
      tags: tags ?? [],
      premium: premium ?? false,
      sortOrder: sortOrder ?? 0,
    },
  });
  res.status(201).json(session);
});

/**
 * @swagger
 * /api/admin/sessions/{id}:
 *   patch:
 *     summary: Update a live session
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.patch("/sessions/:id", async (req: AdminRequest, res: Response) => {
  const id = req.params.id as string;
  const data = { ...req.body };
  if (data.scheduledAt) data.scheduledAt = new Date(data.scheduledAt);
  const session = await prisma.liveSession.update({ where: { id }, data });
  res.json(session);
});

/**
 * @swagger
 * /api/admin/sessions/{id}:
 *   delete:
 *     summary: Delete a live session
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.delete("/sessions/:id", async (req: AdminRequest, res: Response) => {
  const id = req.params.id as string;
  await prisma.liveSession.delete({ where: { id } });
  res.status(204).send();
});

// ── Support Tickets ─────────────────────────────────────────────────────────────
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
    include: {
      messages: {
        orderBy: { createdAt: "asc" },
      },
    },
    orderBy: { createdAt: "desc" },
  });
  res.json(tickets);
});

/**
 * @swagger
 * /api/admin/tickets/{id}:
 *   get:
 *     summary: Get ticket details
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.get("/tickets/:id", async (req: AdminRequest, res: Response) => {
  const id = req.params.id as string;
  const ticket = await prisma.ticket.findUnique({
    where: { id },
    include: {
      messages: {
        orderBy: { createdAt: "asc" },
      },
    },
  });
  if (!ticket) {
    res.status(404).json({ error: "Ticket not found" });
    return;
  }
  res.json(ticket);
});

/**
 * @swagger
 * /api/admin/tickets/{id}/reply:
 *   post:
 *     summary: Reply to a support ticket as admin
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.post("/tickets/:id/reply", async (req: AdminRequest, res: Response) => {
  const id = req.params.id as string;
  const { body } = req.body as { body: string };
  
  const ticket = await prisma.ticket.findUnique({ where: { id } });
  if (!ticket) {
    res.status(404).json({ error: "Ticket not found" });
    return;
  }

  const message = await prisma.ticketMessage.create({
    data: {
      ticketId: id,
      userId: ticket.userId,
      body,
      isAdmin: true,
    },
  });

  // Update ticket status if it was closed
  if (ticket.status === "closed") {
    await prisma.ticket.update({
      where: { id },
      data: { status: "open" },
    });
  }

  res.status(201).json(message);
});

/**
 * @swagger
 * /api/admin/tickets/{id}/status:
 *   patch:
 *     summary: Update ticket status
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.patch("/tickets/:id/status", async (req: AdminRequest, res: Response) => {
  const id = req.params.id as string;
  const { status } = req.body as { status: string };
  
  const ticket = await prisma.ticket.update({
    where: { id },
    data: { status },
  });
  res.json(ticket);
});

/**
 * @swagger
 * /api/admin/tickets/{id}:
 *   delete:
 *     summary: Delete a ticket
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.delete("/tickets/:id", async (req: AdminRequest, res: Response) => {
  const id = req.params.id as string;
  await prisma.ticketMessage.deleteMany({ where: { ticketId: id } });
  await prisma.ticket.delete({ where: { id } });
  res.status(204).send();
});

// ── Referrals ───────────────────────────────────────────────────────────────────
/**
 * @swagger
 * /api/admin/referrals:
 *   get:
 *     summary: List all referrals
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.get("/referrals", async (_req: AdminRequest, res: Response) => {
  const referrals = await prisma.referral.findMany({
    orderBy: { createdAt: "desc" },
  });
  
  // Fetch profiles separately
  const userIds = [...new Set([...referrals.map(r => r.referrerId), ...referrals.map(r => r.referredId)])];
  const profiles = await prisma.profile.findMany({
    where: { id: { in: userIds } },
    select: { id: true, email: true, fullName: true },
  });
  
  const profileMap = new Map(profiles.map(p => [p.id, p]));
  
  const enrichedReferrals = referrals.map(r => ({
    ...r,
    referrer: profileMap.get(r.referrerId),
    referred: profileMap.get(r.referredId),
  }));
  
  res.json(enrichedReferrals);
});

/**
 * @swagger
 * /api/admin/referrals/tree/{userId}:
 *   get:
 *     summary: Get referral tree for a user
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.get("/referrals/tree/:userId", async (req: AdminRequest, res: Response) => {
  const userId = req.params.userId as string;
  
  // Get all referrals where this user is the referrer
  const directReferrals = await prisma.referral.findMany({
    where: { referrerId: userId },
    orderBy: { createdAt: "desc" },
  });

  // Fetch referred profiles separately
  const referredIds = directReferrals.map(r => r.referredId);
  const profiles = await prisma.profile.findMany({
    where: { id: { in: referredIds } },
    select: { id: true, email: true, fullName: true, createdAt: true },
  });
  
  const profileMap = new Map(profiles.map(p => [p.id, p]));
  
  const enrichedReferrals = directReferrals.map(r => ({
    ...r,
    referred: profileMap.get(r.referredId),
  }));

  // Get total referral earnings for this user
  const totalEarnings = await prisma.referral.aggregate({
    where: { referrerId: userId },
    _sum: { bonusAmount: true },
  });

  res.json({
    userId,
    directReferrals: enrichedReferrals,
    totalEarnings: totalEarnings._sum.bonusAmount ?? 0,
    referralCount: directReferrals.length,
  });
});

/**
 * @swagger
 * /api/admin/referrals/{id}/earnings:
 *   patch:
 *     summary: Adjust referral earnings
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.patch("/referrals/:id/earnings", async (req: AdminRequest, res: Response) => {
  const id = req.params.id as string;
  const { bonusAmount } = req.body as { bonusAmount: number };
  
  const referral = await prisma.referral.update({
    where: { id },
    data: { bonusAmount },
  });

  // Fetch profiles separately
  const [referrer, referred] = await Promise.all([
    prisma.profile.findUnique({
      where: { id: referral.referrerId },
      select: { id: true, email: true },
    }),
    prisma.profile.findUnique({
      where: { id: referral.referredId },
      select: { id: true, email: true },
    }),
  ]);

  // Update wallet referral earnings
  await prisma.wallet.upsert({
    where: { userId: referral.referrerId },
    create: { userId: referral.referrerId, referralEarnings: bonusAmount },
    update: { referralEarnings: bonusAmount },
  });

  res.json({
    ...referral,
    referrer,
    referred,
  });
});

export default router;
