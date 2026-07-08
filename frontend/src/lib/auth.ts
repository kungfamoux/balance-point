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
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

const authHeaders = {
  "Content-Type": "application/json",
  apikey: SUPABASE_ANON_KEY,
};

export async function loginOrRegister(email: string, password: string, fullName?: string, phone?: string, country?: string, referralCode?: string) {
  const cleanEmail = email.trim().toLowerCase();
  const apiUrl = await getApiUrl();

  // Try login via backend first
  try {
    const loginRes = await fetch(`${apiUrl}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: cleanEmail, password }),
    });

    if (loginRes.ok) {
      const data = await loginRes.json();
      saveSession({
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        expires_at: Date.now() + data.expires_in * 1000,
        user: { id: data.user.id, email: data.user.email },
      });
      return data;
    }

    const loginError = await loginRes.json();
    console.warn("[auth] login failed:", loginRes.status, loginError);
    
    // Only proceed to registration if the error indicates user doesn't exist
    if (loginRes.status === 401 && loginError.error === "Please register your account first") {
      // Continue to registration
    } else {
      throw new Error(loginError.error ?? "Invalid email or password");
    }
  } catch (error: any) {
    if (error.message) throw error;
    throw new Error("Unable to connect to the server. Please check your internet connection.");
  }

  // If login failed, try registration via backend
  try {
    const registerRes = await fetch(`${apiUrl}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: cleanEmail,
        password,
        fullName,
        referralCode,
      }),
    });

    const registerData = await registerRes.json();
    if (!registerRes.ok) {
      throw new Error(registerData.error ?? registerData.error_description ?? "Registration failed");
    }

    saveSession({
      access_token: registerData.access_token,
      refresh_token: registerData.refresh_token,
      expires_at: Date.now() + registerData.expires_in * 1000,
      user: { id: registerData.user.id, email: registerData.user.email },
    });
    return registerData;
  } catch (error: any) {
    if (error.message) throw error;
    throw new Error("Unable to connect to the server. Please check your internet connection.");
  }
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

export async function getUser() {
  return getSession()?.user ?? null;
}
