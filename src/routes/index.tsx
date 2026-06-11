import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { TickerTape, TradingViewWidget } from "@/components/site/TradingViewWidget";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight, BarChart3, Coins, Building2, LineChart, ShieldCheck, Smartphone,
  Globe, Wallet, BookOpen, Check, Quote, Award, Bitcoin,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import heroImg from "@/assets/hero-trading.jpg";
import cityImg from "@/assets/section-city.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Balancepoint Capital — Trade FX, Stocks, Crypto & Real Estate" },
      { name: "description", content: "We provide professional market infrastructure. Access 40,000+ instruments and invest from a single account." },
      { property: "og:title", content: "Balancepoint Capital" },
      { property: "og:description", content: "Professional market infrastructure across asset classes." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <SiteLayout>
      {/* Ticker tape */}
      <div className="border-b border-border bg-white">
        <TickerTape />
      </div>

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-sidebar text-white">
        <img
          src={heroImg}
          alt=""
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:py-40">
          <Badge className="bg-brand/20 text-white ring-1 ring-brand/40 hover:bg-brand/30">
            Trusted by 450,000+ clients
          </Badge>
          <h1 className="mt-6 max-w-3xl font-display text-4xl font-bold leading-tight sm:text-6xl">
            We provide professional market infrastructure.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/80">
            Access 40,000+ instruments — across asset classes — to trade, hedge and invest from a single account.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/auth" search={{ tab: "register" }}>
                Open an Account <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white">
              <Link to="/markets">Explore Markets</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Intro band */}
      <section className="border-b border-border bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              Trade with low commissions and tight spreads.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Balancepoint Capital provides a transparent price structure with a secure, regulated trading environment.
              Active traders can qualify for lower fees and additional incentives as their volume grows.
            </p>
            <Button asChild className="mt-6">
              <Link to="/#packages">See our Packages</Link>
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Stat value="~30ms" label="Execution speed" />
            <Stat value="24/5" label="Live support" />
            <Stat value="0.0" label="Pips spread" />
            <Stat value="40K+" label="Instruments" />
            <Stat value="450K+" label="Clients" />
            <Stat value="$95B" label="AUM" />
          </div>
        </div>
      </section>

      {/* Asset classes */}
      <section className="bg-secondary/50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">Industry-leading prices</h2>
            <p className="mt-3 text-muted-foreground">
              Ultra-competitive spreads and commissions across every asset class. Better rates as your volume increases.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <AssetCard icon={LineChart} title="FX" headline="From 0.2 pip" desc="182 spot pairs and 140 forwards spanning majors, minors, exotics and metals." />
            <AssetCard icon={Bitcoin} title="Crypto" headline="From 0.4%" desc="Trade top-performing cryptocurrencies with timely signals and tight execution." />
            <AssetCard icon={BarChart3} title="Stocks" headline="From $3" desc="Access 19,000+ equities on 36 global exchanges, core and emerging markets." />
            <AssetCard icon={Building2} title="Real Estate" headline="From $100 / slot" desc="Crowdfunded real estate slots make it simple to participate at small ticket sizes." />
          </div>
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">A package for every trader</h2>
            <p className="mt-3 text-muted-foreground">Explore, learn and grow with portfolio tiers built for every funding size.</p>
          </div>
          <Packages />
        </div>
      </section>

      {/* Switch to us */}
      <section className="bg-secondary/50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-display text-3xl font-bold sm:text-4xl">Switch to Balancepoint Capital</h2>
              <p className="mt-4 text-muted-foreground">
                We work hard to enhance your trading experience. As a global, five-star rated broker, client satisfaction is at the centre of our focus.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Feature icon={Wallet} title="0% commissions" desc="Free delivery plan and brokerage-free trading in the delivery segment." />
              <Feature icon={Smartphone} title="One app for all" desc="Track every global financial market from one mobile app." />
              <Feature icon={Globe} title="Trade from anywhere" desc="Connect to the world's largest exchanges from any device, anywhere." />
              <Feature icon={Coins} title="2,100+ instruments" desc="ETFs, commodities, forex and indices across international markets." />
              <Feature icon={ShieldCheck} title="Safe & Secure" desc="Overseen by world-leading regulators including the FCA." />
              <Feature icon={BookOpen} title="Comprehensive education" desc="An extensive video library to deepen your knowledge of trading." />
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="relative overflow-hidden bg-sidebar text-white">
        <img src={cityImg} alt="" width={1600} height={900} loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-sidebar/85" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand">How Profit Works</p>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">From signup to profit in three steps</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <Step n="1" title="Create Account" desc="Open an account in minutes — no paperwork, no waiting." />
            <Step n="2" title="Choose a Plan" desc="Pick a portfolio that matches your funding size and risk appetite." />
            <Step n="3" title="Get Profit" desc="Watch your investment grow with transparent, real-time tracking." />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">Customers love us</h2>
            <p className="mt-3 text-muted-foreground">Real reviews from traders building portfolios with us.</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <Testimonial name="Gabrielle Barger" role="Help Desk at Pushbullet"
              quote="The system is dependable and fast. Knowing I can rely on the support team is a wonderful comfort — they respond quickly and accurately." />
            <Testimonial name="Melvin Cortez" role="Cloud Architect at Stormpath"
              quote="As an engineer in Washington, DC, I started small. Today I'm running a promotional plan — the platform is exactly what I hoped for." />
            <Testimonial name="Gabrielle Jane Daniel" role="Investor"
              quote="A trustworthy business that fulfils its commitments. After a few months of membership I've already earned a respectable sum." />
          </div>
        </div>
      </section>

      {/* Crypto CTA */}
      <section className="bg-secondary/50">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">We accept crypto deposits</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Deposit, withdraw and hold your balance in Bitcoin and Ethereum.
          </p>
          <Button asChild size="lg" className="mt-6">
            <Link to="/auth" search={{ tab: "register" }}>Get Started</Link>
          </Button>
        </div>
      </section>

      {/* Latest deposits / withdrawals */}
      <Ledger />

      {/* Awards */}
      <section className="border-t border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Global Finance", "Best Derivatives Provider 2024"],
              ["Service Award", "Golden Peacock Innovative Service Award"],
              ["Best Execution Broker", "Top-rated broker for execution quality 2024"],
              ["Best Trading Platform", "Industry-recognised platform of the year"],
            ].map(([t, s]) => (
              <div key={t} className="flex items-start gap-3 rounded-xl border border-border bg-card p-5">
                <Award className="mt-1 h-6 w-6 shrink-0 text-brand" />
                <div>
                  <p className="font-semibold">{t}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{s}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Market overview widget */}
      <section className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">Live market overview</h2>
          <p className="mt-2 text-muted-foreground">A snapshot of major markets, updating in real time.</p>
          <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">
            <TradingViewWidget
              variant="market-overview"
              height={520}
              config={{
                colorTheme: "light",
                dateRange: "12M",
                showChart: true,
                locale: "en",
                largeChartUrl: "",
                isTransparent: false,
                width: "100%",
                height: "100%",
                plotLineColorGrowing: "rgba(33, 150, 243, 1)",
                plotLineColorFalling: "rgba(244, 67, 54, 1)",
                gridLineColor: "rgba(240, 243, 250, 1)",
                scaleFontColor: "rgba(120, 123, 134, 1)",
                belowLineFillColorGrowing: "rgba(33, 150, 243, 0.12)",
                belowLineFillColorFalling: "rgba(244, 67, 54, 0.12)",
                symbolActiveColor: "rgba(33, 150, 243, 0.12)",
                tabs: [
                  { title: "Indices", symbols: [
                    { s: "FOREXCOM:SPXUSD", d: "S&P 500" },
                    { s: "FOREXCOM:NSXUSD", d: "US 100" },
                    { s: "FOREXCOM:DJI", d: "Dow 30" },
                  ]},
                  { title: "Crypto", symbols: [
                    { s: "BITSTAMP:BTCUSD", d: "Bitcoin" },
                    { s: "BITSTAMP:ETHUSD", d: "Ethereum" },
                  ]},
                  { title: "Forex", symbols: [
                    { s: "FX:EURUSD", d: "EUR/USD" },
                    { s: "FX:GBPUSD", d: "GBP/USD" },
                  ]},
                ],
              }}
            />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 text-center">
      <p className="font-display text-2xl font-bold text-brand">{value}</p>
      <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
    </div>
  );
}

