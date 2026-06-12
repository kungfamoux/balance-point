import { Router } from "express";
import { prisma } from "../lib/prisma";
import { requireAuth, AuthRequest } from "../middleware/auth";

const router = Router();

/**
 * @swagger
 * /api/referrals:
 *   get:
 *     summary: Get own referral code, earnings, and referred users
 *     tags: [Referrals]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Referral info including code, earnings, and list of referrals
 */
router.get("/", requireAuth, async (req: AuthRequest, res) => {
  try {
    const [profile, referrals] = await Promise.all([
      prisma.profile.findUnique({
        where: { id: req.userId! },
        select: { referralCode: true },
      }),
      prisma.referral.findMany({
        where: { referrerId: req.userId! },
        orderBy: { createdAt: "desc" },
      }),
    ]);

    const wallet = await prisma.wallet.findUnique({
      where: { userId: req.userId! },
      select: { referralEarnings: true },
    });

    res.json({
      referralCode: profile?.referralCode,
      referralEarnings: wallet?.referralEarnings ?? 0,
      referrals,
    });
  } catch {
    res.status(500).json({ error: "Failed to fetch referrals" });
  }
});

export default router;
