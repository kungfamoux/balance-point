import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { C as Card, a as CardContent } from "./card-tJ_mUcsW.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { B as Badge } from "./badge-DyfXZgLs.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
const roles = [{
  title: "Senior Backend Engineer",
  team: "Platform",
  location: "London / Remote",
  type: "Full-time"
}, {
  title: "Quant Researcher",
  team: "Markets",
  location: "London",
  type: "Full-time"
}, {
  title: "Product Designer",
  team: "Design",
  location: "Remote (EU)",
  type: "Full-time"
}, {
  title: "Compliance Officer",
  team: "Risk",
  location: "London",
  type: "Full-time"
}, {
  title: "Customer Operations Lead",
  team: "Support",
  location: "Singapore",
  type: "Full-time"
}, {
  title: "Growth Marketing Manager",
  team: "Marketing",
  location: "Remote",
  type: "Full-time"
}];
function Careers() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 py-16 sm:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold sm:text-4xl", children: "Join the team" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: "We're building the platform that powers the next generation of investors. If that sounds interesting, we'd love to hear from you." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid gap-4", children: roles.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex flex-col items-start justify-between gap-3 p-5 sm:flex-row sm:items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg font-semibold", children: r.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: r.team })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
          r.location,
          " · ",
          r.type
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", children: "Apply" })
    ] }) }, r.title)) })
  ] }) });
}
export {
  Careers as component
};
