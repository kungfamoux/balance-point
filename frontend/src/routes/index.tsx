import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { TickerTape, TradingViewWidget } from "@/components/site/TradingViewWidget";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight, BarChart3, Coins, Building2, LineChart, ShieldCheck, Smartphone,
  Globe, Wallet, BookOpen, Check, Quote, Award, Bitcoin, MessageCircle, X, Send,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import heroImg from "@/assets/hero-trading.jpg";
import cityImg from "@/assets/section-city.jpg";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  return (
    <>
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
            {t("hero.badge")}
          </Badge>
          <h1 className="mt-6 max-w-3xl font-display text-4xl font-bold leading-tight sm:text-6xl">
            {t("hero.title")}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/80">
            {t("hero.subtitle")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/auth" search={{ tab: "register" }}>
                {t("hero.openAccount")} <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white">
              <Link to="/markets">{t("hero.exploreMarkets")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Intro band */}
      <section className="border-b border-border bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              {t("intro.title")}
            </h2>
            <p className="mt-4 text-muted-foreground">{t("intro.desc")}</p>
            <Button asChild className="mt-6">
              <Link to="/#packages">{t("intro.cta")}</Link>
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Stat value="~30ms" label={t("intro.execution")} />
            <Stat value="24/5" label={t("intro.support")} />
            <Stat value="0.0" label={t("intro.pips")} />
            <Stat value="40K+" label={t("intro.instruments")} />
            <Stat value="450K+" label={t("intro.clients")} />
            <Stat value="$95B" label={t("intro.aum")} />
          </div>
        </div>
      </section>

      {/* Asset classes */}
      <section className="bg-secondary/50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">{t("assets.title")}</h2>
            <p className="mt-3 text-muted-foreground">{t("assets.subtitle")}</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <AssetCard icon={LineChart} title="FX" headline={t("assets.fx.headline")} desc={t("assets.fx.desc")} />
            <AssetCard icon={Bitcoin} title="Crypto" headline={t("assets.crypto.headline")} desc={t("assets.crypto.desc")} />
            <AssetCard icon={BarChart3} title="Stocks" headline={t("assets.stocks.headline")} desc={t("assets.stocks.desc")} />
            <AssetCard icon={Building2} title="Real Estate" headline={t("assets.realestate.headline")} desc={t("assets.realestate.desc")} />
          </div>
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">{t("packages.title")}</h2>
            <p className="mt-3 text-muted-foreground">{t("packages.subtitle")}</p>
          </div>
          <Packages />
        </div>
      </section>

      {/* Investment Tiers */}
      <section id="investment-tiers" className="bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">Investment Tiers</h2>
            <p className="mt-3 text-muted-foreground">Choose the perfect investment plan for your goals</p>
          </div>
          <InvestmentTiers />
        </div>
      </section>

      {/* Switch to us */}
      <section className="bg-secondary/50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-display text-3xl font-bold sm:text-4xl">{t("switch.title")}</h2>
              <p className="mt-4 text-muted-foreground">{t("switch.desc")}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Feature icon={Wallet} title={t("switch.commissions.title")} desc={t("switch.commissions.desc")} />
              <Feature icon={Smartphone} title={t("switch.app.title")} desc={t("switch.app.desc")} />
              <Feature icon={Globe} title={t("switch.anywhere.title")} desc={t("switch.anywhere.desc")} />
              <Feature icon={Coins} title={t("switch.instruments.title")} desc={t("switch.instruments.desc")} />
              <Feature icon={ShieldCheck} title={t("switch.safe.title")} desc={t("switch.safe.desc")} />
              <Feature icon={BookOpen} title={t("switch.education.title")} desc={t("switch.education.desc")} />
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
            <p className="text-sm font-semibold uppercase tracking-wider text-brand">{t("howItWorks.label")}</p>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">{t("howItWorks.title")}</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <Step n="1" title={t("howItWorks.step1.title")} desc={t("howItWorks.step1.desc")} />
            <Step n="2" title={t("howItWorks.step2.title")} desc={t("howItWorks.step2.desc")} />
            <Step n="3" title={t("howItWorks.step3.title")} desc={t("howItWorks.step3.desc")} />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">{t("testimonials.title")}</h2>
            <p className="mt-3 text-muted-foreground">{t("testimonials.subtitle")}</p>
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
          <h2 className="font-display text-3xl font-bold sm:text-4xl">{t("crypto.title")}</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">{t("crypto.subtitle")}</p>
          <Button asChild size="lg" className="mt-6">
            <Link to="/auth" search={{ tab: "register" }}>{t("crypto.cta")}</Link>
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
    <ChatWidget />
    <EarningToast />
    </>
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
  const { t } = useTranslation();
  const { data: plans } = useQuery({
    queryKey: ["plans"],
    queryFn: () => api.getPlans() as any,
  });
  return (
    <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {(plans ?? []).map((p, i) => (
        <Card key={p.id} className={i === 1 ? "border-brand shadow-lg" : "border-border"}>
          <CardContent className="p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {t("packages.minFunding")} ${Number(p.minDeposit ?? p.min_deposit).toLocaleString()}
            </p>
            <h3 className="mt-2 font-display text-xl font-bold">{p.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{p.tagline}</p>
            <p className="mt-5 font-display text-3xl font-bold text-brand">{p.roiPercent ?? p.roi_percent}%</p>
            <p className="text-xs uppercase text-muted-foreground">{t("packages.roi")}</p>
            <ul className="mt-5 space-y-2 text-sm">
              <Li>{t("packages.minDeposit")}: ${Number(p.minDeposit ?? p.min_deposit).toLocaleString()}</Li>
              <Li>{t("packages.maxDeposit")}: ${Number(p.maxDeposit ?? p.max_deposit).toLocaleString()}</Li>
              <Li>{t("packages.referralBonus")}: {p.referralPercent ?? p.referral_percent}%</Li>
              <Li>{t("packages.duration").replace("days", "")} {p.durationDays ?? p.duration_days} {t("packages.duration")}</Li>
            </ul>
            <Button asChild className="mt-6 w-full">
              <Link to="/auth" search={{ tab: "register" }}>{t("packages.openAccount")}</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function InvestmentTiers() {
  const tiers = [
    {
      name: "Regular",
      duration: "2 Weeks",
      minInvestment: 200,
      returns: 1000,
      features: ["200+ Pairs", "Leverage Up To 1:500", "Spreads From 1.2 Pips"],
      popular: false,
    },
    {
      name: "Bronze",
      duration: "1 Month",
      minInvestment: 1000,
      returns: 10000,
      features: ["300+ Pairs", "Leverage Up To 1:500", "Spreads From 0.8 Pips"],
      popular: false,
    },
    {
      name: "Silver",
      duration: "2 Months",
      minInvestment: 10000,
      returns: 50000,
      features: ["400+ Pairs", "No Swap Fees", "Leverage Up To 1:500"],
      popular: false,
    },
    {
      name: "Gold",
      duration: "3 Months",
      minInvestment: 50000,
      returns: 150000,
      features: ["400+ Pairs", "No Swap Fees", "Leverage Up To 1:500", "Spreads From 0.3 Pips"],
      popular: true,
    },
    {
      name: "Diamond",
      duration: "6 Months",
      minInvestment: 150000,
      returns: 1000000,
      features: ["500+ Pairs", "No Swap Fees", "Priority Support", "Leverage Up To 1:500"],
      popular: false,
    },
  ];

  return (
    <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {tiers.map((tier) => (
        <Card key={tier.name} className={`relative ${tier.popular ? "border-brand shadow-xl scale-105" : "border-border"}`}>
          {tier.popular && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <Badge className="bg-brand text-white">Popular</Badge>
            </div>
          )}
          <CardContent className="p-6">
            <div className="text-center mb-4">
              <h3 className="font-display text-xl font-bold">{tier.name}</h3>
              <p className="text-sm text-muted-foreground">{tier.duration}</p>
            </div>
            
            <div className="text-center py-4 border-y border-border">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Minimum investment</p>
              <p className="mt-1 font-display text-2xl font-bold">${tier.minInvestment.toLocaleString()}</p>
            </div>

            <div className="text-center py-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Returns</p>
              <p className="mt-1 font-display text-3xl font-bold text-brand">${tier.returns.toLocaleString()}</p>
            </div>

            <ul className="mt-4 space-y-2 text-sm">
              {tier.features.map((feature) => (
                <Li key={feature}>{feature}</Li>
              ))}
            </ul>

            <Button asChild className="mt-6 w-full" variant={tier.popular ? "default" : "outline"}>
              <Link to="/auth" search={{ tab: "register" }}>
                {tier.popular ? "Get Started" : "Choose Plan"}
              </Link>
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
  const { t } = useTranslation();
  const { data } = useQuery({
    queryKey: ["ledger"],
    queryFn: () => api.getLedger() as any,
  });
  const deposits = (data ?? []).filter((r) => r.kind === "deposit");
  const withdrawals = (data ?? []).filter((r) => r.kind === "withdraw");
  return (
    <section className="border-t border-border bg-background">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <LedgerTable title={t("ledger.deposits")} rows={deposits} accent="text-success" />
        <LedgerTable title={t("ledger.withdrawals")} rows={withdrawals} accent="text-brand" />
      </div>
    </section>
  );
}

const EARNING_NOTIFICATIONS = [
  { name: "James", country: "UNITED STATES", amount: 3850 },
  { name: "Maria", country: "GERMANY", amount: 2200 },
  { name: "Carlos", country: "SPAIN", amount: 1750 },
  { name: "Sophie", country: "FRANCE", amount: 4100 },
  { name: "Liam", country: "CANADA", amount: 2980 },
  { name: "Priya", country: "INDIA", amount: 3300 },
  { name: "Hiroshi", country: "JAPAN", amount: 1620 },
  { name: "Elena", country: "UKRAINE", amount: 2450 },
  { name: "Lucas", country: "BRAZIL", amount: 1900 },
  { name: "Olivia", country: "AUSTRALIA", amount: 5200 },
  { name: "Andrei", country: "ROMANIA", amount: 1340 },
  { name: "Wei", country: "SINGAPORE", amount: 3750 },
];

function EarningToast() {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const show = () => {
      setCurrent((c) => (c + 1) % EARNING_NOTIFICATIONS.length);
      setVisible(true);
      timerRef.current = setTimeout(() => {
        setVisible(false);
        timerRef.current = setTimeout(show, 6000);
      }, 4000);
    };
    timerRef.current = setTimeout(show, 3000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  const n = EARNING_NOTIFICATIONS[current];
  return (
    <div
      className={`fixed bottom-24 left-4 z-50 flex items-center gap-3 rounded-xl border border-yellow-500/30 bg-gray-900 px-4 py-3 shadow-2xl transition-all duration-500 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
      }`}
      style={{ minWidth: 260 }}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-yellow-500/20">
        <Bitcoin className="h-5 w-5 text-yellow-400" />
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-yellow-400">Earning</p>
        <p className="text-sm text-white">
          <span className="font-semibold">{n.name}</span> from{" "}
          <span className="font-semibold">{n.country}</span> has just Earned{" "}
          <span className="font-bold text-yellow-400">${n.amount.toLocaleString()}</span>.
        </p>
      </div>
    </div>
  );
}

function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (!message.trim()) return;
    setSent(true);
    setMessage("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="mb-2 w-80 overflow-hidden rounded-2xl border border-border bg-white shadow-2xl">
          <div className="flex items-center justify-between bg-brand px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                <MessageCircle className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Balancepoint Guy</p>
                <p className="text-xs text-white/70">Typically replies instantly</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="p-4">
            {!sent ? (
              <>
                <div className="rounded-xl bg-gray-100 p-3 text-sm text-gray-700">
                  Welcome to our website! 👋 Whether you have a specific question or need
                  assistance, we&apos;re here for you. 😊 What would you like to know?
                </div>
                <div className="mt-4 flex gap-2">
                  <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Type a message..."
                    className="flex-1 rounded-full border border-border bg-gray-50 px-4 py-2 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                  />
                  <button
                    onClick={handleSend}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-white hover:bg-brand/90"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
                <Button
                  className="mt-3 w-full gap-2"
                  onClick={handleSend}
                >
                  <Send className="h-4 w-4" /> Let's chat
                </Button>
              </>
            ) : (
              <div className="py-4 text-center">
                <p className="text-sm text-gray-600">
                  Thanks for reaching out! Our support team will get back to you shortly.
                </p>
                <Button variant="outline" className="mt-4" onClick={() => { setSent(false); setOpen(false); }}>
                  Close
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen((o) => !o)}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white shadow-lg hover:bg-brand/90 transition-transform hover:scale-105"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        {!open && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            1
          </span>
        )}
      </button>
    </div>
  );
}

function LedgerTable({ title, rows, accent }: { title: string; rows: any[]; accent: string }) {
  const { t } = useTranslation();
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="border-b border-border p-5">
        <h3 className="font-display text-xl font-bold">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-secondary/50 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-5 py-3">{t("ledger.gateway")}</th>
              <th className="px-5 py-3">{t("ledger.name")}</th>
              <th className="px-5 py-3">{t("ledger.amount")}</th>
              <th className="px-5 py-3">{t("ledger.time")}</th>
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
