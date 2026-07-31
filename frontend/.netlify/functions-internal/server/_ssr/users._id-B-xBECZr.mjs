import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { g as useParams, L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as useQueryClient, u as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { a as adminApi } from "./router-Brv9oJny.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/i18next.mjs";
import { af as ArrowLeft } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/tailwind-merge.mjs";
function AdminUserDetail() {
  const {
    id
  } = useParams({
    from: "/admin/users/$id"
  });
  const qc = useQueryClient();
  const {
    data,
    isLoading,
    error
  } = useQuery({
    queryKey: ["admin", "user", id],
    queryFn: () => adminApi.getUser(id)
  });
  const [balanceInput, setBalanceInput] = reactExports.useState("");
  const [depositInput, setDepositInput] = reactExports.useState("");
  const [kycInput, setKycInput] = reactExports.useState("");
  const balanceMut = useMutation({
    mutationFn: () => adminApi.updateBalance(id, Number(balanceInput)),
    onSuccess: () => {
      toast.success("Balance updated");
      qc.invalidateQueries({
        queryKey: ["admin", "user", id]
      });
    },
    onError: (e) => toast.error(e.message)
  });
  const depositMut = useMutation({
    mutationFn: () => adminApi.depositToWallet(id, Number(depositInput)),
    onSuccess: () => {
      toast.success("Deposit successful");
      setDepositInput("");
      qc.invalidateQueries({
        queryKey: ["admin", "user", id]
      });
    },
    onError: (e) => toast.error(e.message)
  });
  const kycMut = useMutation({
    mutationFn: () => adminApi.updateKyc(id, kycInput),
    onSuccess: () => {
      toast.success("KYC updated");
      qc.invalidateQueries({
        queryKey: ["admin", "user", id]
      });
    },
    onError: (e) => toast.error(e.message)
  });
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" }) });
  if (error) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-red-400", children: [
      "Failed to load user data: ",
      error.message
    ] }) });
  }
  const {
    profile,
    wallet,
    investments,
    transactions
  } = data ?? {};
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-4xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/users", className: "text-gray-400 hover:text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-white", children: profile?.fullName ?? "User" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-xs font-mono mt-0.5", children: id })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-900 border border-gray-800 rounded-xl p-5 space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-white font-semibold mb-3", children: "Profile" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Full Name", value: profile?.fullName ?? "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Email", value: profile?.email ?? "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Country", value: profile?.country ?? "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Phone", value: profile?.phone ?? "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "KYC Status", value: profile?.kycStatus }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Referral Code", value: profile?.referralCode }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Joined", value: new Date(profile?.createdAt).toLocaleDateString() })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-900 border border-gray-800 rounded-xl p-5 space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-white font-semibold mb-3", children: "Wallet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Balance", value: `$${Number(wallet?.balance ?? 0).toFixed(2)}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Active Investment", value: `$${Number(wallet?.activeInvestment ?? 0).toFixed(2)}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Total Profit", value: `$${Number(wallet?.totalProfit ?? 0).toFixed(2)}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Referral Earnings", value: `$${Number(wallet?.referralEarnings ?? 0).toFixed(2)}` })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-900 border border-gray-800 rounded-xl p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-white font-semibold mb-3", children: "Adjust Balance" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: balanceInput, onChange: (e) => setBalanceInput(e.target.value), placeholder: "New balance", className: "bg-gray-800 border-gray-700 text-white" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => balanceMut.mutate(), disabled: balanceMut.isPending || !balanceInput, className: "bg-blue-600 hover:bg-blue-700 shrink-0", children: "Set" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-900 border border-gray-800 rounded-xl p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-white font-semibold mb-3", children: "Deposit to Wallet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: depositInput, onChange: (e) => setDepositInput(e.target.value), placeholder: "Amount to add", className: "bg-gray-800 border-gray-700 text-white" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => depositMut.mutate(), disabled: depositMut.isPending || !depositInput, className: "bg-green-600 hover:bg-green-700 shrink-0", children: "Add" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-900 border border-gray-800 rounded-xl p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-white font-semibold mb-3", children: "Update KYC" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: kycInput, onChange: (e) => setKycInput(e.target.value), className: "flex-1 bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "verified", children: "verified" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "unverified", children: "unverified" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "rejected", children: "rejected" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => kycMut.mutate(), disabled: kycMut.isPending || !kycInput, className: "bg-blue-600 hover:bg-blue-700 shrink-0", children: "Update" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-900 border border-gray-800 rounded-xl overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-white font-semibold px-5 py-4 border-b border-gray-800", children: "Transactions" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm min-w-[500px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-gray-400 border-b border-gray-800", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2", children: "Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2", children: "Amount" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2", children: "Gateway" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2", children: "Date" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
          (transactions ?? []).map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-gray-800/50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 capitalize text-white", children: t.type }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-2 text-white", children: [
              "$",
              Number(t.amount).toFixed(2)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-gray-400", children: t.gateway ?? "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: t.status }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-gray-400", children: new Date(t.createdAt).toLocaleDateString() })
          ] }, t.id)),
          !transactions?.length && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 5, className: "text-center py-8 text-gray-500", children: "No transactions" }) })
        ] })
      ] }) })
    ] })
  ] });
}
function Row({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-400", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-medium", children: value ?? "—" })
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
  AdminUserDetail as component
};
