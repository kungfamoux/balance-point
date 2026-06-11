import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";

const links = [
  { to: "/markets", label: "Overview" },
  { to: "/markets/forex", label: "Forex" },
  { to: "/markets/stocks", label: "Stocks" },
  { to: "/markets/crypto", label: "Crypto" },
  { to: "/markets/commodities", label: "Commodities" },
  { to: "/markets/indices", label: "Indices" },
  { to: "/markets/real-estate", label: "Real Estate" },
] as const;

export const Route = createFileRoute("/markets")({
  head: () => ({
    meta: [
      { title: "Markets — Balancepoint Capital" },
      { name: "description", content: "Trade FX, stocks, crypto, commodities, indices and real estate from one account." },
      { property: "og:title", content: "Markets — Balancepoint Capital" },
      { property: "og:description", content: "All asset classes, one platform." },
    ],
  }),
  component: MarketsLayout,
});

function MarketsLayout() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <SiteLayout>
      <section className="border-b border-border bg-sidebar text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">Markets</p>
          <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">All asset classes, one account.</h1>
          <p className="mt-3 max-w-2xl text-white/70">
            Trade and invest across global markets with ultra-tight spreads, low commissions and reliable execution.
          </p>
        </div>
      </section>
      <div className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 sm:px-6">
          {links.map((l) => {
            const active = path === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                  active
                    ? "border-brand text-brand"
                    : "border-transparent text-foreground/70 hover:text-foreground"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </div>
      </div>
      <Outlet />
    </SiteLayout>
  );
}
