import { supabase } from "@/integrations/supabase/client";

// "Accept any credentials": try sign-in first; if invalid, sign the user up.
// Either way the user ends up authenticated.
export async function loginOrRegister(email: string, password: string, fullName?: string) {
  const cleanEmail = email.trim().toLowerCase();
  // Try sign in
  const signIn = await supabase.auth.signInWithPassword({
    email: cleanEmail,
    password,
  });
  if (!signIn.error) return signIn.data;

  // Try sign up
  const signUp = await supabase.auth.signUp({
    email: cleanEmail,
    password,
    options: { data: fullName ? { full_name: fullName } : {} },
  });
  if (signUp.error) throw signUp.error;
  // With email auto-confirm enabled, session is returned immediately
  if (!signUp.data.session) {
    const retry = await supabase.auth.signInWithPassword({ email: cleanEmail, password });
    if (retry.error) throw retry.error;
    return retry.data;
  }
  return signUp.data;
}

export async function signOut() {
  await supabase.auth.signOut();
}
