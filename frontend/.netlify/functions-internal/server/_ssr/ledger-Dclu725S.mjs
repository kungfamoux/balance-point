import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useQueryClient, u as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { a as adminApi } from "./router-Brv9oJny.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { L as Label } from "./label-JU3yqRBo.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { A as AdminPageHeader } from "./AdminPageHeader-DwPoOF5u.mjs";
import "../_libs/i18next.mjs";
import { D as Plus, X, H as Pencil, z as Trash2 } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
const EMPTY = {
  kind: "deposit",
  gateway: "BTC",
  name: "",
  amount: "",
  hoursAgo: "",
  sortOrder: "0"
};
function AdminLedger() {
  const qc = useQueryClient();
  const {
    data: entries = [],
    isLoading
  } = useQuery({
    queryKey: ["admin", "ledger"],
    queryFn: adminApi.getLedger
  });
  const [form, setForm] = reactExports.useState(null);
  const [editId, setEditId] = reactExports.useState(null);
  const createMut = useMutation({
    mutationFn: (body) => adminApi.createLedgerEntry(body),
    onSuccess: () => {
      toast.success("Entry created");
      qc.invalidateQueries({
        queryKey: ["admin", "ledger"]
      });
      setForm(null);
    },
    onError: (e) => toast.error(e.message)
  });
  const updateMut = useMutation({
    mutationFn: ({
      id,
      body
    }) => adminApi.updateLedgerEntry(id, body),
    onSuccess: () => {
      toast.success("Entry updated");
      qc.invalidateQueries({
        queryKey: ["admin", "ledger"]
      });
      setForm(null);
      setEditId(null);
    },
    onError: (e) => toast.error(e.message)
  });
  const deleteMut = useMutation({
    mutationFn: (id) => adminApi.deleteLedgerEntry(id),
    onSuccess: () => {
      toast.success("Entry deleted");
      qc.invalidateQueries({
        queryKey: ["admin", "ledger"]
      });
    },
    onError: (e) => toast.error(e.message)
  });
  function openEdit(entry) {
    setEditId(entry.id);
    setForm({
      kind: entry.kind,
      gateway: entry.gateway,
      name: entry.name,
      amount: entry.amount,
      hoursAgo: entry.hoursAgo,
      sortOrder: entry.sortOrder
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!form) return;
    const body = {
      ...form,
      amount: Number(form.amount),
      hoursAgo: Number(form.hoursAgo),
      sortOrder: Number(form.sortOrder)
    };
    if (editId) updateMut.mutate({
      id: editId,
      body
    });
    else createMut.mutate(body);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AdminPageHeader, { title: "Public Ledger", description: "Manage visible transaction feed on homepage", actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => {
      setEditId(null);
      setForm(EMPTY);
    }, className: "bg-blue-600 hover:bg-blue-700 gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
      " Add Entry"
    ] }) }),
    form && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-900 border border-gray-700 rounded-xl p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-white font-semibold", children: editId ? "Edit Entry" : "New Entry" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
          setForm(null);
          setEditId(null);
        }, className: "text-gray-400 hover:text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-gray-300 text-sm", children: "Kind" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: form.kind, onChange: (e) => setForm((f) => f ? {
            ...f,
            kind: e.target.value
          } : f), className: "mt-1 w-full bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "deposit", children: "deposit" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "withdrawal", children: "withdrawal" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "profit", children: "profit" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-gray-300 text-sm", children: "Gateway" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.gateway, onChange: (e) => setForm((f) => f ? {
            ...f,
            gateway: e.target.value
          } : f), className: "mt-1 bg-gray-800 border-gray-700 text-white", placeholder: "BTC" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-gray-300 text-sm", children: "Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.name, onChange: (e) => setForm((f) => f ? {
            ...f,
            name: e.target.value
          } : f), className: "mt-1 bg-gray-800 border-gray-700 text-white", placeholder: "J*** D***" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-gray-300 text-sm", children: "Amount ($)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", step: "0.01", value: form.amount, onChange: (e) => setForm((f) => f ? {
            ...f,
            amount: e.target.value
          } : f), className: "mt-1 bg-gray-800 border-gray-700 text-white" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-gray-300 text-sm", children: "Hours Ago" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: form.hoursAgo, onChange: (e) => setForm((f) => f ? {
            ...f,
            hoursAgo: e.target.value
          } : f), className: "mt-1 bg-gray-800 border-gray-700 text-white" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-gray-300 text-sm", children: "Sort Order" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: form.sortOrder, onChange: (e) => setForm((f) => f ? {
            ...f,
            sortOrder: e.target.value
          } : f), className: "mt-1 bg-gray-800 border-gray-700 text-white" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-1 sm:col-span-2 flex gap-2 justify-end pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: () => {
            setForm(null);
            setEditId(null);
          }, className: "border-gray-700 text-gray-300", children: "Cancel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "bg-blue-600 hover:bg-blue-700", disabled: createMut.isPending || updateMut.isPending, children: editId ? "Update" : "Create" })
        ] })
      ] })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:hidden space-y-3", children: [
        entries.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-900 border border-gray-800 rounded-xl p-4 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-medium capitalize", children: e.kind }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-xs", children: e.gateway })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white font-medium", children: [
              "$",
              Number(e.amount).toFixed(2)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-xs", children: "Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-300", children: e.name })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-xs", children: "Hours Ago" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-400", children: [
                e.hoursAgo,
                "h"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", className: "border-gray-700 text-gray-300 h-8 px-3", onClick: () => openEdit(e), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-3.5 h-3.5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", className: "bg-red-700 hover:bg-red-600 h-8 px-3", onClick: () => {
              if (confirm("Delete entry?")) deleteMut.mutate(e.id);
            }, disabled: deleteMut.isPending, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" }) })
          ] })
        ] }, e.id)),
        entries.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-12 text-gray-500", children: "No ledger entries" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden lg:block bg-gray-900 border border-gray-800 rounded-xl overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm min-w-[500px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-gray-800 text-gray-400", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3", children: "Kind" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3", children: "Gateway" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3", children: "Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3", children: "Amount" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3", children: "Hours Ago" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
          entries.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-gray-800/50 hover:bg-gray-800/20 transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 capitalize text-white", children: e.kind }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-gray-300", children: e.gateway }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-gray-300", children: e.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-white", children: [
              "$",
              Number(e.amount).toFixed(2)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-gray-400", children: [
              e.hoursAgo,
              "h"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5 justify-end", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", className: "border-gray-700 text-gray-300 h-7 w-7 p-0", onClick: () => openEdit(e), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-3.5 h-3.5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", className: "bg-red-700 hover:bg-red-600 h-7 w-7 p-0", onClick: () => {
                if (confirm("Delete entry?")) deleteMut.mutate(e.id);
              }, disabled: deleteMut.isPending, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" }) })
            ] }) })
          ] }, e.id)),
          entries.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 6, className: "text-center py-12 text-gray-500", children: "No ledger entries" }) })
        ] })
      ] }) })
    ] })
  ] });
}
export {
  AdminLedger as component
};
