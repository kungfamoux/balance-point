import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { requireAuth, AuthRequest } from "../middleware/auth";

const router = Router();

/**
 * @swagger
 * /api/transactions:
 *   get:
 *     summary: Get own transactions
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 50
 *           maximum: 100
 *         description: Max number of transactions to return
 *     responses:
 *       200:
 *         description: List of transactions
 */
router.get("/", requireAuth, async (req: AuthRequest, res) => {
  try {
    const limit = Math.min(Number(req.query.limit ?? 50), 100);
    const transactions = await prisma.transaction.findMany({
      where: { userId: req.userId! },
      orderBy: { createdAt: "desc" },
      take: limit,
    });
    res.json(transactions);
  } catch {
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
});

const depositSchema = z.object({
  amount: z.number().positive(),
  gateway: z.string().min(1),
  meta: z.record(z.unknown()).optional(),
});

/**
 * @swagger
 * /api/transactions/deposit:
 *   post:
 *     summary: Submit a deposit request
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [amount, gateway]
 *             properties:
 *               amount:
 *                 type: number
 *               gateway:
 *                 type: string
 *               meta:
 *                 type: object
 *     responses:
 *       201:
 *         description: Deposit transaction created
 */
router.post("/deposit", requireAuth, async (req: AuthRequest, res) => {
  const parsed = depositSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }

  try {
    const tx = await prisma.transaction.create({
      data: {
        userId: req.userId!,
        type: "deposit",
        gateway: parsed.data.gateway,
        amount: parsed.data.amount,
        status: "pending",
        meta: parsed.data.meta ?? {},
      },
    });
    res.status(201).json(tx);
  } catch {
    res.status(500).json({ error: "Failed to create deposit" });
  }
});

const withdrawSchema = z.object({
  amount: z.number().positive(),
  gateway: z.string().min(1),
  meta: z.record(z.unknown()).optional(),
});

/**
 * @swagger
 * /api/transactions/withdraw:
 *   post:
 *     summary: Submit a withdrawal request
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [amount, gateway]
 *             properties:
 *               amount:
 *                 type: number
 *               gateway:
 *                 type: string
 *               meta:
 *                 type: object
 *     responses:
 *       201:
 *         description: Withdrawal transaction created
 *       400:
 *         description: Insufficient balance
 */
router.post("/withdraw", requireAuth, async (req: AuthRequest, res) => {
  const parsed = withdrawSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }

  try {
    const wallet = await prisma.wallet.findUnique({ where: { userId: req.userId! } });
    if (!wallet || Number(wallet.balance) < parsed.data.amount) {
      res.status(400).json({ error: "Insufficient balance" });
      return;
    }

    const tx = await prisma.transaction.create({
      data: {
        userId: req.userId!,
        type: "withdrawal",
        gateway: parsed.data.gateway,
        amount: parsed.data.amount,
        status: "pending",
        meta: parsed.data.meta ?? {},
      },
    });
    res.status(201).json(tx);
  } catch {
    res.status(500).json({ error: "Failed to create withdrawal" });
  }
});

/**
 * @swagger
 * /api/transactions/{id}/cancel:
 *   patch:
 *     summary: Cancel a pending withdrawal
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 */
router.patch("/:id/cancel", requireAuth, async (req: AuthRequest, res) => {
  const id = req.params.id as string;
  try {
    const tx = await prisma.transaction.findUnique({ where: { id } });
    if (!tx) {
      res.status(404).json({ error: "Transaction not found" });
      return;
    }
    if (tx.userId !== req.userId) {
      res.status(403).json({ error: "Not authorized" });
      return;
    }
    if (tx.type !== "withdrawal" || tx.status !== "pending") {
      res.status(400).json({ error: "Can only cancel pending withdrawals" });
      return;
    }

    const updated = await prisma.transaction.update({
      where: { id },
      data: { status: "cancelled" },
    });
    res.json(updated);
  } catch {
    res.status(500).json({ error: "Failed to cancel withdrawal" });
  }
});

export default router;
