import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useQueryClient, u as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { a as adminApi } from "./router-Brv9oJny.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { A as AdminPageHeader } from "./AdminPageHeader-DwPoOF5u.mjs";
import "../_libs/i18next.mjs";
import { p as Check } from "../_libs/lucide-react.mjs";
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
function AdminInvestments() {
  const qc = useQueryClient();
  const {
    data: investments = [],
    isLoading
  } = useQuery({
    queryKey: ["admin", "investments"],
    queryFn: adminApi.getInvestments
  });
  const [editingId, setEditingId] = reactExports.useState(null);
  const [editProfit, setEditProfit] = reactExports.useState("");
  const [editStatus, setEditStatus] = reactExports.useState("");
  const updateMut = useMutation({
    mutationFn: ({
      id,
      body
    }) => adminApi.updateInvestment(id, body),
    onSuccess: () => {
      toast.success("Investment updated");
      setEditingId(null);
      setEditProfit("");
      setEditStatus("");
      qc.invalidateQueries({
        queryKey: ["admin", "investments"]
      });
    },
    onError: (e) => toast.error(e.message)
  });
  const handleEdit = (inv) => {
    setEditingId(inv.id);
    setEditProfit(String(inv.profit));
    setEditStatus(inv.status);
  };
  const handleSave = (id) => {
    updateMut.mutate({
      id,
      body: {
        ...editProfit ? {
          profit: Number(editProfit)
        } : {},
        ...editStatus ? {
          status: editStatus
        } : {}
      }
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AdminPageHeader, { title: "Investments", description: `${investments.length} total investments` }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:hidden space-y-3", children: [
        investments.map((inv) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-900 border border-gray-800 rounded-xl p-4 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-medium", children: inv.plan?.name ?? "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-500 text-xs font-mono mt-0.5", children: [
                inv.userId.slice(0, 8),
                "…"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-block px-2 py-0.5 rounded-full text-xs text-white ${inv.status === "active" ? "bg-green-600" : inv.status === "completed" ? "bg-blue-600" : "bg-gray-600"}`, children: inv.status })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-xs", children: "Amount" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white", children: [
                "$",
                Number(inv.amount).toFixed(2)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-xs", children: "ROI" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white", children: [
                Number(inv.roiPercent).toFixed(1),
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-xs", children: "Profit" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-green-400", children: editingId === inv.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: editProfit, onChange: (e) => setEditProfit(e.target.value), className: "bg-gray-800 border-gray-700 text-white h-8 w-full text-sm mt-0" }) : `$${Number(inv.profit).toFixed(2)}` })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-xs", children: "Duration" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-400", children: [
                new Date(inv.startAt).toLocaleDateString(),
                " – ",
                new Date(inv.endAt).toLocaleDateString()
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            editingId === inv.id ? /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: editStatus, onChange: (e) => setEditStatus(e.target.value), className: "bg-gray-800 border-gray-700 text-white rounded-md px-2 py-1 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "active", children: "active" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "completed", children: "completed" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "cancelled", children: "cancelled" })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: editingId === inv.id ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", className: "bg-green-700 hover:bg-green-600 h-8 px-3", onClick: () => handleSave(inv.id), disabled: updateMut.isPending, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", className: "bg-gray-700 hover:bg-gray-600 h-8 px-3", onClick: () => setEditingId(null), children: "✕" })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", className: "bg-blue-700 hover:bg-blue-600 h-8 px-4 text-xs", onClick: () => handleEdit(inv), children: "Edit" }) })
          ] })
        ] }, inv.id)),
        investments.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-12 text-gray-500", children: "No investments found" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden lg:block bg-gray-900 border border-gray-800 rounded-xl overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm min-w-[640px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-gray-800 text-gray-400", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3", children: "User ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3", children: "Plan" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3", children: "Amount" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3", children: "ROI %" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3", children: "Profit" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3", children: "Start" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3", children: "End" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
          investments.map((inv) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-gray-800/50 hover:bg-gray-800/20 transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-gray-400 font-mono text-xs max-w-[100px] truncate", children: inv.userId }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-white", children: inv.plan?.name ?? "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-white", children: [
              "$",
              Number(inv.amount).toFixed(2)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-white", children: [
              Number(inv.roiPercent).toFixed(1),
              "%"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: editingId === inv.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: editProfit, onChange: (e) => setEditProfit(e.target.value), className: "bg-gray-800 border-gray-700 text-white h-8 w-24 text-sm" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-green-400", children: [
              "$",
              Number(inv.profit).toFixed(2)
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: editingId === inv.id ? /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: editStatus, onChange: (e) => setEditStatus(e.target.value), className: "bg-gray-800 border-gray-700 text-white rounded-md px-2 py-1 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "active", children: "active" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "completed", children: "completed" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "cancelled", children: "cancelled" })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-block px-2 py-0.5 rounded-full text-xs text-white ${inv.status === "active" ? "bg-green-600" : inv.status === "completed" ? "bg-blue-600" : "bg-gray-600"}`, children: inv.status }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-gray-400", children: new Date(inv.startAt).toLocaleDateString() }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-gray-400", children: new Date(inv.endAt).toLocaleDateString() }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: editingId === inv.id ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", className: "bg-green-700 hover:bg-green-600 h-7 px-2", onClick: () => handleSave(inv.id), disabled: updateMut.isPending, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", className: "bg-gray-700 hover:bg-gray-600 h-7 px-2", onClick: () => setEditingId(null), children: "✕" })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", className: "bg-blue-700 hover:bg-blue-600 h-7 px-3 text-xs", onClick: () => handleEdit(inv), children: "Edit" }) })
          ] }, inv.id)),
          investments.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 9, className: "text-center py-12 text-gray-500", children: "No investments found" }) })
        ] })
      ] }) })
    ] })
  ] });
}
export {
  AdminInvestments as component
};
