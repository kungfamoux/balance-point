import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { requireAuth, AuthRequest } from "../middleware/auth";

const router = Router();

/**
 * @swagger
 * /api/investments:
 *   get:
 *     summary: Get own investments
 *     tags: [Investments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of investments with plan details
 */
router.get("/", requireAuth, async (req: AuthRequest, res) => {
  try {
    const investments = await prisma.investment.findMany({
      where: { userId: req.userId! },
      include: { plan: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(investments);
  } catch {
    res.status(500).json({ error: "Failed to fetch investments" });
  }
});

const createSchema = z.object({
  planId: z.string().uuid(),
  amount: z.number().positive(),
});

/**
 * @swagger
 * /api/investments:
 *   post:
 *     summary: Create a new investment
 *     tags: [Investments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [planId, amount]
 *             properties:
 *               planId:
 *                 type: string
 *                 format: uuid
 *               amount:
 *                 type: number
 *     responses:
 *       201:
 *         description: Investment created
 *       400:
 *         description: Insufficient balance or invalid amount
 *       404:
 *         description: Plan not found
 */
router.post("/", requireAuth, async (req: AuthRequest, res) => {
  const parsed = createSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }

  const { planId, amount } = parsed.data;

  try {
    const plan = await prisma.plan.findUnique({ where: { id: planId } });
    if (!plan) {
      res.status(404).json({ error: "Plan not found" });
      return;
    }

    if (amount < Number(plan.minDeposit) || amount > Number(plan.maxDeposit)) {
      res.status(400).json({
        error: `Amount must be between $${plan.minDeposit} and $${plan.maxDeposit}`,
      });
      return;
    }

    const wallet = await prisma.wallet.findUnique({ where: { userId: req.userId! } });
    if (!wallet || Number(wallet.balance) < amount) {
      res.status(400).json({ error: "Insufficient balance" });
      return;
    }

    const endAt = new Date();
    endAt.setDate(endAt.getDate() + plan.durationDays);

    const [investment] = await prisma.$transaction([
      prisma.investment.create({
        data: {
          userId: req.userId!,
          planId,
          amount,
          roiPercent: plan.roiPercent,
          endAt,
        },
        include: { plan: true },
      }),
      prisma.wallet.update({
        where: { userId: req.userId! },
        data: {
          balance: { decrement: amount },
          activeInvestment: { increment: amount },
        },
      }),
      prisma.transaction.create({
        data: {
          userId: req.userId!,
          type: "investment",
          amount,
          status: "completed",
          meta: { planId, planName: plan.name },
        },
      }),
    ]);

    res.status(201).json(investment);
  } catch {
    res.status(500).json({ error: "Failed to create investment" });
  }
});

export default router;
