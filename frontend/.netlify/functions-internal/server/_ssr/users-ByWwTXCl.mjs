import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { f as useMatchRoute, O as Outlet, L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as useQueryClient, u as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { a as adminApi } from "./router-Brv9oJny.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { A as AdminPageHeader } from "./AdminPageHeader-DwPoOF5u.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/i18next.mjs";
import { y as Search, g as ChevronRight, z as Trash2 } from "../_libs/lucide-react.mjs";
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
import "./utils-H80jjgLf.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
function AdminUsers() {
  const matchRoute = useMatchRoute();
  const isChildRouteActive = matchRoute({
    to: "/admin/users/$id"
  });
  const qc = useQueryClient();
  const {
    data: users = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ["admin", "users"],
    queryFn: adminApi.getUsers
  });
  const [search, setSearch] = reactExports.useState("");
  const deleteMut = useMutation({
    mutationFn: (id) => adminApi.deleteUser(id),
    onSuccess: () => {
      toast.success("User deleted successfully");
      qc.invalidateQueries({
        queryKey: ["admin", "users"]
      });
    },
    onError: (e) => toast.error(e.message || "Failed to delete user")
  });
  const filtered = users.filter((u) => (u.fullName ?? "").toLowerCase().includes(search.toLowerCase()) || (u.email ?? "").toLowerCase().includes(search.toLowerCase()) || (u.id ?? "").includes(search));
  const kycColor = {
    verified: "bg-green-600",
    unverified: "bg-yellow-600",
    rejected: "bg-red-600"
  };
  if (isChildRouteActive) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {});
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AdminPageHeader, { title: "Users", description: `${users.length} registered users`, actions: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-2.5 w-4 h-4 text-gray-500" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: search, onChange: (e) => setSearch(e.target.value), placeholder: "Search by name or ID…", className: "pl-9 bg-gray-800 border-gray-700 text-white w-full sm:w-64" })
    ] }) }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" }) }) : error ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-red-400", children: [
      "Failed to load users: ",
      error.message
    ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:hidden space-y-3", children: [
        filtered.map((u) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-900 border border-gray-800 rounded-xl p-4 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-medium", children: u.fullName ?? "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-xs font-mono mt-0.5", children: u.email ?? "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-600 text-xs font-mono mt-0.5", children: [
                u.id.slice(0, 8),
                "…"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-block px-2 py-0.5 rounded-full text-xs text-white ${kycColor[u.kycStatus] ?? "bg-gray-600"}`, children: u.kycStatus })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-400", children: u.country ?? "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: new Date(u.createdAt).toLocaleDateString() })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/users/$id", params: {
              id: u.id
            }, className: "flex-1 items-center justify-center gap-1 text-blue-400 hover:text-blue-300 text-sm py-2 border border-blue-600/30 rounded-lg", children: [
              "View Details ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", className: "bg-red-700 hover:bg-red-600 h-9 px-3", onClick: () => {
              if (confirm(`Delete user ${u.fullName || u.id}? This action cannot be undone.`)) deleteMut.mutate(u.id);
            }, disabled: deleteMut.isPending, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" }) })
          ] })
        ] }, u.id)),
        filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-12 text-gray-500", children: "No users found" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden lg:block bg-gray-900 border border-gray-800 rounded-xl overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-gray-800 text-gray-400", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3", children: "Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3", children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3", children: "Country" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3", children: "KYC" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3", children: "Joined" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
          filtered.map((u) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-white font-medium", children: u.fullName ?? "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-gray-400", children: u.email ?? "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-gray-400", children: u.country ?? "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-block px-2 py-0.5 rounded-full text-xs text-white ${kycColor[u.kycStatus] ?? "bg-gray-600"}`, children: u.kycStatus }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-gray-400", children: new Date(u.createdAt).toLocaleDateString() }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/users/$id", params: {
                id: u.id
              }, className: "flex items-center gap-1 text-blue-400 hover:text-blue-300 text-xs", children: [
                "View ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", className: "bg-red-700 hover:bg-red-600 h-7 px-2", onClick: () => {
                if (confirm(`Delete user ${u.fullName || u.id}? This action cannot be undone.`)) deleteMut.mutate(u.id);
              }, disabled: deleteMut.isPending, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3 h-3" }) })
            ] }) })
          ] }, u.id)),
          filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 6, className: "text-center py-12 text-gray-500", children: "No users found" }) })
        ] })
      ] }) })
    ] })
  ] });
}
export {
  AdminUsers as component
};
