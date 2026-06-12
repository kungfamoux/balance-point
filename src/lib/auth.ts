const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
const AUTH_STORAGE_KEY = "sb-session";

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

export async function loginOrRegister(email: string, password: string, fullName?: string) {
  const cleanEmail = email.trim().toLowerCase();

  // Try sign in first
  const signInRes = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: authHeaders,
    body: JSON.stringify({ email: cleanEmail, password }),
  });

  if (signInRes.ok) {
    const data = await signInRes.json();
    saveSession({
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_at: Date.now() + data.expires_in * 1000,
      user: { id: data.user.id, email: data.user.email },
    });
    return data;
  }

  // Try sign up
  const signUpRes = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
    method: "POST",
    headers: authHeaders,
    body: JSON.stringify({
      email: cleanEmail,
      password,
      data: fullName ? { full_name: fullName } : {},
    }),
  });

  const signUpData = await signUpRes.json();
  if (!signUpRes.ok) throw new Error(signUpData.error_description ?? signUpData.msg ?? "Sign up failed");

  // If session returned immediately (email auto-confirm on), save it
  if (signUpData.access_token) {
    saveSession({
      access_token: signUpData.access_token,
      refresh_token: signUpData.refresh_token,
      expires_at: Date.now() + signUpData.expires_in * 1000,
      user: { id: signUpData.user.id, email: signUpData.user.email },
    });
    return signUpData;
  }

  // Retry sign in after sign up
  const retryRes = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: authHeaders,
    body: JSON.stringify({ email: cleanEmail, password }),
  });
  const retryData = await retryRes.json();
  if (!retryRes.ok) throw new Error(retryData.error_description ?? "Could not sign in after sign up");

  saveSession({
    access_token: retryData.access_token,
    refresh_token: retryData.refresh_token,
    expires_at: Date.now() + retryData.expires_in * 1000,
    user: { id: retryData.user.id, email: retryData.user.email },
  });
  return retryData;
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
