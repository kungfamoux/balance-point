import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useQueryClient, u as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { a as adminApi } from "./router-Brv9oJny.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { L as Label } from "./label-JU3yqRBo.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { A as AdminPageHeader } from "./AdminPageHeader-DwPoOF5u.mjs";
import "../_libs/i18next.mjs";
import { D as Plus, X, z as Trash2, H as Pencil } from "../_libs/lucide-react.mjs";
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
  slug: "",
  name: "",
  tagline: "",
  minDeposit: "",
  maxDeposit: "",
  roiPercent: "",
  referralPercent: "5",
  durationDays: "",
  sortOrder: "0"
};
function AdminPlans() {
  const qc = useQueryClient();
  const {
    data: plans = [],
    isLoading
  } = useQuery({
    queryKey: ["admin", "plans"],
    queryFn: adminApi.getPlans
  });
  const [form, setForm] = reactExports.useState(null);
  const [editId, setEditId] = reactExports.useState(null);
  const createMut = useMutation({
    mutationFn: (body) => adminApi.createPlan(body),
    onSuccess: () => {
      toast.success("Plan created");
      qc.invalidateQueries({
        queryKey: ["admin", "plans"]
      });
      setForm(null);
    },
    onError: (e) => toast.error(e.message)
  });
  const updateMut = useMutation({
    mutationFn: ({
      id,
      body
    }) => adminApi.updatePlan(id, body),
    onSuccess: () => {
      toast.success("Plan updated");
      qc.invalidateQueries({
        queryKey: ["admin", "plans"]
      });
      setForm(null);
      setEditId(null);
    },
    onError: (e) => toast.error(e.message)
  });
  const deleteMut = useMutation({
    mutationFn: (id) => adminApi.deletePlan(id),
    onSuccess: () => {
      toast.success("Plan deleted");
      qc.invalidateQueries({
        queryKey: ["admin", "plans"]
      });
    },
    onError: (e) => toast.error(e.message)
  });
  function openEdit(plan) {
    setEditId(plan.id);
    setForm({
      slug: plan.slug,
      name: plan.name,
      tagline: plan.tagline ?? "",
      minDeposit: plan.minDeposit,
      maxDeposit: plan.maxDeposit,
      roiPercent: plan.roiPercent,
      referralPercent: plan.referralPercent,
      durationDays: plan.durationDays,
      sortOrder: plan.sortOrder
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!form) return;
    const body = {
      ...form,
      minDeposit: Number(form.minDeposit),
      maxDeposit: Number(form.maxDeposit),
      roiPercent: Number(form.roiPercent),
      referralPercent: Number(form.referralPercent),
      durationDays: Number(form.durationDays),
      sortOrder: Number(form.sortOrder)
    };
    if (editId) updateMut.mutate({
      id: editId,
      body
    });
    else createMut.mutate(body);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AdminPageHeader, { title: "Investment Plans", description: `${plans.length} plans`, actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => {
      setEditId(null);
      setForm(EMPTY);
    }, className: "bg-blue-600 hover:bg-blue-700 gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
      " New Plan"
    ] }) }),
    form && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-900 border border-gray-700 rounded-xl p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-white font-semibold", children: editId ? "Edit Plan" : "Create Plan" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
          setForm(null);
          setEditId(null);
        }, className: "text-gray-400 hover:text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
        [["slug", "Slug", "text"], ["name", "Name", "text"], ["tagline", "Tagline", "text"], ["minDeposit", "Min Deposit ($)", "number"], ["maxDeposit", "Max Deposit ($)", "number"], ["roiPercent", "ROI %", "number"], ["referralPercent", "Referral %", "number"], ["durationDays", "Duration (days)", "number"], ["sortOrder", "Sort Order", "number"]].map(([key, label, type]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-gray-300 text-sm", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type, value: form[key], onChange: (e) => setForm((f) => f ? {
            ...f,
            [key]: e.target.value
          } : f), className: "mt-1 bg-gray-800 border-gray-700 text-white", step: type === "number" ? "0.01" : void 0 })
        ] }, key)),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-1 sm:col-span-2 flex gap-2 justify-end pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: () => {
            setForm(null);
            setEditId(null);
          }, className: "border-gray-700 text-gray-300", children: "Cancel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "bg-blue-600 hover:bg-blue-700", disabled: createMut.isPending || updateMut.isPending, children: editId ? "Update" : "Create" })
        ] })
      ] })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4", children: [
      plans.map((plan) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-900 border border-gray-800 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 grid grid-cols-2 gap-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-xs", children: "Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-medium", children: plan.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-xs", children: plan.tagline })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-xs", children: "Min Deposit" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white", children: [
              "$",
              Number(plan.minDeposit).toLocaleString()
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-xs", children: "Max Deposit" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white", children: [
              "$",
              Number(plan.maxDeposit).toLocaleString()
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-xs", children: "ROI" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white", children: [
              Number(plan.roiPercent).toFixed(1),
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-xs", children: "Duration" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white", children: [
              plan.durationDays,
              " days"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-xs", children: "Referral" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white", children: [
              Number(plan.referralPercent).toFixed(1),
              "%"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 shrink-0 sm:flex-row flex-row-reverse", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", className: "bg-red-700 hover:bg-red-600 h-8", onClick: () => {
            if (confirm("Delete this plan?")) deleteMut.mutate(plan.id);
          }, disabled: deleteMut.isPending, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", className: "border-gray-700 text-gray-300 h-8", onClick: () => openEdit(plan), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-3.5 h-3.5" }) })
        ] })
      ] }, plan.id)),
      plans.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-gray-500 py-12", children: "No plans yet" })
    ] })
  ] });
}
export {
  AdminPlans as component
};
