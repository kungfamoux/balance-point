import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useQueryClient, u as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { a as adminApi } from "./router-Brv9oJny.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { L as Label } from "./label-JU3yqRBo.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { A as AdminPageHeader } from "./AdminPageHeader-DwPoOF5u.mjs";
import "../_libs/i18next.mjs";
import { D as Plus, X, R as Radio, z as Trash2, H as Pencil } from "../_libs/lucide-react.mjs";
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
  title: "",
  host: "",
  role: "",
  avatarLabel: "",
  topic: "",
  status: "upcoming",
  scheduledAt: "",
  duration: "60 min",
  embedUrl: "",
  tags: "",
  premium: false,
  sortOrder: "0"
};
function AdminSessions() {
  const qc = useQueryClient();
  const {
    data: sessions = [],
    isLoading
  } = useQuery({
    queryKey: ["admin", "sessions"],
    queryFn: adminApi.getSessions
  });
  const [form, setForm] = reactExports.useState(null);
  const [editId, setEditId] = reactExports.useState(null);
  const createMut = useMutation({
    mutationFn: (body) => adminApi.createSession(body),
    onSuccess: () => {
      toast.success("Session created");
      qc.invalidateQueries({
        queryKey: ["admin", "sessions"]
      });
      setForm(null);
    },
    onError: (e) => toast.error(e.message)
  });
  const updateMut = useMutation({
    mutationFn: ({
      id,
      body
    }) => adminApi.updateSession(id, body),
    onSuccess: () => {
      toast.success("Session updated");
      qc.invalidateQueries({
        queryKey: ["admin", "sessions"]
      });
      setForm(null);
      setEditId(null);
    },
    onError: (e) => toast.error(e.message)
  });
  const deleteMut = useMutation({
    mutationFn: (id) => adminApi.deleteSession(id),
    onSuccess: () => {
      toast.success("Session deleted");
      qc.invalidateQueries({
        queryKey: ["admin", "sessions"]
      });
    },
    onError: (e) => toast.error(e.message)
  });
  function openEdit(s) {
    setEditId(s.id);
    setForm({
      title: s.title,
      host: s.host,
      role: s.role,
      avatarLabel: s.avatarLabel,
      topic: s.topic,
      status: s.status,
      scheduledAt: new Date(s.scheduledAt).toISOString().slice(0, 16),
      duration: s.duration,
      embedUrl: s.embedUrl ?? "",
      tags: (s.tags ?? []).join(", "),
      premium: s.premium,
      sortOrder: String(s.sortOrder)
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!form) return;
    const body = {
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      sortOrder: Number(form.sortOrder),
      premium: Boolean(form.premium)
    };
    if (editId) updateMut.mutate({
      id: editId,
      body
    });
    else createMut.mutate(body);
  }
  const statusColor = {
    live: "bg-red-600",
    upcoming: "bg-blue-600",
    completed: "bg-gray-500"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AdminPageHeader, { title: "Live Sessions", description: `${sessions.length} sessions`, actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => {
      setEditId(null);
      setForm(EMPTY);
    }, className: "bg-blue-600 hover:bg-blue-700 gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
      " New Session"
    ] }) }),
    form && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-900 border border-gray-700 rounded-xl p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-white font-semibold", children: editId ? "Edit Session" : "Create Session" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
          setForm(null);
          setEditId(null);
        }, className: "text-gray-400 hover:text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-1 sm:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-gray-300 text-sm", children: "Title" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.title, onChange: (e) => setForm((f) => f ? {
            ...f,
            title: e.target.value
          } : f), className: "mt-1 bg-gray-800 border-gray-700 text-white", required: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-gray-300 text-sm", children: "Host Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.host, onChange: (e) => setForm((f) => f ? {
            ...f,
            host: e.target.value
          } : f), className: "mt-1 bg-gray-800 border-gray-700 text-white", required: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-gray-300 text-sm", children: "Host Role" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.role, onChange: (e) => setForm((f) => f ? {
            ...f,
            role: e.target.value
          } : f), className: "mt-1 bg-gray-800 border-gray-700 text-white", placeholder: "e.g. Senior Analyst" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-gray-300 text-sm", children: "Avatar Label (2 letters)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.avatarLabel, onChange: (e) => setForm((f) => f ? {
            ...f,
            avatarLabel: e.target.value.toUpperCase().slice(0, 2)
          } : f), className: "mt-1 bg-gray-800 border-gray-700 text-white", maxLength: 2, placeholder: "JW" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-gray-300 text-sm", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: form.status, onChange: (e) => setForm((f) => f ? {
            ...f,
            status: e.target.value
          } : f), className: "mt-1 w-full bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "upcoming", children: "Upcoming" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "live", children: "Live" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "completed", children: "Completed" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-gray-300 text-sm", children: "Scheduled At" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "datetime-local", value: form.scheduledAt, onChange: (e) => setForm((f) => f ? {
            ...f,
            scheduledAt: e.target.value
          } : f), className: "mt-1 bg-gray-800 border-gray-700 text-white", required: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-gray-300 text-sm", children: "Duration" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.duration, onChange: (e) => setForm((f) => f ? {
            ...f,
            duration: e.target.value
          } : f), className: "mt-1 bg-gray-800 border-gray-700 text-white", placeholder: "60 min" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-1 sm:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-gray-300 text-sm", children: "Topic / Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: form.topic, onChange: (e) => setForm((f) => f ? {
            ...f,
            topic: e.target.value
          } : f), className: "mt-1 w-full bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-2 text-sm min-h-[80px] resize-y" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-1 sm:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-gray-300 text-sm", children: [
            "Embed URL",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-xs text-gray-500 font-normal", children: "YouTube: https://www.youtube.com/embed/VIDEO_ID — for live use ?autoplay=1" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.embedUrl, onChange: (e) => setForm((f) => f ? {
            ...f,
            embedUrl: e.target.value
          } : f), className: "mt-1 bg-gray-800 border-gray-700 text-white", placeholder: "https://www.youtube.com/embed/..." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-gray-300 text-sm", children: "Tags (comma-separated)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.tags, onChange: (e) => setForm((f) => f ? {
            ...f,
            tags: e.target.value
          } : f), className: "mt-1 bg-gray-800 border-gray-700 text-white", placeholder: "BTC, Crypto, Analysis" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-gray-300 text-sm", children: "Sort Order" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: form.sortOrder, onChange: (e) => setForm((f) => f ? {
            ...f,
            sortOrder: e.target.value
          } : f), className: "mt-1 bg-gray-800 border-gray-700 text-white" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-1 sm:col-span-2 flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", id: "premium", checked: form.premium, onChange: (e) => setForm((f) => f ? {
            ...f,
            premium: e.target.checked
          } : f), className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "premium", className: "text-gray-300 text-sm cursor-pointer", children: "Premium session (lock icon shown)" })
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
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      sessions.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-900 border border-gray-800 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs text-white ${statusColor[s.status] ?? "bg-gray-600"}`, children: [
              s.status === "live" && /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "w-3 h-3" }),
              " ",
              s.status
            ] }),
            s.premium && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block px-2 py-0.5 rounded-full text-xs bg-yellow-600 text-white", children: "Premium" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-medium truncate", children: s.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-400 text-xs mt-0.5", children: [
            s.host,
            " · ",
            new Date(s.scheduledAt).toLocaleString(),
            " · ",
            s.duration
          ] }),
          s.tags?.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-xs mt-0.5", children: s.tags.join(", ") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 shrink-0 sm:flex-row flex-row-reverse", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", className: "bg-red-700 hover:bg-red-600 h-8", onClick: () => {
            if (confirm("Delete session?")) deleteMut.mutate(s.id);
          }, disabled: deleteMut.isPending, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", className: "border-gray-700 text-gray-300 h-8", onClick: () => openEdit(s), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-3.5 h-3.5" }) })
        ] })
      ] }, s.id)),
      sessions.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-gray-500 py-12", children: 'No sessions yet. Click "New Session" to add one.' })
    ] })
  ] });
}
export {
  AdminSessions as component
};
