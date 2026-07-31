import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useQueryClient, u as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { a as adminApi } from "./router-Brv9oJny.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { A as AdminPageHeader } from "./AdminPageHeader-DwPoOF5u.mjs";
import "../_libs/i18next.mjs";
import { J as FileText, K as User, N as Calendar, X, p as Check } from "../_libs/lucide-react.mjs";
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
function AdminKyc() {
  const qc = useQueryClient();
  const {
    data: kycDocs = [],
    isLoading
  } = useQuery({
    queryKey: ["admin", "kyc"],
    queryFn: adminApi.getKycDocuments
  });
  const approveMut = useMutation({
    mutationFn: ({
      id,
      status
    }) => adminApi.updateKycDocument(id, status),
    onSuccess: () => {
      toast.success("KYC document updated");
      qc.invalidateQueries({
        queryKey: ["admin", "kyc"]
      });
      qc.invalidateQueries({
        queryKey: ["admin", "users"]
      });
    },
    onError: (e) => toast.error(e.message)
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AdminPageHeader, { title: "KYC Approvals", description: `${kycDocs.length} pending submissions` }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" }) }) : kycDocs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-900 border border-gray-800 rounded-xl p-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-12 h-12 text-gray-600 mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500", children: "No pending KYC submissions" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: kycDocs.map((doc) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gray-900 border border-gray-800 rounded-xl p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-start justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-5 h-5 text-gray-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-medium", children: doc.profile?.fullName || "Unknown User" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-xs font-mono", children: doc.userId })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-5 h-5 text-gray-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white capitalize", children: doc.documentType.replace(/_/g, " ") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: doc.documentUrl, target: "_blank", rel: "noopener noreferrer", className: "text-blue-400 text-xs hover:text-blue-300", children: "View Document" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-5 h-5 text-gray-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-400 text-sm", children: [
            "Submitted ",
            new Date(doc.createdAt).toLocaleDateString()
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 sm:flex-row flex-row-reverse", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", className: "bg-red-700 hover:bg-red-600 h-9 px-4", onClick: () => approveMut.mutate({
          id: doc.id,
          status: "rejected"
        }), disabled: approveMut.isPending, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4 mr-1" }),
          "Reject"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", className: "bg-green-700 hover:bg-green-600 h-9 px-4", onClick: () => approveMut.mutate({
          id: doc.id,
          status: "approved"
        }), disabled: approveMut.isPending, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 mr-1" }),
          "Approve"
        ] })
      ] })
    ] }) }, doc.id)) })
  ] });
}
export {
  AdminKyc as component
};
