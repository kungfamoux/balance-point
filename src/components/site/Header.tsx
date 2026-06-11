import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const markets = [
  { to: "/markets/forex", label: "Forex" },
  { to: "/markets/stocks", label: "Stocks" },
  { to: "/markets/crypto", label: "Crypto" },
  { to: "/markets/commodities", label: "Commodities" },
  { to: "/markets/indices", label: "Indices" },
  { to: "/markets/real-estate", label: "Real Estate" },
] as const;

const company = [
  { to: "/company/about", label: "About" },
  { to: "/company/contact", label: "Contact" },
  { to: "/company/careers", label: "Careers" },
  { to: "/company/legal", label: "Legal" },
] as const;

export function SiteHeader() {
  const [authed, setAuthed] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setAuthed(!!data.user));
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") setAuthed(true);
      if (event === "SIGNED_OUT") setAuthed(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden items-center gap-1 lg:flex">
            <NavLink to="/">Home</NavLink>
            <Dropdown label="Markets" items={markets} />
            <NavLink to="/copytrading">Copytrading</NavLink>
            <Dropdown label="Company" items={company} />
          </nav>
        </div>
        <div className="flex items-center gap-2">
          {authed ? (
            <Button asChild>
              <Link to="/dashboard">Dashboard</Link>
            </Button>
          ) : (
            <>
              <Button asChild variant="ghost" className="hidden sm:inline-flex">
                <Link to="/auth">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/auth" search={{ tab: "register" }}>Open Account</Link>
              </Button>
            </>
          )}
          <button
            className="ml-1 inline-flex h-9 w-9 items-center justify-center rounded-md border border-border lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="mx-auto max-w-7xl space-y-1 px-4 py-3 sm:px-6">
            <MobileLink to="/" onClick={() => setOpen(false)}>Home</MobileLink>
            <p className="px-3 pt-3 text-xs font-semibold uppercase text-muted-foreground">Markets</p>
            {markets.map((m) => (
              <MobileLink key={m.to} to={m.to} onClick={() => setOpen(false)}>{m.label}</MobileLink>
            ))}
            <MobileLink to="/copytrading" onClick={() => setOpen(false)}>Copytrading</MobileLink>
            <p className="px-3 pt-3 text-xs font-semibold uppercase text-muted-foreground">Company</p>
            {company.map((m) => (
              <MobileLink key={m.to} to={m.to} onClick={() => setOpen(false)}>{m.label}</MobileLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
      activeProps={{ className: "text-brand" }}
      activeOptions={{ exact: true }}
    >
      {children}
    </Link>
  );
}

function Dropdown({ label, items }: { label: string; items: readonly { to: string; label: string }[] }) {
  return (
    <div className="group relative">
      <button className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground">
        {label}
        <ChevronDown className="h-3.5 w-3.5" />
      </button>
      <div className="invisible absolute left-0 top-full z-50 w-56 translate-y-1 rounded-lg border border-border bg-popover p-1 opacity-0 shadow-lg transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
        {items.map((i) => (
          <Link
            key={i.to}
            to={i.to}
            className="block rounded-md px-3 py-2 text-sm text-popover-foreground hover:bg-accent"
          >
            {i.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function MobileLink({ to, children, onClick }: { to: string; children: React.ReactNode; onClick: () => void }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
    >
      {children}
    </Link>
  );
}
