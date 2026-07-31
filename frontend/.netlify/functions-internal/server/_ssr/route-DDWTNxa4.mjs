import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useRouter, O as Outlet, L as Link } from "../_libs/tanstack__react-router.mjs";
import { c as clearAdminToken } from "./router-Brv9oJny.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import "../_libs/sonner.mjs";
import "../_libs/i18next.mjs";
import { X, M as Menu, c as LayoutDashboard, U as Users, d as ArrowLeftRight, T as TrendingUp, e as ChartColumn, f as Ticket, V as Video, B as BookOpen, g as ChevronRight, h as LogOut } from "../_libs/lucide-react.mjs";
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
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "./auth-BTtvEmdt.mjs";
import "../_libs/react-i18next.mjs";
import "../_libs/use-sync-external-store.mjs";
import "../_libs/zod.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
const NAV = [{
  to: "/admin",
  label: "Dashboard",
  icon: LayoutDashboard,
  exact: true
}, {
  to: "/admin/users",
  label: "Users",
  icon: Users
}, {
  to: "/admin/transactions",
  label: "Transactions",
  icon: ArrowLeftRight
}, {
  to: "/admin/investments",
  label: "Investments",
  icon: TrendingUp
}, {
  to: "/admin/plans",
  label: "Plans",
  icon: ChartColumn
}, {
  to: "/admin/tickets",
  label: "Tickets",
  icon: Ticket
}, {
  to: "/admin/sessions",
  label: "Live Sessions",
  icon: Video
}, {
  to: "/admin/ledger",
  label: "Ledger",
  icon: BookOpen
}];
function AdminLayout() {
  const router = useRouter();
  const pathname = router.state.location.pathname;
  const [mobileMenuOpen, setMobileMenuOpen] = reactExports.useState(false);
  if (pathname === "/admin/login") return /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {});
  function logout() {
    clearAdminToken();
    router.navigate({
      to: "/admin/login"
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-screen bg-gray-950 text-white overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setMobileMenuOpen(!mobileMenuOpen), className: "lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-900 border border-gray-800 rounded-lg text-white", children: mobileMenuOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "w-5 h-5" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: cn("fixed lg:static inset-y-0 left-0 z-40 w-64 bg-gray-900 border-r border-gray-800 flex flex-col transform transition-transform duration-300 ease-in-out", mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-5 border-b border-gray-800", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-sm text-blue-400 uppercase tracking-widest", children: "BP Admin" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex-1 px-2 py-4 space-y-1 overflow-y-auto", children: NAV.map((item) => {
        const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: item.to, onClick: () => setMobileMenuOpen(false), className: cn("flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors", active ? "bg-blue-600 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "w-4 h-4 flex-shrink-0" }),
          item.label,
          active && /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3 ml-auto" })
        ] }, item.to);
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 py-4 border-t border-gray-800", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
        logout();
        setMobileMenuOpen(false);
      }, className: "flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4" }),
        "Logout"
      ] }) })
    ] }),
    mobileMenuOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { onClick: () => setMobileMenuOpen(false), className: "lg:hidden fixed inset-0 bg-black/50 z-30" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 overflow-y-auto lg:ml-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 lg:p-6 pt-16 lg:pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }) })
  ] });
}
export {
  AdminLayout as component
};
