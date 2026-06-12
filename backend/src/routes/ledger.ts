import { Router } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

/**
 * @swagger
 * /api/ledger:
 *   get:
 *     summary: Get public activity ledger (no auth required)
 *     tags: [Ledger]
 *     responses:
 *       200:
 *         description: List of public ledger entries
 */
router.get("/", async (_req, res) => {
  try {
    const ledger = await prisma.publicLedger.findMany({
      orderBy: [{ kind: "asc" }, { sortOrder: "asc" }],
    });
    res.json(ledger);
  } catch {
    res.status(500).json({ error: "Failed to fetch ledger" });
  }
});

export default router;
