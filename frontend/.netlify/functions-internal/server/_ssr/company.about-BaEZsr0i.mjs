import { j as jsxRuntimeExports } from "../_libs/react.mjs";
const traderImg = "/assets/section-trader-CuaBLPk3.jpg";
function About() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold sm:text-4xl", children: "Our mission" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground", children: "Balancepoint Capital was founded on a simple idea: every trader — from a first-time investor to a quantitative hedge fund — deserves access to the same professional market infrastructure." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground", children: "We provide tight spreads, deep liquidity and reliable execution across 40,000+ instruments, all from a single account. Our platform is trusted by over 450,000 clients across 80 countries." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid grid-cols-3 gap-4 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { v: "450K+", l: "Clients" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { v: "$95B+", l: "AUM" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { v: "80", l: "Countries" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: traderImg, alt: "", width: 1200, height: 900, loading: "lazy", className: "rounded-2xl border border-border object-cover" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 pb-16 sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl font-bold", children: "Leadership" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4", children: [["Aria Chen", "CEO"], ["Marcus Lindqvist", "CTO"], ["Priya Nair", "Chief Risk Officer"], ["Daniel Okafor", "Head of Markets"]].map(([n, r]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "brand-gradient mx-auto h-16 w-16 rounded-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 font-semibold", children: n }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: r })
      ] }, n)) })
    ] })
  ] });
}
function Stat({
  v,
  l
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl font-bold text-brand", children: v }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase text-muted-foreground", children: l })
  ] });
}
export {
  About as component
};
