import { Router, Request, Response } from "express";
import { z } from "zod";
import { requireAuth, AuthRequest } from "../middleware/auth";
import { prisma } from "../lib/prisma";

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
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid email or password format" });
      return;
    }

    const { status, data } = await supabaseAuthFetch(
      "/token?grant_type=password",
      { email: parsed.data.email, password: parsed.data.password }
    );

    if (status !== 200) {
      const errorMessage = data.error_description ?? "Invalid email or password";
      res.status(401).json({ error: errorMessage });
      return;
    }

    // Check if user has a profile in local database
    const userId = (data.user as any)?.id;
    if (!userId) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const profile = await prisma.profile.findUnique({
      where: { id: userId },
    });

    if (!profile) {
      res.status(401).json({ error: "Please register your account first" });
      return;
    }

    res.status(200).json({
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_in: data.expires_in,
      user: data.user,
    });
  } catch (error) {
    console.error("[login error]", error);
    res.status(500).json({ error: "An error occurred during login. Please try again." });
  }
});

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  fullName: z.string().min(1).optional(),
  phone: z.string().min(1).optional(),
  country: z.string().min(1).optional(),
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
  try {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid input. Email and password (min 6 characters) are required." });
      return;
    }

    const { status, data } = await supabaseAuthFetch("/signup", {
      email: parsed.data.email,
      password: parsed.data.password,
      data: {
        full_name: parsed.data.fullName,
        phone: parsed.data.phone,
        country: parsed.data.country,
        referral_code: parsed.data.referralCode,
      },
    });

    if (status !== 200) {
      const errorMessage = data.msg ?? data.error_description ?? "Registration failed";
      res.status(400).json({ error: errorMessage });
      return;
    }

    const userId = (data.user as any)?.id;
    if (!userId) {
      res.status(400).json({ error: "Registration failed: unable to create user account" });
      return;
    }

    // Create profile in local database
    const referralCode = userId.replace(/-/g, "").slice(0, 8).toUpperCase();
    let referredBy: string | undefined;

    // Resolve referrer from referral code
    if (parsed.data.referralCode) {
      const referrer = await prisma.profile.findUnique({
        where: { referralCode: parsed.data.referralCode.toUpperCase() },
        select: { id: true },
      });
      if (referrer) referredBy = referrer.id;
    }

    try {
      await prisma.profile.create({
        data: {
          id: userId,
          email: parsed.data.email,
          referralCode,
          fullName: parsed.data.fullName ?? null,
          phone: parsed.data.phone ?? null,
          country: parsed.data.country ?? null,
          ...(referredBy ? { referredBy } : {}),
        },
      });
    } catch (profileError: any) {
      // Handle unique constraint violation (profile already exists)
      if (profileError.code === 'P2002') {
        res.status(400).json({ error: "An account with this email already exists" });
        return;
      }
      throw profileError;
    }

    // Auto-create wallet
    try {
      await prisma.wallet.create({
        data: { userId },
      });
    } catch (walletError: any) {
      // If wallet creation fails, log but don't fail the registration
      console.error("[register] wallet creation failed:", walletError);
    }

    // Create referral record if applicable
    if (referredBy) {
      try {
        await prisma.referral.create({
          data: { referrerId: referredBy, referredId: userId },
        });
      } catch (referralError: any) {
        // If referral creation fails, log but don't fail the registration
        console.error("[register] referral creation failed:", referralError);
      }
    }

    res.status(201).json({
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_in: data.expires_in,
      user: data.user,
    });
  } catch (error) {
    console.error("[register error]", error);
    res.status(500).json({ error: "An error occurred during registration. Please try again." });
  }
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
  try {
    const parsed = refreshSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Refresh token is required" });
      return;
    }

    const { status, data } = await supabaseAuthFetch(
      "/token?grant_type=refresh_token",
      { refresh_token: parsed.data.refresh_token }
    );

    if (status === 200) {
      res.status(200).json({
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        expires_in: data.expires_in,
      });
    } else {
      const errorMessage = data.error_description ?? "Invalid or expired refresh token";
      res.status(401).json({ error: errorMessage });
    }
  } catch (error) {
    console.error("[refresh error]", error);
    res.status(500).json({ error: "An error occurred while refreshing your session. Please try again." });
  }
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
