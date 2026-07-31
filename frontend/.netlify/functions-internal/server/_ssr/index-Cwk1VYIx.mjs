import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { S as SiteLayout } from "./SiteLayout-D6Ut5f2G.mjs";
import { T as TickerTape, a as TradingViewWidget } from "./TradingViewWidget-HoBTQETY.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { C as Card, a as CardContent } from "./card-tJ_mUcsW.mjs";
import { B as Badge } from "./badge-DyfXZgLs.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { a as api } from "./api-DONQIbPy.mjs";
import { u as useTranslation } from "../_libs/react-i18next.mjs";
import { i as ArrowRight, j as ChartLine, k as Bitcoin, e as ChartColumn, l as Building2, m as Wallet, n as Smartphone, G as Globe, o as Coins, S as ShieldCheck, B as BookOpen, A as Award, Q as Quote, p as Check } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "./Logo-Di8D-hFn.mjs";
import "./auth-BTtvEmdt.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/i18next.mjs";
import "../_libs/use-sync-external-store.mjs";
const heroImg = "/assets/hero-trading-DBbEqtoz.jpg";
const cityImg = "/assets/section-city-BBRaiEJS.jpg";
function Home() {
  const {
    t
  } = useTranslation();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SiteLayout, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border bg-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TickerTape, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative isolate overflow-hidden bg-sidebar text-white", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroImg, alt: "", width: 1920, height: 1080, className: "absolute inset-0 h-full w-full object-cover opacity-50" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hero-overlay absolute inset-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:py-40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-brand/20 text-white ring-1 ring-brand/40 hover:bg-brand/30", children: t("hero.badge") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-6 max-w-3xl font-display text-4xl font-bold leading-tight sm:text-6xl", children: t("hero.title") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 max-w-2xl text-lg text-white/80", children: t("hero.subtitle") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/auth", search: {
              tab: "register"
            }, children: [
              t("hero.openAccount"),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-1 h-4 w-4" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", variant: "outline", className: "border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/markets", children: t("hero.exploreMarkets") }) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-b border-border bg-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold sm:text-4xl", children: t("intro.title") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground", children: t("intro.desc") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: t("intro.cta") }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { value: "~30ms", label: t("intro.execution") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { value: "24/5", label: t("intro.support") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { value: "0.0", label: t("intro.pips") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { value: "40K+", label: t("intro.instruments") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { value: "450K+", label: t("intro.clients") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { value: "$95B", label: t("intro.aum") })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-secondary/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 py-20 sm:px-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-2xl text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold sm:text-4xl", children: t("assets.title") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: t("assets.subtitle") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AssetCard, { icon: ChartLine, title: "FX", headline: t("assets.fx.headline"), desc: t("assets.fx.desc") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AssetCard, { icon: Bitcoin, title: "Crypto", headline: t("assets.crypto.headline"), desc: t("assets.crypto.desc") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AssetCard, { icon: ChartColumn, title: "Stocks", headline: t("assets.stocks.headline"), desc: t("assets.stocks.desc") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AssetCard, { icon: Building2, title: "Real Estate", headline: t("assets.realestate.headline"), desc: t("assets.realestate.desc") })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "packages", className: "bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 py-20 sm:px-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-2xl text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold sm:text-4xl", children: t("packages.title") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: t("packages.subtitle") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Packages, {})
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "investment-tiers", className: "bg-secondary/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 py-20 sm:px-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-2xl text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold sm:text-4xl", children: "Investment Tiers" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: "Choose the perfect investment plan for your goals" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(InvestmentTiers, {})
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-secondary/50", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-4 py-20 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-10 lg:grid-cols-2 lg:items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold sm:text-4xl", children: t("switch.title") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground", children: t("switch.desc") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Feature, { icon: Wallet, title: t("switch.commissions.title"), desc: t("switch.commissions.desc") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Feature, { icon: Smartphone, title: t("switch.app.title"), desc: t("switch.app.desc") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Feature, { icon: Globe, title: t("switch.anywhere.title"), desc: t("switch.anywhere.desc") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Feature, { icon: Coins, title: t("switch.instruments.title"), desc: t("switch.instruments.desc") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Feature, { icon: ShieldCheck, title: t("switch.safe.title"), desc: t("switch.safe.desc") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Feature, { icon: BookOpen, title: t("switch.education.title"), desc: t("switch.education.desc") })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden bg-sidebar text-white", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: cityImg, alt: "", width: 1600, height: 900, loading: "lazy", className: "absolute inset-0 h-full w-full object-cover opacity-25" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-sidebar/85" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-7xl px-4 py-20 sm:px-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-2xl text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold uppercase tracking-wider text-brand", children: t("howItWorks.label") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 font-display text-3xl font-bold sm:text-4xl", children: t("howItWorks.title") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 grid gap-6 md:grid-cols-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Step, { n: "1", title: t("howItWorks.step1.title"), desc: t("howItWorks.step1.desc") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Step, { n: "2", title: t("howItWorks.step2.title"), desc: t("howItWorks.step2.desc") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Step, { n: "3", title: t("howItWorks.step3.title"), desc: t("howItWorks.step3.desc") })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 py-20 sm:px-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-2xl text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold sm:text-4xl", children: t("testimonials.title") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: t("testimonials.subtitle") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 grid gap-6 md:grid-cols-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Testimonial, { name: "Gabrielle Barger", role: "Help Desk at Pushbullet", quote: "The system is dependable and fast. Knowing I can rely on the support team is a wonderful comfort — they respond quickly and accurately." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Testimonial, { name: "Melvin Cortez", role: "Cloud Architect at Stormpath", quote: "As an engineer in Washington, DC, I started small. Today I'm running a promotional plan — the platform is exactly what I hoped for." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Testimonial, { name: "Gabrielle Jane Daniel", role: "Investor", quote: "A trustworthy business that fulfils its commitments. After a few months of membership I've already earned a respectable sum." })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-secondary/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl px-4 py-16 text-center sm:px-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold sm:text-4xl", children: t("crypto.title") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-3 max-w-xl text-muted-foreground", children: t("crypto.subtitle") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth", search: {
          tab: "register"
        }, children: t("crypto.cta") }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Ledger, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-t border-border bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-4 py-16 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-4", children: [["Global Finance", "Best Derivatives Provider 2024"], ["Service Award", "Golden Peacock Innovative Service Award"], ["Best Execution Broker", "Top-rated broker for execution quality 2024"], ["Best Trading Platform", "Industry-recognised platform of the year"]].map(([t2, s]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 rounded-xl border border-border bg-card p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "mt-1 h-6 w-6 shrink-0 text-brand" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: t2 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: s })
        ] })
      ] }, t2)) }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-t border-border bg-secondary/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 py-16 sm:px-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold sm:text-3xl", children: "Live market overview" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "A snapshot of major markets, updating in real time." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 overflow-hidden rounded-2xl border border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TradingViewWidget, { variant: "market-overview", height: 520, config: {
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
          tabs: [{
            title: "Indices",
            symbols: [{
              s: "FOREXCOM:SPXUSD",
              d: "S&P 500"
            }, {
              s: "FOREXCOM:NSXUSD",
              d: "US 100"
            }, {
              s: "FOREXCOM:DJI",
              d: "Dow 30"
            }]
          }, {
            title: "Crypto",
            symbols: [{
              s: "BITSTAMP:BTCUSD",
              d: "Bitcoin"
            }, {
              s: "BITSTAMP:ETHUSD",
              d: "Ethereum"
            }]
          }, {
            title: "Forex",
            symbols: [{
              s: "FX:EURUSD",
              d: "EUR/USD"
            }, {
              s: "FX:GBPUSD",
              d: "GBP/USD"
            }]
          }]
        } }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(EarningToast, {})
  ] });
}
function Stat({
  value,
  label
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-5 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl font-bold text-brand", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs uppercase tracking-wide text-muted-foreground", children: label })
  ] });
}
function AssetCard({
  icon: Icon,
  title,
  headline,
  desc
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border transition-shadow hover:shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex h-12 w-12 items-center justify-center rounded-lg bg-brand-soft text-brand", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-6 w-6" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-5 font-display text-xl font-bold", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm font-semibold text-brand", children: headline }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: desc })
  ] }) });
}
function Feature({
  icon: Icon,
  title,
  desc
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-6 w-6 text-brand" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "mt-3 font-semibold", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: desc })
  ] });
}
function Step({
  n,
  title,
  desc
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand font-display text-lg font-bold", children: n }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 font-display text-xl font-bold", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-white/70", children: desc })
  ] });
}
function Testimonial({
  name,
  role,
  quote
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Quote, { className: "h-6 w-6 text-brand" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-foreground/90", children: quote }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 border-t border-border pt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: role })
    ] })
  ] }) });
}
function Packages() {
  const {
    t
  } = useTranslation();
  const {
    data: plans
  } = useQuery({
    queryKey: ["plans"],
    queryFn: () => api.getPlans()
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4", children: (plans ?? []).map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: i === 1 ? "border-brand shadow-lg" : "border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground", children: [
      t("packages.minFunding"),
      " $",
      Number(p.minDeposit ?? p.min_deposit).toLocaleString()
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-2 font-display text-xl font-bold", children: p.name }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: p.tagline }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-5 font-display text-3xl font-bold text-brand", children: [
      p.roiPercent ?? p.roi_percent,
      "%"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase text-muted-foreground", children: t("packages.roi") }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-5 space-y-2 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Li, { children: [
        t("packages.minDeposit"),
        ": $",
        Number(p.minDeposit ?? p.min_deposit).toLocaleString()
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Li, { children: [
        t("packages.maxDeposit"),
        ": $",
        Number(p.maxDeposit ?? p.max_deposit).toLocaleString()
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Li, { children: [
        t("packages.referralBonus"),
        ": ",
        p.referralPercent ?? p.referral_percent,
        "%"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Li, { children: [
        t("packages.duration").replace("days", ""),
        " ",
        p.durationDays ?? p.duration_days,
        " ",
        t("packages.duration")
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "mt-6 w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth", search: {
      tab: "register"
    }, children: t("packages.openAccount") }) })
  ] }) }, p.id)) });
}
function InvestmentTiers() {
  const tiers = [{
    name: "Regular",
    duration: "2 Weeks",
    minInvestment: 200,
    returns: 1e3,
    features: ["200+ Pairs", "Leverage Up To 1:500", "Spreads From 1.2 Pips"],
    popular: false
  }, {
    name: "Bronze",
    duration: "1 Month",
    minInvestment: 1e3,
    returns: 1e4,
    features: ["300+ Pairs", "Leverage Up To 1:500", "Spreads From 0.8 Pips"],
    popular: false
  }, {
    name: "Silver",
    duration: "2 Months",
    minInvestment: 1e4,
    returns: 5e4,
    features: ["400+ Pairs", "No Swap Fees", "Leverage Up To 1:500"],
    popular: false
  }, {
    name: "Gold",
    duration: "3 Months",
    minInvestment: 5e4,
    returns: 15e4,
    features: ["400+ Pairs", "No Swap Fees", "Leverage Up To 1:500", "Spreads From 0.3 Pips"],
    popular: true
  }, {
    name: "Diamond",
    duration: "6 Months",
    minInvestment: 15e4,
    returns: 1e6,
    features: ["500+ Pairs", "No Swap Fees", "Priority Support", "Leverage Up To 1:500"],
    popular: false
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5", children: tiers.map((tier) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: `relative ${tier.popular ? "border-brand shadow-xl scale-105" : "border-border"}`, children: [
    tier.popular && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-3 left-1/2 -translate-x-1/2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-brand text-white", children: "Popular" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold", children: tier.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: tier.duration })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-4 border-y border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wide text-muted-foreground", children: "Minimum investment" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 font-display text-2xl font-bold", children: [
          "$",
          tier.minInvestment.toLocaleString()
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wide text-muted-foreground", children: "Returns" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 font-display text-3xl font-bold text-brand", children: [
          "$",
          tier.returns.toLocaleString()
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-4 space-y-2 text-sm", children: tier.features.map((feature) => /* @__PURE__ */ jsxRuntimeExports.jsx(Li, { children: feature }, feature)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "mt-6 w-full", variant: tier.popular ? "default" : "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth", search: {
        tab: "register"
      }, children: tier.popular ? "Get Started" : "Choose Plan" }) })
    ] })
  ] }, tier.name)) });
}
function Li({
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "mt-0.5 h-4 w-4 shrink-0 text-success" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children })
  ] });
}
function Ledger() {
  const {
    t
  } = useTranslation();
  const {
    data
  } = useQuery({
    queryKey: ["ledger"],
    queryFn: () => api.getLedger()
  });
  const deposits = (data ?? []).filter((r) => r.kind === "deposit");
  const withdrawals = (data ?? []).filter((r) => r.kind === "withdraw");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-t border-border bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(LedgerTable, { title: t("ledger.deposits"), rows: deposits, accent: "text-success" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(LedgerTable, { title: t("ledger.withdrawals"), rows: withdrawals, accent: "text-brand" })
  ] }) });
}
const EARNING_NOTIFICATIONS = [{
  name: "James",
  country: "UNITED STATES",
  amount: 3850
}, {
  name: "Maria",
  country: "GERMANY",
  amount: 2200
}, {
  name: "Carlos",
  country: "SPAIN",
  amount: 1750
}, {
  name: "Sophie",
  country: "FRANCE",
  amount: 4100
}, {
  name: "Liam",
  country: "CANADA",
  amount: 2980
}, {
  name: "Priya",
  country: "INDIA",
  amount: 3300
}, {
  name: "Hiroshi",
  country: "JAPAN",
  amount: 1620
}, {
  name: "Elena",
  country: "UKRAINE",
  amount: 2450
}, {
  name: "Lucas",
  country: "BRAZIL",
  amount: 1900
}, {
  name: "Olivia",
  country: "AUSTRALIA",
  amount: 5200
}, {
  name: "Andrei",
  country: "ROMANIA",
  amount: 1340
}, {
  name: "Wei",
  country: "SINGAPORE",
  amount: 3750
}];
function EarningToast() {
  const [visible, setVisible] = reactExports.useState(false);
  const [current, setCurrent] = reactExports.useState(0);
  const timerRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const show = () => {
      setCurrent((c) => (c + 1) % EARNING_NOTIFICATIONS.length);
      setVisible(true);
      timerRef.current = setTimeout(() => {
        setVisible(false);
        timerRef.current = setTimeout(show, 6e3);
      }, 4e3);
    };
    timerRef.current = setTimeout(show, 3e3);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);
  const n = EARNING_NOTIFICATIONS[current];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `fixed bottom-24 left-4 z-50 flex items-center gap-3 rounded-xl border border-yellow-500/30 bg-gray-900 px-4 py-3 shadow-2xl transition-all duration-500 ${visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"}`, style: {
    minWidth: 260
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-yellow-500/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bitcoin, { className: "h-5 w-5 text-yellow-400" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold uppercase tracking-wide text-yellow-400", children: "Earning" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-white", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: n.name }),
        " from",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: n.country }),
        " has just Earned",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-yellow-400", children: [
          "$",
          n.amount.toLocaleString()
        ] }),
        "."
      ] })
    ] })
  ] });
}
function LedgerTable({
  title,
  rows,
  accent
}) {
  const {
    t
  } = useTranslation();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-2xl border border-border bg-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold", children: title }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-secondary/50 text-left text-xs uppercase tracking-wide text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3", children: t("ledger.gateway") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3", children: t("ledger.name") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3", children: t("ledger.amount") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3", children: t("ledger.time") })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: rows.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 font-medium", children: r.gateway }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3", children: r.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: `px-5 py-3 font-semibold ${accent}`, children: [
          "$",
          Number(r.amount).toLocaleString()
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-5 py-3 text-muted-foreground", children: [
          r.hours_ago,
          "h ago"
        ] })
      ] }, r.id)) })
    ] }) })
  ] });
}
export {
  Home as component
};
