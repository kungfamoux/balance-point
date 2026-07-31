import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { requireAuth, AuthRequest } from "../middleware/auth";

const router = Router();

/**
 * @swagger
 * /api/trades:
 *   get:
 *     summary: Get own trade history
 *     tags: [Trades]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 50
 *           maximum: 100
 *         description: Max number of trades to return
 *     responses:
 *       200:
 *         description: List of trades
 */
router.get("/", requireAuth, async (req: AuthRequest, res) => {
  try {
    const limit = Math.min(Number(req.query.limit ?? 50), 100);
    const trades = await prisma.trade.findMany({
      where: { userId: req.userId! },
      orderBy: { createdAt: "desc" },
      take: limit,
    });
    res.json(trades);
  } catch {
    res.status(500).json({ error: "Failed to fetch trades" });
  }
});

const createTradeSchema = z.object({
  type: z.enum(["buy", "sell"]),
  symbol: z.string().min(1),
  amount: z.number().positive(),
  entryPrice: z.number().positive(),
  leverage: z.number().int().min(1).default(1),
});

/**
 * @swagger
 * /api/trades:
 *   post:
 *     summary: Create a new trade
 *     tags: [Trades]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [type, symbol, amount, entryPrice]
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [buy, sell]
 *               symbol:
 *                 type: string
 *               amount:
 *                 type: number
 *               entryPrice:
 *                 type: number
 *               leverage:
 *                 type: integer
 *                 default: 1
 *     responses:
 *       201:
 *         description: Trade created successfully
 *       400:
 *         description: Insufficient balance
 */
router.post("/", requireAuth, async (req: AuthRequest, res) => {
  const parsed = createTradeSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }

  try {
    const { type, symbol, amount, entryPrice, leverage } = parsed.data;

    // Check wallet balance
    const wallet = await prisma.wallet.findUnique({ where: { userId: req.userId! } });
    if (!wallet || Number(wallet.balance) < amount) {
      res.status(400).json({ error: "Insufficient balance" });
      return;
    }

    // Deduct amount from wallet
    await prisma.wallet.update({
      where: { userId: req.userId! },
      data: { balance: { decrement: amount } },
    });

    // Create trade
    const trade = await prisma.trade.create({
      data: {
        userId: req.userId!,
        type,
        symbol,
        amount,
        entryPrice,
        leverage,
        status: "open",
      },
    });

    res.status(201).json(trade);
  } catch {
    res.status(500).json({ error: "Failed to create trade" });
  }
});

const closeTradeSchema = z.object({
  exitPrice: z.number().positive(),
});

/**
 * @swagger
 * /api/trades/{id}/close:
 *   patch:
 *     summary: Close a trade position
 *     tags: [Trades]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [exitPrice]
 *             properties:
 *               exitPrice:
 *                 type: number
 *     responses:
 *       200:
 *         description: Trade closed successfully
 *       400:
 *         description: Trade already closed or not found
 */
router.patch("/:id/close", requireAuth, async (req: AuthRequest, res) => {
  const id = req.params.id as string;
  const parsed = closeTradeSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }

  try {
    const trade = await prisma.trade.findUnique({ where: { id } });
    if (!trade) {
      res.status(404).json({ error: "Trade not found" });
      return;
    }
    if (trade.userId !== req.userId) {
      res.status(403).json({ error: "Not authorized" });
      return;
    }
    if (trade.status !== "open") {
      res.status(400).json({ error: "Trade already closed" });
      return;
    }

    const { exitPrice } = parsed.data;

    // Calculate profit/loss
    const priceDiff = trade.type === "buy" 
      ? exitPrice - Number(trade.entryPrice)
      : Number(trade.entryPrice) - exitPrice;
    const profitLoss = priceDiff * Number(trade.amount) * trade.leverage;

    // Close trade
    const updatedTrade = await prisma.trade.update({
      where: { id },
      data: {
        exitPrice,
        profitLoss,
        status: "closed",
        exitTime: new Date(),
      },
    });

    // Update wallet balance
    await prisma.wallet.update({
      where: { userId: req.userId! },
      data: { 
        balance: { increment: Number(trade.amount) + profitLoss },
        totalProfit: { increment: profitLoss > 0 ? profitLoss : 0 },
      },
    });

    res.json(updatedTrade);
  } catch {
    res.status(500).json({ error: "Failed to close trade" });
  }
});

export default router;
