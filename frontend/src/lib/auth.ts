const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
const PRIMARY_API_URL = (import.meta.env.VITE_PRIMARY_API_URL as string | undefined) ?? "https://balance-point-kfg3.onrender.com";
const FALLBACK_API_URL = (import.meta.env.VITE_API_URL as string | undefined) ?? "http://localhost:4000";
const AUTH_STORAGE_KEY = "sb-session";

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

export interface Session {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  user: {
    id: string;
    email: string;
  };
}

function saveSession(session: Session) {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
}

export function getSession(): Session | null {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Session;
  } catch {
    return null;
  }
}

export function getAccessToken(): string | null {
  return getSession()?.access_token ?? null;
}

export function clearSession() {
  if (typeof localStorage === "undefined") return;
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

const authHeaders = {
  "Content-Type": "application/json",
  apikey: SUPABASE_ANON_KEY,
};

function saveAuthResponse(data: any) {
  saveSession({
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_at: Date.now() + data.expires_in * 1000,
    user: { id: data.user.id, email: data.user.email },
  });
}

async function authRequest(path: "/api/auth/login" | "/api/auth/register", body: object) {
  const apiUrl = await getApiUrl();
  try {
    const res = await fetch(`${apiUrl}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error ?? data.error_description ?? "Authentication failed");

    saveAuthResponse(data);
    return data;
  } catch (error: any) {
    if (error.message) throw error;
    throw new Error("Unable to connect to the server. Please check your internet connection.");
  }
}

export function login(email: string, password: string) {
  return authRequest("/api/auth/login", {
    email: email.trim().toLowerCase(),
    password,
  });
}

export function register(email: string, password: string, fullName: string, phone: string, country: string, referralCode?: string) {
  return authRequest("/api/auth/register", {
    email: email.trim().toLowerCase(),
    password,
    fullName,
    phone,
    country,
    referralCode,
  });
}

export async function signOut() {
  const token = getAccessToken();
  if (token) {
    await fetch(`${SUPABASE_URL}/auth/v1/logout`, {
      method: "POST",
      headers: { ...authHeaders, Authorization: `Bearer ${token}` },
    }).catch(() => {});
  }
  clearSession();
}

export async function refreshSession(): Promise<Session | null> {
  const session = getSession();
  if (!session?.refresh_token) return null;

  const apiUrl = await getApiUrl();
  const res = await fetch(`${apiUrl}/api/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: session.refresh_token }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    clearSession();
    return null;
  }

  const refreshed: Session = {
    ...session,
    access_token: data.access_token,
    refresh_token: data.refresh_token ?? session.refresh_token,
    expires_at: Date.now() + data.expires_in * 1000,
  };
  saveSession(refreshed);
  return refreshed;
}

export async function getValidSession(): Promise<Session | null> {
  const session = getSession();
  if (!session) return null;

  const refreshBufferMs = 60_000;
  if (session.expires_at && session.expires_at > Date.now() + refreshBufferMs) {
    return session;
  }

  return refreshSession();
}

export async function getValidAccessToken(): Promise<string | null> {
  return (await getValidSession())?.access_token ?? null;
}

export async function getUser() {
  return (await getValidSession())?.user ?? null;
}
