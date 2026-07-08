import { getValidAccessToken, clearSession } from "./auth";

const PRIMARY_API_URL = (import.meta.env.VITE_PRIMARY_API_URL as string | undefined) ?? "https://balance-point-kfg3.onrender.com";
const FALLBACK_API_URL = (import.meta.env.VITE_API_URL as string | undefined) ?? "http://localhost:4000";

let currentApiUrl = PRIMARY_API_URL;
let healthCheckInProgress = false;

async function checkBackendHealth(url: string): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    const res = await fetch(`${url}/health`, {
      method: "GET",
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    return res.ok;
  } catch {
    return false;
  }
}

async function getApiUrl(): Promise<string> {
  if (!healthCheckInProgress) {
    healthCheckInProgress = true;
    const isPrimaryHealthy = await checkBackendHealth(PRIMARY_API_URL);
    currentApiUrl = isPrimaryHealthy ? PRIMARY_API_URL : FALLBACK_API_URL;
    healthCheckInProgress = false;
  }
  return currentApiUrl;
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = await getValidAccessToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(init.headers as Record<string, string>),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const apiUrl = await getApiUrl();
  let res = await fetch(`${apiUrl}${path}`, { ...init, headers });

  // If primary backend fails, try fallback
  if (!res.ok && apiUrl === PRIMARY_API_URL) {
    console.warn(`Primary backend failed, trying fallback: ${FALLBACK_API_URL}`);
    currentApiUrl = FALLBACK_API_URL;
    res = await fetch(`${FALLBACK_API_URL}${path}`, { ...init, headers });
  }

  if (res.status === 401) {
    clearSession();
    window.location.href = "/auth";
    throw new Error("Session expired");
  }

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error ?? "Request failed");
  return data as T;
}

export const api = {
  // Profile
  getProfile: () => request("/api/profile"),
  updateProfile: (body: object) => request("/api/profile", { method: "PATCH", body: JSON.stringify(body) }),

  // Wallet
  getWallet: () => request("/api/wallet"),

  // Plans
  getPlans: () => request("/api/plans"),

  // Investments
  getInvestments: () => request("/api/investments"),
  createInvestment: (body: { planId: string; amount: number }) =>
    request("/api/investments", { method: "POST", body: JSON.stringify(body) }),

  // Transactions
  getTransactions: (limit = 50) => request(`/api/transactions?limit=${limit}`),
  getTradeHistory: (limit = 50) => request(`/api/trade-history?limit=${limit}`),
  createDeposit: (body: { amount: number; gateway: string; meta?: object }) =>
    request("/api/transactions/deposit", { method: "POST", body: JSON.stringify(body) }),
  createWithdrawal: (body: { amount: number; gateway: string; meta?: object }) =>
    request("/api/transactions/withdraw", { method: "POST", body: JSON.stringify(body) }),
  cancelWithdrawal: (id: string) =>
    request(`/api/transactions/${id}/cancel`, { method: "PATCH" }),

  // Referrals
  getReferrals: () => request("/api/referrals"),

  // Copytrading
  getCopyFollows: () => request("/api/copytrading"),
  followTrader: (traderHandle: string) =>
    request("/api/copytrading", { method: "POST", body: JSON.stringify({ traderHandle }) }),
  unfollowTrader: (id: string) => request(`/api/copytrading/${id}`, { method: "DELETE" }),

  // Tickets
  getTickets: () => request("/api/tickets"),
  createTicket: (body: { subject: string; body: string }) =>
    request("/api/tickets", { method: "POST", body: JSON.stringify(body) }),
  replyToTicket: (id: string, body: string) =>
    request(`/api/tickets/${id}/messages`, { method: "POST", body: JSON.stringify({ body }) }),

  // Public ledger
  getLedger: () => request("/api/ledger"),

  // Live sessions
  getSessions: () => request("/api/sessions"),
};
