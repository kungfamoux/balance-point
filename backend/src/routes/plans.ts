import { Router } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

/**
 * @swagger
 * /api/plans:
 *   get:
 *     summary: Get all investment plans (public)
 *     tags: [Plans]
 *     responses:
 *       200:
 *         description: List of plans ordered by sort_order
 */
router.get("/", async (_req, res) => {
  try {
    const plans = await prisma.plan.findMany({
      orderBy: { sortOrder: "asc" },
    });
    res.json(plans);
  } catch {
    res.status(500).json({ error: "Failed to fetch plans" });
  }
});

export default router;
