import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { requireAuth, AuthRequest } from "../middleware/auth";

const router = Router();

/**
 * @swagger
 * /api/profile:
 *   get:
 *     summary: Get own profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile object
 *       404:
 *         description: Profile not found
 */
router.get("/", requireAuth, async (req: AuthRequest, res) => {
  try {
    const profile = await prisma.profile.upsert({
      where: { id: req.userId! },
      update: {},
      create: {
        id: req.userId!,
        referralCode: req.userId!.replace(/-/g, "").slice(0, 8).toUpperCase(),
      },
    });

    // Auto-create wallet if it doesn't exist
    await prisma.wallet.upsert({
      where: { userId: req.userId! },
      update: {},
      create: { userId: req.userId! },
    });

    res.json(profile);
  } catch {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

const updateSchema = z.object({
  fullName: z.string().min(1).optional(),
  country: z.string().optional(),
  phone: z.string().optional(),
  avatarUrl: z.string().url().optional(),
});

/**
 * @swagger
 * /api/profile:
 *   patch:
 *     summary: Update own profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               country:
 *                 type: string
 *               phone:
 *                 type: string
 *               avatarUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated profile
 *       400:
 *         description: Validation error
 */
router.patch("/", requireAuth, async (req: AuthRequest, res) => {
  const parsed = updateSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }

  try {
    const profile = await prisma.profile.upsert({
      where: { id: req.userId! },
      update: parsed.data,
      create: {
        id: req.userId!,
        referralCode: req.userId!.replace(/-/g, "").slice(0, 8).toUpperCase(),
        ...parsed.data,
      },
    });
    res.json(profile);
  } catch {
    res.status(500).json({ error: "Failed to update profile" });
  }
});

export default router;