function AssetCard({ icon: Icon, title, headline, desc }: { icon: any; title: string; headline: string; desc: string }) {
  return (
    <Card className="border-border transition-shadow hover:shadow-lg">
      <CardContent className="p-6">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-brand-soft text-brand">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="mt-5 font-display text-xl font-bold">{title}</h3>
        <p className="mt-1 text-sm font-semibold text-brand">{headline}</p>
        <p className="mt-3 text-sm text-muted-foreground">{desc}</p>
      </CardContent>
    </Card>
  );
}

function Feature({ icon: Icon, title, desc }: { icon: any; title: string; desc: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <Icon className="h-6 w-6 text-brand" />
      <h4 className="mt-3 font-semibold">{title}</h4>
      <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}

function Step({ n, title, desc }: { n: string; title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand font-display text-lg font-bold">
        {n}
      </div>
      <h3 className="mt-4 font-display text-xl font-bold">{title}</h3>
      <p className="mt-2 text-sm text-white/70">{desc}</p>
    </div>
  );
}

function Testimonial({ name, role, quote }: { name: string; role: string; quote: string }) {
  return (
    <Card className="border-border">
      <CardContent className="p-6">
        <Quote className="h-6 w-6 text-brand" />
        <p className="mt-3 text-sm text-foreground/90">{quote}</p>
        <div className="mt-5 border-t border-border pt-4">
          <p className="font-semibold">{name}</p>
          <p className="text-xs text-muted-foreground">{role}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function Packages() {
  const { data: plans } = useQuery({
    queryKey: ["plans"],
    queryFn: async () => {
      const { data, error } = await supabase.from("plans").select("*").order("sort_order");
      if (error) throw error;
      return data;
    },
  });
  return (
    <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {(plans ?? []).map((p, i) => (
        <Card key={p.id} className={i === 1 ? "border-brand shadow-lg" : "border-border"}>
          <CardContent className="p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Minimum funding ${Number(p.min_deposit).toLocaleString()}
            </p>
            <h3 className="mt-2 font-display text-xl font-bold">{p.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{p.tagline}</p>
            <p className="mt-5 font-display text-3xl font-bold text-brand">{p.roi_percent}%</p>
            <p className="text-xs uppercase text-muted-foreground">Return on investment</p>
            <ul className="mt-5 space-y-2 text-sm">
              <Li>Min deposit: ${Number(p.min_deposit).toLocaleString()}</Li>
              <Li>Max deposit: ${Number(p.max_deposit).toLocaleString()}</Li>
              <Li>Referral bonus: {p.referral_percent}%</Li>
              <Li>Duration: {p.duration_days} days</Li>
            </ul>
            <Button asChild className="mt-6 w-full">
              <Link to="/auth" search={{ tab: "register" }}>Open Account</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function Li({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
      <span>{children}</span>
    </li>
  );
}

function Ledger() {
  const { data } = useQuery({
    queryKey: ["ledger"],
    queryFn: async () => {
      const { data, error } = await supabase.from("public_ledger").select("*").order("sort_order");
      if (error) throw error;
      return data;
    },
  });
  const deposits = (data ?? []).filter((r) => r.kind === "deposit");
  const withdrawals = (data ?? []).filter((r) => r.kind === "withdraw");
  return (
    <section className="border-t border-border bg-background">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <LedgerTable title="Latest Deposits" rows={deposits} accent="text-success" />
        <LedgerTable title="Latest Withdrawals" rows={withdrawals} accent="text-brand" />
      </div>
    </section>
  );
}

function LedgerTable({ title, rows, accent }: { title: string; rows: any[]; accent: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="border-b border-border p-5">
        <h3 className="font-display text-xl font-bold">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-secondary/50 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-5 py-3">Gateway</th>
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Amount</th>
              <th className="px-5 py-3">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((r) => (
              <tr key={r.id}>
                <td className="px-5 py-3 font-medium">{r.gateway}</td>
                <td className="px-5 py-3">{r.name}</td>
                <td className={`px-5 py-3 font-semibold ${accent}`}>${Number(r.amount).toLocaleString()}</td>
                <td className="px-5 py-3 text-muted-foreground">{r.hours_ago}h ago</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
