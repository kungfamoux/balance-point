import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { z } from "zod";
import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { loginOrRegister } from "@/lib/auth";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const search = z.object({
  tab: z.enum(["login", "register"]).optional(),
});

export const Route = createFileRoute("/auth")({
  validateSearch: search,
  head: () => ({
    meta: [
      { title: "Login & Sign up — Balancepoint Capital" },
      { name: "description", content: "Login to your Balancepoint Capital account or open a new one in minutes." },
      { property: "og:title", content: "Login — Balancepoint Capital" },
      { property: "og:description", content: "Login or open an account." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { tab = "login" } = Route.useSearch();
  return (
    <SiteLayout>
      <section className="bg-secondary/40">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center">
          <div className="hidden lg:block">
            <h1 className="font-display text-4xl font-bold">Welcome back.</h1>
            <p className="mt-3 text-muted-foreground">
              Your professional trading account. 40,000+ instruments. One login.
            </p>
            <ul className="mt-8 space-y-3 text-sm">
              <Bullet>Real-time deposits, withdrawals and balances</Bullet>
              <Bullet>TradingView-grade charts and watchlists</Bullet>
              <Bullet>Copytrade vetted top performers</Bullet>
              <Bullet>24/5 support and secure custody</Bullet>
            </ul>
          </div>
          <Card className="border-border">
            <CardContent className="p-6 sm:p-8">
              <Tabs defaultValue={tab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>
                <TabsContent value="login"><Form mode="login" /></TabsContent>
                <TabsContent value="register"><Form mode="register" /></TabsContent>
              </Tabs>
              <p className="mt-6 text-center text-xs text-muted-foreground">
                Demo platform — any valid email and a password of 6+ characters will sign you in.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </SiteLayout>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-brand" />
      <span>{children}</span>
    </li>
  );
}

function Form({ mode }: { mode: "login" | "register" }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) return;
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      await loginOrRegister(email, password, name || undefined);
      toast.success(mode === "login" ? "Welcome back!" : "Account created.");
      navigate({ to: "/dashboard" });
    } catch (err: any) {
      toast.error(err?.message ?? "Could not sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="mt-6 space-y-4" onSubmit={onSubmit}>
      {mode === "register" && (
        <div>
          <Label htmlFor="name">Full name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5" />
        </div>
      )}
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" autoComplete="email" value={email}
          onChange={(e) => setEmail(e.target.value)} className="mt-1.5" required />
      </div>
      <div>
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          {mode === "login" && (
            <Link to="/auth" className="text-xs text-brand hover:underline">Forgot?</Link>
          )}
        </div>
        <Input id="password" type="password" autoComplete={mode === "login" ? "current-password" : "new-password"}
          value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1.5" required />
      </div>
      <Button type="submit" disabled={loading} className="w-full">
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {mode === "login" ? "Login" : "Create account"}
      </Button>
    </form>
  );
}
