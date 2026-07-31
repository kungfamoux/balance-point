import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useRouterState, L as Link, O as Outlet } from "../_libs/tanstack__react-router.mjs";
import { S as SiteLayout } from "./SiteLayout-D6Ut5f2G.mjs";
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
import "./button-BC9oXVxV.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/tailwind-merge.mjs";
import "./auth-BTtvEmdt.mjs";
import "../_libs/lucide-react.mjs";
const links = [{
  to: "/markets",
  label: "Overview"
}, {
  to: "/markets/forex",
  label: "Forex"
}, {
  to: "/markets/stocks",
  label: "Stocks"
}, {
  to: "/markets/crypto",
  label: "Crypto"
}, {
  to: "/markets/commodities",
  label: "Commodities"
}, {
  to: "/markets/indices",
  label: "Indices"
}, {
  to: "/markets/real-estate",
  label: "Real Estate"
}];
function MarketsLayout() {
  const path = useRouterState({
    select: (s) => s.location.pathname
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SiteLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-b border-border bg-sidebar text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 py-14 sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold uppercase tracking-wider text-brand", children: "Markets" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 font-display text-4xl font-bold sm:text-5xl", children: "All asset classes, one account." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 max-w-2xl text-white/70", children: "Trade and invest across global markets with ultra-tight spreads, low commissions and reliable execution." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 sm:px-6", children: links.map((l) => {
      const active = path === l.to;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: l.to, className: `whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors ${active ? "border-brand text-brand" : "border-transparent text-foreground/70 hover:text-foreground"}`, children: l.label }, l.to);
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {})
  ] });
}
export {
  MarketsLayout as component
};
