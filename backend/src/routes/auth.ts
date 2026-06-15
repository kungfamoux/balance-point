import { Router, Request, Response } from "express";
import { z } from "zod";
import { requireAuth, AuthRequest } from "../middleware/auth";

const router = Router();

const SUPABASE_URL = process.env.SUPABASE_URL ?? "";
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY ?? "";

async function supabaseAuthFetch(path: string, body: object): Promise<{ status: number; data: Record<string, unknown> }> {
  const res = await fetch(`${SUPABASE_URL}/auth/v1${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_ANON_KEY,
    },
    body: JSON.stringify(body),
  });
  return { status: res.status, data: (await res.json()) as Record<string, unknown> };
}

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login with email and password
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: mypassword123
 *     responses:
 *       200:
 *         description: Login successful — returns access_token and user
 *       400:
 *         description: Validation error
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", async (req: Request, res: Response) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }

  const { status, data } = await supabaseAuthFetch(
    "/token?grant_type=password",
    { email: parsed.data.email, password: parsed.data.password }
  );

  res.status(status === 200 ? 200 : 401).json(
    status === 200
      ? {
          access_token: data.access_token,
          refresh_token: data.refresh_token,
          expires_in: data.expires_in,
          user: data.user,
        }
      : { error: data.error_description ?? "Invalid credentials" }
  );
});

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  fullName: z.string().min(1).optional(),
  referralCode: z.string().optional(),
});

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new account
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: newuser@example.com
 *               password:
 *                 type: string
 *                 example: mypassword123
 *               fullName:
 *                 type: string
 *                 example: John Doe
 *               referralCode:
 *                 type: string
 *                 example: REF123
 *     responses:
 *       201:
 *         description: Registration successful
 *       400:
 *         description: Validation error or email already in use
 */
router.post("/register", async (req: Request, res: Response) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }

  const { status, data } = await supabaseAuthFetch("/signup", {
    email: parsed.data.email,
    password: parsed.data.password,
    data: {
      full_name: parsed.data.fullName,
      referral_code: parsed.data.referralCode,
    },
  });

  if (status !== 200) {
    res.status(400).json({ error: data.msg ?? data.error_description ?? "Registration failed" });
    return;
  }

  res.status(201).json({
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_in: data.expires_in,
    user: data.user,
  });
});

const refreshSchema = z.object({
  refresh_token: z.string().min(1),
});

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: Refresh access token using a refresh token
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [refresh_token]
 *             properties:
 *               refresh_token:
 *                 type: string
 *     responses:
 *       200:
 *         description: New access_token returned
 *       401:
 *         description: Invalid or expired refresh token
 */
router.post("/refresh", async (req: Request, res: Response) => {
  const parsed = refreshSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }

  const { status, data } = await supabaseAuthFetch(
    "/token?grant_type=refresh_token",
    { refresh_token: parsed.data.refresh_token }
  );

  res.status(status === 200 ? 200 : 401).json(
    status === 200
      ? {
          access_token: data.access_token,
          refresh_token: data.refresh_token,
          expires_in: data.expires_in,
        }
      : { error: data.error_description ?? "Token refresh failed" }
  );
});

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get current authenticated user info
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user ID and email
 *       401:
 *         description: Not authenticated
 */
router.get("/me", requireAuth, (req: AuthRequest, res: Response) => {
  res.json({ id: req.userId, email: req.userEmail });
});

export default router;
