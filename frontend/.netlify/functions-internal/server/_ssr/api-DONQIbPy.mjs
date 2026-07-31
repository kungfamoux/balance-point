import { c as getValidAccessToken, d as clearSession } from "./auth-BTtvEmdt.mjs";
const PRIMARY_API_URL = "https://balance-point-kfg3.onrender.com";
const FALLBACK_API_URL = "https://balance-point.onrender.com";
let currentApiUrl = PRIMARY_API_URL;
let healthCheckInProgress = false;
async function checkBackendHealth(url) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5e3);
    const res = await fetch(`${url}/health`, {
      method: "GET",
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    return res.ok;
  } catch {
    return false;
  }
}
async function getApiUrl() {
  if (!healthCheckInProgress) {
    healthCheckInProgress = true;
    const isPrimaryHealthy = await checkBackendHealth(PRIMARY_API_URL);
    currentApiUrl = isPrimaryHealthy ? PRIMARY_API_URL : FALLBACK_API_URL;
    healthCheckInProgress = false;
  }
  return currentApiUrl;
}
async function request(path, init = {}) {
  const token = await getValidAccessToken();
  const headers = {
    "Content-Type": "application/json",
    ...init.headers
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const apiUrl = await getApiUrl();
  let res = await fetch(`${apiUrl}${path}`, { ...init, headers });
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
  return data;
}
const api = {
  // Profile
  getProfile: () => request("/api/profile"),
  updateProfile: (body) => request("/api/profile", { method: "PATCH", body: JSON.stringify(body) }),
  // Wallet
  getWallet: () => request("/api/wallet"),
  // Plans
  getPlans: () => request("/api/plans"),
  // Investments
  getInvestments: () => request("/api/investments"),
  createInvestment: (body) => request("/api/investments", { method: "POST", body: JSON.stringify(body) }),
  // Transactions
  getTransactions: (limit = 50) => request(`/api/transactions?limit=${limit}`),
  getTradeHistory: (limit = 50) => request(`/api/trade-history?limit=${limit}`),
  createDeposit: (body) => request("/api/transactions/deposit", { method: "POST", body: JSON.stringify(body) }),
  createWithdrawal: (body) => request("/api/transactions/withdraw", { method: "POST", body: JSON.stringify(body) }),
  cancelWithdrawal: (id) => request(`/api/transactions/${id}/cancel`, { method: "PATCH" }),
  // Referrals
  getReferrals: () => request("/api/referrals"),
  // Copytrading
  getCopyFollows: () => request("/api/copytrading"),
  followTrader: (traderHandle) => request("/api/copytrading", { method: "POST", body: JSON.stringify({ traderHandle }) }),
  unfollowTrader: (id) => request(`/api/copytrading/${id}`, { method: "DELETE" }),
  // Tickets
  getTickets: () => request("/api/tickets"),
  createTicket: (body) => request("/api/tickets", { method: "POST", body: JSON.stringify(body) }),
  replyToTicket: (id, body) => request(`/api/tickets/${id}/messages`, { method: "POST", body: JSON.stringify({ body }) }),
  // Public ledger
  getLedger: () => request("/api/ledger"),
  // Live sessions
  getSessions: () => request("/api/sessions")
};
export {
  api as a
};
