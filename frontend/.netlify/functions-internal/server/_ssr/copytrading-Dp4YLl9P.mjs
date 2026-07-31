import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { S as SiteLayout } from "./SiteLayout-D6Ut5f2G.mjs";
import { C as Card, a as CardContent } from "./card-tJ_mUcsW.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { A as Avatar, a as AvatarFallback } from "./avatar-BJDbbUeP.mjs";
import { U as Users, a as Copy, T as TrendingUp, A as Award } from "../_libs/lucide-react.mjs";
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
import "./utils-H80jjgLf.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/radix-ui__react-avatar.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/@radix-ui/react-use-is-hydrated+[...].mjs";
const traders = [{
  handle: "@vulturetrades",
  name: "Vulture trades 🦅",
  roi: null,
  followers: 186900,
  risk: "Medium",
  strategy: "Options trading - here to share knowledge and show the ups and downs of a full time trader. NO PAID SERVICES EVER!"
}, {
  handle: "@StockOptions888",
  name: "SniperAlert",
  roi: "+$6,302,393.49",
  followers: 121300,
  risk: "High",
  strategy: "Multi-millionaire day trader sharing the ins & outs of trading along the way to long term success. NO PAID SERVICE! (03/08/2018 - 12/02/2024)"
}, {
  handle: "@alex_volatility",
  name: "Alex Reyes",
  roi: "+182%",
  followers: 14380,
  risk: "Medium",
  strategy: "FX swing"
}, {
  handle: "@crypto_mira",
  name: "Mira Kapoor",
  roi: "+241%",
  followers: 21750,
  risk: "High",
  strategy: "Crypto trend"
}, {
  handle: "@steady_lin",
  name: "Linus Park",
  roi: "+96%",
  followers: 8120,
  risk: "Low",
  strategy: "Index DCA"
}, {
  handle: "@gold_hunter",
  name: "Diana Vega",
  roi: "+134%",
  followers: 11240,
  risk: "Medium",
  strategy: "Commodities"
}, {
  handle: "@bluechip_tom",
  name: "Tomás Oliveira",
  roi: "+78%",
  followers: 6310,
  risk: "Low",
  strategy: "US stocks"
}, {
  handle: "@scalper_yui",
  name: "Yui Hayashi",
  roi: "+312%",
  followers: 18900,
  risk: "High",
  strategy: "FX scalping"
}];
function Copytrading() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SiteLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-b border-border bg-sidebar text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 py-16 sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold uppercase tracking-wider text-brand", children: "Copytrading" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 font-display text-4xl font-bold sm:text-5xl", children: "Mirror top traders, automatically." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-2xl text-white/70", children: "Browse a marketplace of vetted traders, follow the strategies that match your goals, and copy every trade into your own account in real time." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 py-16 sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 md:grid-cols-3", children: [{
        icon: Users,
        title: "Browse traders",
        desc: "Filter by ROI, risk and asset class."
      }, {
        icon: Copy,
        title: "Allocate capital",
        desc: "Set how much of your balance to mirror."
      }, {
        icon: TrendingUp,
        title: "Track performance",
        desc: "Real-time PnL and trader analytics."
      }].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "h-7 w-7 text-brand" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 font-display text-lg font-bold", children: s.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: s.desc })
      ] }) }, s.title)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold sm:text-3xl", children: "Top performers this month" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "ghost", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth", search: {
            tab: "register"
          }, children: "See all" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: traders.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "h-12 w-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-brand text-white", children: t.name.split(" ").map((n) => n[0]).join("") }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: t.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-4 w-4 text-warning" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: t.handle })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid grid-cols-3 gap-2 text-center text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md bg-secondary p-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "ROI" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-success", children: t.roi ?? "—" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md bg-secondary p-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Risk" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold", children: t.risk })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md bg-secondary p-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Followers" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold", children: t.followers.toLocaleString() })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-sm text-muted-foreground", children: [
            "Strategy: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: t.strategy.length > 60 ? t.strategy.slice(0, 60) + "..." : t.strategy })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "mt-4 w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth", search: {
            tab: "register"
          }, children: "Follow trader" }) })
        ] }) }, t.handle)) })
      ] })
    ] }) })
  ] });
}
export {
  Copytrading as component
};
