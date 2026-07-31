import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useRouter } from "../_libs/tanstack__react-router.mjs";
import { a as adminApi, s as setAdminToken } from "./router-Brv9oJny.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { L as Label } from "./label-JU3yqRBo.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/i18next.mjs";
import { S as ShieldCheck, I as TriangleAlert, X } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [paymentSuspended, setPaymentSuspended] = reactExports.useState(false);
  const [checkingStatus, setCheckingStatus] = reactExports.useState(true);
  reactExports.useEffect(() => {
    adminApi.getPaymentStatus().then((data) => setPaymentSuspended(data.suspended)).catch(() => {
    }).finally(() => setCheckingStatus(false));
  }, []);
  async function handleSubmit(e) {
    e.preventDefault();
    if (paymentSuspended) return;
    setLoading(true);
    try {
      const {
        token
      } = await adminApi.login(email, password);
      setAdminToken(token);
      router.navigate({
        to: "/admin"
      });
    } catch (err) {
      toast.error(err.message ?? "Login failed");
    } finally {
      setLoading(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex items-center justify-center bg-gray-950 px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-blue-600 rounded-full p-3 mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-7 h-7 text-white" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-white", children: "Admin Portal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-sm mt-1", children: "Balance Point Capital" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-gray-300 text-sm", children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true, className: "mt-1 bg-gray-800 border-gray-700 text-white", placeholder: "admin@example.com" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-gray-300 text-sm", children: "Password" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true, className: "mt-1 bg-gray-800 border-gray-700 text-white", placeholder: "••••••••" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "w-full bg-blue-600 hover:bg-blue-700", disabled: loading || paymentSuspended || checkingStatus, children: checkingStatus ? "Checking…" : paymentSuspended ? "Suspended" : loading ? "Signing in…" : "Sign In" })
      ] })
    ] }),
    paymentSuspended && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gray-900 border border-red-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-red-900/30 rounded-full p-2 flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-6 h-6 text-red-400" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-white mb-2", children: "Payment Suspended" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-sm mb-4", children: "Admin access has been suspended due to payment issues. Please contact the developer to resolve this." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setPaymentSuspended(false), className: "text-gray-400 hover:text-white transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" }) })
    ] }) }) })
  ] });
}
export {
  AdminLogin as component
};
