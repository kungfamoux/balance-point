import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { requireAuth, AuthRequest } from "../middleware/auth";

const router = Router();

/**
 * @swagger
 * /api/tickets:
 *   get:
 *     summary: Get own support tickets
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of tickets with messages
 */
router.get("/", requireAuth, async (req: AuthRequest, res) => {
  try {
    const tickets = await prisma.ticket.findMany({
      where: { userId: req.userId! },
      include: { messages: { orderBy: { createdAt: "asc" } } },
      orderBy: { createdAt: "desc" },
    });
    res.json(tickets);
  } catch {
    res.status(500).json({ error: "Failed to fetch tickets" });
  }
});

const createTicketSchema = z.object({
  subject: z.string().min(1),
  body: z.string().min(1),
});

/**
 * @swagger
 * /api/tickets:
 *   post:
 *     summary: Create a new support ticket
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [subject, body]
 *             properties:
 *               subject:
 *                 type: string
 *               body:
 *                 type: string
 *     responses:
 *       201:
 *         description: Ticket created
 */
router.post("/", requireAuth, async (req: AuthRequest, res) => {
  const parsed = createTicketSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }

  try {
    const ticket = await prisma.ticket.create({
      data: {
        userId: req.userId!,
        subject: parsed.data.subject,
        messages: {
          create: {
            userId: req.userId!,
            body: parsed.data.body,
          },
        },
      },
      include: { messages: true },
    });
    res.status(201).json(ticket);
  } catch {
    res.status(500).json({ error: "Failed to create ticket" });
  }
});

const replySchema = z.object({
  body: z.string().min(1),
});

/**
 * @swagger
 * /api/tickets/{id}/messages:
 *   post:
 *     summary: Reply to a support ticket
 *     tags: [Tickets]
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
 *             required: [body]
 *             properties:
 *               body:
 *                 type: string
 *     responses:
 *       201:
 *         description: Message sent
 *       404:
 *         description: Ticket not found
 */
router.post("/:id/messages", requireAuth, async (req: AuthRequest, res) => {
  const parsed = replySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }

  try {
    const ticket = await prisma.ticket.findFirst({
      where: { id: String(req.params.id), userId: req.userId! },
    });
    if (!ticket) {
      res.status(404).json({ error: "Ticket not found" });
      return;
    }

    const message = await prisma.ticketMessage.create({
      data: {
        ticketId: String(req.params.id),
        userId: req.userId!,
        body: parsed.data.body,
      },
    });
    res.status(201).json(message);
  } catch {
    res.status(500).json({ error: "Failed to send message" });
  }
});

export default router;
