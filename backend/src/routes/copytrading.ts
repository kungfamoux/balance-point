import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { requireAuth, AuthRequest } from "../middleware/auth";

const router = Router();

/**
 * @swagger
 * /api/copytrading:
 *   get:
 *     summary: Get own copy-trading follows
 *     tags: [CopyTrading]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of traders being followed
 */
router.get("/", requireAuth, async (req: AuthRequest, res) => {
  try {
    const follows = await prisma.copyFollow.findMany({
      where: { userId: req.userId! },
      orderBy: { createdAt: "desc" },
    });
    res.json(follows);
  } catch {
    res.status(500).json({ error: "Failed to fetch copy follows" });
  }
});

const followSchema = z.object({
  traderHandle: z.string().min(1),
});

/**
 * @swagger
 * /api/copytrading:
 *   post:
 *     summary: Follow a trader
 *     tags: [CopyTrading]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [traderHandle]
 *             properties:
 *               traderHandle:
 *                 type: string
 *     responses:
 *       201:
 *         description: Now following trader
 *       409:
 *         description: Already following this trader
 */
router.post("/", requireAuth, async (req: AuthRequest, res) => {
  const parsed = followSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }

  try {
    const follow = await prisma.copyFollow.create({
      data: {
        userId: req.userId!,
        traderHandle: parsed.data.traderHandle,
      },
    });
    res.status(201).json(follow);
  } catch (err: any) {
    if (err?.code === "P2002") {
      res.status(409).json({ error: "Already following this trader" });
      return;
    }
    res.status(500).json({ error: "Failed to follow trader" });
  }
});

/**
 * @swagger
 * /api/copytrading/{id}:
 *   delete:
 *     summary: Unfollow a trader
 *     tags: [CopyTrading]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Unfollowed successfully
 */
router.delete("/:id", requireAuth, async (req: AuthRequest, res) => {
  try {
    await prisma.copyFollow.deleteMany({
      where: { id: String(req.params.id), userId: req.userId! },
    });
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "Failed to unfollow trader" });
  }
});

export default router;
