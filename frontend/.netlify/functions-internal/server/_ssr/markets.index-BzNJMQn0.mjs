import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { C as Card, a as CardContent } from "./card-tJ_mUcsW.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { j as ChartLine, e as ChartColumn, k as Bitcoin, t as Wheat, T as TrendingUp, l as Building2, i as ArrowRight } from "../_libs/lucide-react.mjs";
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
import "./utils-H80jjgLf.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
const items = [{
  to: "/markets/forex",
  icon: ChartLine,
  title: "Forex",
  desc: "182 spot pairs and 140 forwards, spanning majors to exotics."
}, {
  to: "/markets/stocks",
  icon: ChartColumn,
  title: "Stocks",
  desc: "19,000+ equities on 36 global exchanges."
}, {
  to: "/markets/crypto",
  icon: Bitcoin,
  title: "Crypto",
  desc: "Top digital assets with tight execution and live signals."
}, {
  to: "/markets/commodities",
  icon: Wheat,
  title: "Commodities",
  desc: "Energy, metals and agriculture markets in real time."
}, {
  to: "/markets/indices",
  icon: TrendingUp,
  title: "Indices",
  desc: "Track the world's biggest equity benchmarks."
}, {
  to: "/markets/real-estate",
  icon: Building2,
  title: "Real Estate",
  desc: "Crowdfunded slots from $100. Diversify into property."
}];
function Overview() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-4 py-16 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3", children: items.map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "group border-border transition-shadow hover:shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex h-12 w-12 items-center justify-center rounded-lg bg-brand-soft text-brand", children: /* @__PURE__ */ jsxRuntimeExports.jsx(i.icon, { className: "h-6 w-6" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-5 font-display text-xl font-bold", children: i.title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: i.desc }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "ghost", className: "mt-4 px-0 text-brand hover:bg-transparent", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: i.to, children: [
      "Explore ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" })
    ] }) })
  ] }) }, i.to)) }) }) });
}
export {
  Overview as component
};
