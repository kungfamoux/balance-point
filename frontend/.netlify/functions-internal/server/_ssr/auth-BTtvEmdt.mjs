const SUPABASE_URL = "https://zjnfpnifhmthssnfcbqp.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_d0qf1_14hUdLvV4Wo1Na5A_x6poL0Hq";
const PRIMARY_API_URL = "https://balance-point-kfg3.onrender.com";
const FALLBACK_API_URL = "https://balance-point.onrender.com";
const AUTH_STORAGE_KEY = "sb-session";
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
function saveSession(session) {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
}
function getSession() {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
function getAccessToken() {
  return getSession()?.access_token ?? null;
}
function clearSession() {
  if (typeof localStorage === "undefined") return;
  localStorage.removeItem(AUTH_STORAGE_KEY);
}
const authHeaders = {
  "Content-Type": "application/json",
  apikey: SUPABASE_ANON_KEY
};
function saveAuthResponse(data) {
  saveSession({
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_at: Date.now() + data.expires_in * 1e3,
    user: { id: data.user.id, email: data.user.email }
  });
}
async function authRequest(path, body) {
  const apiUrl = await getApiUrl();
  try {
    const res = await fetch(`${apiUrl}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error ?? data.error_description ?? "Authentication failed");
    saveAuthResponse(data);
    return data;
  } catch (error) {
    if (error.message) throw error;
    throw new Error("Unable to connect to the server. Please check your internet connection.");
  }
}
function login(email, password) {
  return authRequest("/api/auth/login", {
    email: email.trim().toLowerCase(),
    password
  });
}
function register(email, password, fullName, phone, country, referralCode) {
  return authRequest("/api/auth/register", {
    email: email.trim().toLowerCase(),
    password,
    fullName,
    phone,
    country,
    referralCode
  });
}
async function signOut() {
  const token = getAccessToken();
  if (token) {
    await fetch(`${SUPABASE_URL}/auth/v1/logout`, {
      method: "POST",
      headers: { ...authHeaders, Authorization: `Bearer ${token}` }
    }).catch(() => {
    });
  }
  clearSession();
}
async function refreshSession() {
  const session = getSession();
  if (!session?.refresh_token) return null;
  const apiUrl = await getApiUrl();
  const res = await fetch(`${apiUrl}/api/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: session.refresh_token })
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    clearSession();
    return null;
  }
  const refreshed = {
    ...session,
    access_token: data.access_token,
    refresh_token: data.refresh_token ?? session.refresh_token,
    expires_at: Date.now() + data.expires_in * 1e3
  };
  saveSession(refreshed);
  return refreshed;
}
async function getValidSession() {
  const session = getSession();
  if (!session) return null;
  const refreshBufferMs = 6e4;
  if (session.expires_at && session.expires_at > Date.now() + refreshBufferMs) {
    return session;
  }
  return refreshSession();
}
async function getValidAccessToken() {
  return (await getValidSession())?.access_token ?? null;
}
export {
  getAccessToken as a,
  getSession as b,
  getValidAccessToken as c,
  clearSession as d,
  getValidSession as g,
  login as l,
  register as r,
  signOut as s
};
