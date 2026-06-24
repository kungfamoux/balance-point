const PRIMARY_API_URL = (import.meta.env.VITE_PRIMARY_API_URL as string | undefined) ?? "https://balance-point-kfg3.onrender.com";
const FALLBACK_API_URL = (import.meta.env.VITE_API_URL as string | undefined) ?? "http://localhost:4000";
const TOKEN_KEY = "admin_token";

let currentApiUrl = PRIMARY_API_URL;
let healthCheckInProgress = false;

async function checkBackendHealth(url: string): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

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

export function getAdminToken() {
  if (typeof localStorage === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}
export function setAdminToken(t: string) {
  localStorage.setItem(TOKEN_KEY, t);
}
export function clearAdminToken() {
  localStorage.removeItem(TOKEN_KEY);
}

async function req<T>(path: string, init: RequestInit = {}, opts?: { isLogin?: boolean }): Promise<T> {
  const token = getAdminToken();
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

  const data = await res.json().catch(() => ({}));
  if (res.status === 401 && !opts?.isLogin) {
    clearAdminToken();
    window.location.href = "/admin/login";
    throw new Error("Session expired — please sign in again");
  }
  if (!res.ok) throw new Error((data as any)?.error ?? "Request failed");
  return data as T;
}

export const adminApi = {
  login: (email: string, password: string) =>
    req<{ token: string }>(
      "/api/admin/login",
      { method: "POST", body: JSON.stringify({ email: email.trim(), password }) },
      { isLogin: true },
    ),

  getStats: () => req<any>("/api/admin/stats"),

  getUsers: () => req<any[]>("/api/admin/users"),
  getUser: (id: string) => req<any>(`/api/admin/users/${id}`),
  updateBalance: (id: string, balance: number) =>
    req<any>(`/api/admin/users/${id}/balance`, { method: "PATCH", body: JSON.stringify({ balance }) }),
  updateKyc: (id: string, kycStatus: string) =>
    req<any>(`/api/admin/users/${id}/kyc`, { method: "PATCH", body: JSON.stringify({ kycStatus }) }),

  getKycDocuments: () => req<any[]>("/api/admin/kyc"),
  updateKycDocument: (id: string, status: string) =>
    req<any>(`/api/admin/kyc/${id}`, { method: "PATCH", body: JSON.stringify({ status }) }),

  getTransactions: (type?: string, status?: string) => {
    const qs = new URLSearchParams();
    if (type) qs.set("type", type);
    if (status) qs.set("status", status);
    return req<any[]>(`/api/admin/transactions?${qs}`);
  },
  approveTransaction: (id: string) =>
    req<any>(`/api/admin/transactions/${id}/approve`, { method: "PATCH" }),
  rejectTransaction: (id: string) =>
    req<any>(`/api/admin/transactions/${id}/reject`, { method: "PATCH" }),

  getPlans: () => req<any[]>("/api/admin/plans"),
  createPlan: (body: object) =>
    req<any>("/api/admin/plans", { method: "POST", body: JSON.stringify(body) }),
  updatePlan: (id: string, body: object) =>
    req<any>(`/api/admin/plans/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
  deletePlan: async (id: string) => {
    const apiUrl = await getApiUrl();
    return fetch(`${apiUrl}/api/admin/plans/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${getAdminToken()}` },
    });
  },

  getInvestments: () => req<any[]>("/api/admin/investments"),
  updateInvestment: (id: string, body: object) =>
    req<any>(`/api/admin/investments/${id}`, { method: "PATCH", body: JSON.stringify(body) }),

  getSessions: () => req<any[]>("/api/admin/sessions"),
  createSession: (body: object) =>
    req<any>("/api/admin/sessions", { method: "POST", body: JSON.stringify(body) }),
  updateSession: (id: string, body: object) =>
    req<any>(`/api/admin/sessions/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
  deleteSession: async (id: string) => {
    const apiUrl = await getApiUrl();
    return fetch(`${apiUrl}/api/admin/sessions/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${getAdminToken()}` },
    });
  },

  getLedger: () => req<any[]>("/api/admin/ledger"),
  createLedgerEntry: (body: object) =>
    req<any>("/api/admin/ledger", { method: "POST", body: JSON.stringify(body) }),
  updateLedgerEntry: (id: string, body: object) =>
    req<any>(`/api/admin/ledger/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
  deleteLedgerEntry: async (id: string) => {
    const apiUrl = await getApiUrl();
    return fetch(`${apiUrl}/api/admin/ledger/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${getAdminToken()}` },
    });
  },
};
