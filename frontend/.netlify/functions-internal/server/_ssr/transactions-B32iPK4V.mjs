import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useQueryClient, u as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { b as Route$q, a as adminApi } from "./router-Brv9oJny.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { A as AdminPageHeader } from "./AdminPageHeader-DwPoOF5u.mjs";
import "../_libs/i18next.mjs";
import { p as Check, X } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-router.mjs";
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
import "./auth-BTtvEmdt.mjs";
import "../_libs/react-i18next.mjs";
import "../_libs/use-sync-external-store.mjs";
import "../_libs/zod.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/tailwind-merge.mjs";
function AdminTransactions() {
  const search = Route$q.useSearch();
  const navigate = Route$q.useNavigate();
  const qc = useQueryClient();
  const {
    data: txs = [],
    isLoading
  } = useQuery({
    queryKey: ["admin", "transactions", search.type, search.status],
    queryFn: () => adminApi.getTransactions(search.type || void 0, search.status || void 0)
  });
  const approveMut = useMutation({
    mutationFn: (id) => adminApi.approveTransaction(id),
    onSuccess: () => {
      toast.success("Transaction approved");
      qc.invalidateQueries({
        queryKey: ["admin", "transactions"]
      });
      qc.invalidateQueries({
        queryKey: ["admin", "stats"]
      });
    },
    onError: (e) => toast.error(e.message)
  });
  const rejectMut = useMutation({
    mutationFn: (id) => adminApi.rejectTransaction(id),
    onSuccess: () => {
      toast.success("Transaction rejected");
      qc.invalidateQueries({
        queryKey: ["admin", "transactions"]
      });
    },
    onError: (e) => toast.error(e.message)
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AdminPageHeader, { title: "Transactions", description: `${txs.length} results`, actions: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: search.type, onChange: (e) => navigate({
        search: {
          ...search,
          type: e.target.value
        }
      }), className: "bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-1.5 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "All types" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "deposit", children: "Deposit" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "withdrawal", children: "Withdrawal" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: search.status, onChange: (e) => navigate({
        search: {
          ...search,
          status: e.target.value
        }
      }), className: "bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-1.5 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "All statuses" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "pending", children: "Pending" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "approved", children: "Approved" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "rejected", children: "Rejected" })
      ] })
    ] }) }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:hidden space-y-3", children: [
        txs.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-900 border border-gray-800 rounded-xl p-4 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-medium capitalize", children: t.type }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-500 text-xs font-mono mt-0.5", children: [
                t.userId.slice(0, 8),
                "…"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: t.status })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-white font-medium", children: [
              "$",
              Number(t.amount).toFixed(2)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-400", children: t.gateway ?? "—" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: new Date(t.createdAt).toLocaleDateString() }),
            t.status === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", className: "bg-green-700 hover:bg-green-600 h-7 px-2", onClick: () => approveMut.mutate(t.id), disabled: approveMut.isPending, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", className: "bg-red-700 hover:bg-red-600 h-7 px-2", onClick: () => rejectMut.mutate(t.id), disabled: rejectMut.isPending, children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" }) })
            ] })
          ] })
        ] }, t.id)),
        txs.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-12 text-gray-500", children: "No transactions found" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden lg:block bg-gray-900 border border-gray-800 rounded-xl overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm min-w-[600px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-gray-800 text-gray-400", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3", children: "User ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3", children: "Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3", children: "Amount" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3", children: "Gateway" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3", children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
          txs.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-gray-800/50 hover:bg-gray-800/20 transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-gray-400 font-mono text-xs max-w-[120px] truncate", children: t.userId }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 capitalize text-white", children: t.type }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-white font-medium", children: [
              "$",
              Number(t.amount).toFixed(2)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-gray-400", children: t.gateway ?? "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: t.status }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-gray-400", children: new Date(t.createdAt).toLocaleDateString() }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: t.status === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", className: "bg-green-700 hover:bg-green-600 h-7 px-2", onClick: () => approveMut.mutate(t.id), disabled: approveMut.isPending, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", className: "bg-red-700 hover:bg-red-600 h-7 px-2", onClick: () => rejectMut.mutate(t.id), disabled: rejectMut.isPending, children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" }) })
            ] }) })
          ] }, t.id)),
          txs.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 7, className: "text-center py-12 text-gray-500", children: "No transactions found" }) })
        ] })
      ] }) })
    ] })
  ] });
}
function StatusBadge({
  status
}) {
  const map = {
    approved: "bg-green-600",
    pending: "bg-yellow-600",
    rejected: "bg-red-600"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-block px-2 py-0.5 rounded-full text-xs text-white ${map[status] ?? "bg-gray-600"}`, children: status });
}
export {
  AdminTransactions as component
};
