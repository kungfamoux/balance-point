import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

import authRouter from "./routes/auth";
import profileRouter from "./routes/profile";
import walletRouter from "./routes/wallet";
import plansRouter from "./routes/plans";
import investmentsRouter from "./routes/investments";
import transactionsRouter from "./routes/transactions";
import referralsRouter from "./routes/referrals";
import copytradingRouter from "./routes/copytrading";
import ticketsRouter from "./routes/tickets";
import ledgerRouter from "./routes/ledger";
import adminRouter from "./routes/admin";

const app = express();
const PORT = process.env.PORT ?? 4000;

// ── Swagger ────────────────────────────────────────────────────────────────
const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Investment Platform API",
      version: "1.0.0",
      description: "Backend API for the investment platform",
    },
    servers: [{ url: `http://localhost:${PORT}` }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: [__dirname + "/routes/*.js", __dirname + "/routes/*.ts"],
});

// ── Request logger ────────────────────────────────────────────────────────
app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      // Allow localhost, 127.0.0.1, and any private network IP (192.168.x.x, 10.x.x.x, 172.x.x.x)
      const isLocal =
        origin.includes("localhost") ||
        origin.includes("127.0.0.1") ||
        /^https?:\/\/192\.168\.\d+\.\d+/.test(origin) ||
        /^https?:\/\/10\.\d+\.\d+\.\d+/.test(origin) ||
        /^https?:\/\/172\.(1[6-9]|2\d|3[01])\.\d+\.\d+/.test(origin);
      if (isLocal) return callback(null, true);
      const allowed = process.env.FRONTEND_URL ?? "";
      callback(origin === allowed ? null : new Error("Not allowed by CORS"), origin === allowed);
    },
    credentials: true,
  })
);
app.use(express.json());

// ── Swagger UI ────────────────────────────────────────────────────────────
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/api-docs.json", (_req, res) => res.json(swaggerSpec));

// ── Health check ──────────────────────────────────────────────────────────
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Routes
app.use("/api/auth", authRouter);
app.use("/api/profile", profileRouter);
app.use("/api/wallet", walletRouter);
app.use("/api/plans", plansRouter);
app.use("/api/investments", investmentsRouter);
app.use("/api/transactions", transactionsRouter);
app.use("/api/referrals", referralsRouter);
app.use("/api/copytrading", copytradingRouter);
app.use("/api/tickets", ticketsRouter);
app.use("/api/ledger", ledgerRouter);
app.use("/api/admin", adminRouter);

// ── 404 handler ───────────────────────────────────────────────────────────
app.use((req: Request, res: Response) => {
  console.warn(`[404] ${req.method} ${req.path}`);
  res.status(404).json({ error: "Not found" });
});

// ── Global error handler ──────────────────────────────────────────────────
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  console.error(`[ERROR] ${req.method} ${req.path} →`, err.message);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`\n🚀 Backend running on http://localhost:${PORT}`);
  console.log(`📖 Swagger docs at  http://localhost:${PORT}/api-docs\n`);
});

export default app;
