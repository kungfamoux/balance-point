import { getAccessToken, clearSession } from "./auth";

const API_URL = (import.meta.env.VITE_API_URL as string | undefined) ?? "http://localhost:4000";

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = getAccessToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(init.headers as Record<string, string>),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, { ...init, headers });

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
  createDeposit: (body: { amount: number; gateway: string; meta?: object }) =>
    request("/api/transactions/deposit", { method: "POST", body: JSON.stringify(body) }),
  createWithdrawal: (body: { amount: number; gateway: string; meta?: object }) =>
    request("/api/transactions/withdraw", { method: "POST", body: JSON.stringify(body) }),

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
