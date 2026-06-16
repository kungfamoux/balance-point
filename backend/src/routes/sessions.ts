import { Router } from "express";
import { prisma } from "../lib/prisma";
import { requireAuth } from "../middleware/auth";

const router = Router();

/**
 * @swagger
 * /api/sessions:
 *   get:
 *     summary: Get all live sessions (sorted by scheduledAt)
 *     tags: [Sessions]
 *     security:
 *       - bearerAuth: []
 */
router.get("/", requireAuth, async (_req, res) => {
  const sessions = await prisma.liveSession.findMany({
    orderBy: [{ sortOrder: "asc" }, { scheduledAt: "asc" }],
  });
  res.json(sessions);
});

export default router;
