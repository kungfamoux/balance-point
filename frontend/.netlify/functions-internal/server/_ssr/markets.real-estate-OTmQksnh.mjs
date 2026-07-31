import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { C as Card, a as CardContent } from "./card-tJ_mUcsW.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { l as Building2, w as MapPin, T as TrendingUp } from "../_libs/lucide-react.mjs";
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
const properties = [{
  name: "Mercury Tower",
  city: "London, UK",
  price: 100,
  yield: "8.4%",
  available: "63%"
}, {
  name: "Atlas Residences",
  city: "Berlin, DE",
  price: 150,
  yield: "7.1%",
  available: "41%"
}, {
  name: "Coral Heights",
  city: "Miami, US",
  price: 200,
  yield: "9.2%",
  available: "28%"
}, {
  name: "Aurora Lofts",
  city: "Toronto, CA",
  price: 120,
  yield: "6.8%",
  available: "52%"
}, {
  name: "Solstice Plaza",
  city: "Dubai, AE",
  price: 250,
  yield: "10.5%",
  available: "19%"
}, {
  name: "Harbour One",
  city: "Sydney, AU",
  price: 180,
  yield: "7.6%",
  available: "37%"
}];
function RealEstate() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl space-y-12 px-4 py-16 sm:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold sm:text-4xl", children: "Real Estate" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: "Our crowdfunding model makes it simple to participate in property markets for small amounts. Procure slots from as little as $100 and earn yield from rent and appreciation." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3", children: properties.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "overflow-hidden border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "brand-gradient flex h-32 items-center justify-center text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-12 w-12 opacity-70" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-bold", children: p.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 flex items-center gap-1 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5" }),
          " ",
          p.city
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid grid-cols-3 gap-2 text-center text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md bg-secondary p-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "From" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-foreground", children: [
              "$",
              p.price
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md bg-secondary p-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Yield" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center justify-center gap-1 font-bold text-success", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-3 w-3" }),
              p.yield
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md bg-secondary p-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Avail." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-brand", children: p.available })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "mt-4 w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth", search: {
          tab: "register"
        }, children: "Invest now" }) })
      ] })
    ] }, p.name)) })
  ] }) });
}
export {
  RealEstate as component
};
