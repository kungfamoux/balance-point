import { Router } from "express";
import { prisma } from "../lib/prisma";
import { requireAuth, AuthRequest } from "../middleware/auth";

const router = Router();

/**
 * @swagger
 * /api/wallet:
 *   get:
 *     summary: Get own wallet (auto-creates if missing)
 *     tags: [Wallet]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Wallet object with balance, activeInvestment, totalEarnings
 */
router.get("/", requireAuth, async (req: AuthRequest, res) => {
  try {
    let wallet = await prisma.wallet.findUnique({
      where: { userId: req.userId! },
    });

    // Auto-create wallet if it doesn't exist (safety net)
    if (!wallet) {
      wallet = await prisma.wallet.create({
        data: { userId: req.userId! },
      });
    }

    // Fetch active plan assignment
    const activeAssignment = await prisma.planAssignment.findFirst({
      where: { 
        userId: req.userId!,
        status: "active"
      },
      orderBy: { createdAt: "desc" },
    });

    // Fetch plan separately if assignment exists
    let activePlan = null;
    if (activeAssignment) {
      activePlan = await prisma.plan.findUnique({
        where: { id: activeAssignment.planId },
      });
    }

    res.json({ 
      ...wallet, 
      signal_strength: wallet.signalStrength,
      activePlan 
    });
  } catch {
    res.status(500).json({ error: "Failed to fetch wallet" });
  }
});

export default router;
