import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { a as adminApi } from "./router-Brv9oJny.mjs";
import { A as AdminPageHeader } from "./AdminPageHeader-DwPoOF5u.mjs";
import "../_libs/sonner.mjs";
import "../_libs/i18next.mjs";
import { U as Users, T as TrendingUp, u as CircleArrowDown, v as CircleArrowUp, C as Clock, S as ShieldCheck, g as ChevronRight } from "../_libs/lucide-react.mjs";
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
import "./auth-BTtvEmdt.mjs";
import "../_libs/react-i18next.mjs";
import "../_libs/use-sync-external-store.mjs";
import "../_libs/zod.mjs";
function StatCard({
  icon: Icon,
  label,
  value,
  color,
  to,
  search
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to, search, className: "group bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-5 flex items-center gap-4 hover:border-gray-600 hover:shadow-lg hover:shadow-gray-900/20 transition-all duration-200 cursor-pointer", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `p-3 rounded-xl ${color} group-hover:scale-110 transition-transform duration-200 shadow-lg`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5 text-white" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-xs uppercase tracking-wide group-hover:text-gray-300 transition-colors", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-bold text-2xl mt-0.5", children: value })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5 text-gray-600 group-hover:text-gray-400 group-hover:translate-x-1 transition-all duration-200" })
  ] });
}
function AdminDashboard() {
  const {
    data: stats,
    isLoading
  } = useQuery({
    queryKey: ["admin", "stats"],
    queryFn: adminApi.getStats,
    refetchInterval: 3e4
  });
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" }) });
  const fmt = (n) => "$" + Number(n).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AdminPageHeader, { title: "Dashboard", description: "Platform overview" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: Users, label: "Total Users", value: stats?.totalUsers ?? 0, color: "bg-blue-600", to: "/admin/users" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: TrendingUp, label: "Total Investments", value: stats?.totalInvestments ?? 0, color: "bg-violet-600", to: "/admin/investments" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: CircleArrowDown, label: "Total Deposited", value: fmt(stats?.totalDeposited ?? 0), color: "bg-green-600", to: "/admin/transactions", search: {
        type: "deposit"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: CircleArrowUp, label: "Total Withdrawn", value: fmt(stats?.totalWithdrawn ?? 0), color: "bg-orange-600", to: "/admin/transactions", search: {
        type: "withdrawal"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: Clock, label: "Pending Deposits", value: stats?.pendingDeposits ?? 0, color: "bg-yellow-600", to: "/admin/transactions", search: {
        type: "deposit",
        status: "pending"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: ShieldCheck, label: "Pending KYC", value: stats?.pendingKyc ?? 0, color: "bg-purple-600", to: "/admin/kyc" })
    ] }),
    (stats?.pendingDeposits > 0 || stats?.pendingWithdrawals > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-yellow-900/40 to-orange-900/40 border border-yellow-700/50 rounded-xl p-4 text-yellow-300 text-sm", children: [
      "⚠ You have ",
      stats.pendingDeposits,
      " pending deposit(s) and ",
      stats.pendingWithdrawals,
      " pending withdrawal(s) awaiting approval."
    ] })
  ] });
}
export {
  AdminDashboard as component
};
