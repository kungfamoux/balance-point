import { Request, Response, NextFunction } from "express";
import { jwtVerify } from "jose";

export interface AdminRequest extends Request {
  admin?: { email: string };
}

export async function adminAuth(req: AdminRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const token = header.slice(7);
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!secret) {
    res.status(500).json({ error: "Admin secret not configured" });
    return;
  }
  try {
    const key = new TextEncoder().encode(secret);
    const { payload } = await jwtVerify(token, key);
    if ((payload as any).role !== "admin") {
      res.status(403).json({ error: "Forbidden" });
      return;
    }
    req.admin = { email: (payload as any).email };
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}
