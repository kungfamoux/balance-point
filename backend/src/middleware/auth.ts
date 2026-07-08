import { Request, Response, NextFunction } from "express";
import { createRemoteJWKSet, jwtVerify } from "jose";

function getRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not configured`);
  return value;
}

const supabaseUrl = getRequiredEnv("SUPABASE_URL").replace(/\/$/, "");
const jwksUrl = process.env.SUPABASE_JWKS_URL ?? `${supabaseUrl}/auth/v1/.well-known/jwks.json`;
const jwtIssuer = process.env.SUPABASE_JWT_ISSUER ?? `${supabaseUrl}/auth/v1`;
const JWKS = createRemoteJWKSet(new URL(jwksUrl));

export interface UserMeta {
  full_name?: string;
  phone?: string;
  country?: string;
  referred_by_code?: string;
}

export interface AuthRequest extends Request {
  userId?: string;
  userEmail?: string;
  userMeta?: UserMeta;
}

export async function requireAuth(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({ error: "Missing or invalid Authorization header" });
    return;
  }

  const token = authHeader.slice(7);

  try {
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: jwtIssuer,
    });

    req.userId = payload.sub;
    req.userEmail = payload.email as string | undefined;
    req.userMeta = (payload.user_metadata ?? {}) as UserMeta;
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}
