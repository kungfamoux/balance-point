import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
const logoMark = "/assets/logo-mark-hy7FaEj-.png";
function Logo({ light = false }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logoMark, alt: "", width: 36, height: 36, className: "h-9 w-9" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "span",
      {
        className: `font-display text-lg font-bold tracking-tight ${light ? "text-white" : "text-brand"}`,
        children: [
          "Balancepoint ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium opacity-90", children: "Capital" })
        ]
      }
    )
  ] });
}
export {
  Logo as L
};
