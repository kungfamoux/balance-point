import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { P as PageHeader } from "./DashboardShell-BgoTQ4yP.mjs";
import { C as Card, a as CardContent } from "./card-tJ_mUcsW.mjs";
import { B as Badge } from "./badge-DyfXZgLs.mjs";
import { T as Tabs, a as TabsList, b as TabsTrigger } from "./tabs-D_u1EXWn.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { a as useQueryClient, u as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { a as api } from "./api-DONQIbPy.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/i18next.mjs";
import { X } from "../_libs/lucide-react.mjs";
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
import "./router-Brv9oJny.mjs";
import "../_libs/tanstack__query-core.mjs";
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
import "./input-C0QjszdI.mjs";
import "../_libs/radix-ui__react-separator.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/radix-ui__react-tooltip.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "./Logo-Di8D-hFn.mjs";
import "../_libs/radix-ui__react-dropdown-menu.mjs";
import "../_libs/radix-ui__react-menu.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "./avatar-BJDbbUeP.mjs";
import "../_libs/radix-ui__react-avatar.mjs";
import "../_libs/@radix-ui/react-use-is-hydrated+[...].mjs";
import "../_libs/radix-ui__react-tabs.mjs";
const filters = ["all", "deposit", "withdraw", "investment", "profit", "referral"];
function Transactions() {
  const [filter, setFilter] = reactExports.useState("all");
  const qc = useQueryClient();
  const {
    data
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => api.getTransactions()
  });
  const cancelWithdrawalMut = useMutation({
    mutationFn: (id) => api.cancelWithdrawal(id),
    onSuccess: () => {
      toast.success("Withdrawal cancelled");
      qc.invalidateQueries({
        queryKey: ["transactions"]
      });
      qc.invalidateQueries({
        queryKey: ["wallet-balance"]
      });
    },
    onError: (e) => toast.error(e.message)
  });
  const rows = (data ?? []).filter((t) => filter === "all" || t.type === filter);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Transaction History", description: "All movements across your account." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Tabs, { value: filter, onValueChange: setFilter, className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TabsList, { className: "overflow-x-auto", children: filters.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: f, className: "capitalize", children: f }, f)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-secondary/50 text-left text-xs uppercase tracking-wide text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3", children: "Type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3", children: "Gateway" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3", children: "Amount" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3", children: "Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { className: "divide-y divide-border", children: [
        rows.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 6, className: "px-5 py-10 text-center text-muted-foreground", children: "No transactions yet." }) }),
        rows.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 capitalize", children: t.type }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3", children: t.gateway ?? "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-5 py-3 font-semibold", children: [
            "$",
            Number(t.amount).toLocaleString()
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: t.status === "confirmed" || t.status === "approved" ? "default" : t.status === "pending" ? "secondary" : "destructive", children: t.status }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 text-muted-foreground", children: new Date(t.createdAt ?? t.created_at).toLocaleString() }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3", children: t.type === "withdraw" && t.status === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "destructive", className: "h-7 px-2 text-xs", onClick: () => cancelWithdrawalMut.mutate(t.id), disabled: cancelWithdrawalMut.isPending, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3 mr-1" }),
            "Cancel"
          ] }) })
        ] }, t.id))
      ] })
    ] }) }) }) })
  ] });
}
export {
  Transactions as component
};
