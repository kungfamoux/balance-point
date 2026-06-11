import { createFileRoute } from "@tanstack/react-router";
import traderImg from "@/assets/section-trader.jpg";

export const Route = createFileRoute("/company/about")({
  head: () => ({
    meta: [
      { title: "About — Balancepoint Capital" },
      { name: "description", content: "Our mission: deliver professional market infrastructure to every trader." },
      { property: "og:title", content: "About — Balancepoint Capital" },
      { property: "og:description", content: "Who we are and what we stand for." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <section className="bg-background">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Our mission</h2>
          <p className="mt-4 text-muted-foreground">
            Balancepoint Capital was founded on a simple idea: every trader — from a first-time investor to a
            quantitative hedge fund — deserves access to the same professional market infrastructure.
          </p>
          <p className="mt-4 text-muted-foreground">
            We provide tight spreads, deep liquidity and reliable execution across 40,000+ instruments, all from a
            single account. Our platform is trusted by over 450,000 clients across 80 countries.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <Stat v="450K+" l="Clients" />
            <Stat v="$95B+" l="AUM" />
            <Stat v="80" l="Countries" />
          </div>
        </div>
        <img src={traderImg} alt="" width={1200} height={900} loading="lazy"
          className="rounded-2xl border border-border object-cover" />
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <h3 className="font-display text-2xl font-bold">Leadership</h3>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Aria Chen", "CEO"],
            ["Marcus Lindqvist", "CTO"],
            ["Priya Nair", "Chief Risk Officer"],
            ["Daniel Okafor", "Head of Markets"],
          ].map(([n, r]) => (
            <div key={n} className="rounded-2xl border border-border bg-card p-5 text-center">
              <div className="brand-gradient mx-auto h-16 w-16 rounded-full" />
              <p className="mt-4 font-semibold">{n}</p>
              <p className="text-xs text-muted-foreground">{r}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stat({ v, l }: { v: string; l: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <p className="font-display text-xl font-bold text-brand">{v}</p>
      <p className="text-xs uppercase text-muted-foreground">{l}</p>
    </div>
  );
}
