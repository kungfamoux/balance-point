import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { P as PageHeader } from "./DashboardShell-BgoTQ4yP.mjs";
import { C as Card, a as CardContent } from "./card-tJ_mUcsW.mjs";
import { B as Badge } from "./badge-DyfXZgLs.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { a as api } from "./api-DONQIbPy.mjs";
import "../_libs/sonner.mjs";
import "../_libs/i18next.mjs";
import { X, L as LoaderCircle, V as Video, R as Radio, N as Calendar, a3 as Lock, C as Clock, U as Users, ar as Play, as as BellOff, a9 as Bell } from "../_libs/lucide-react.mjs";
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
const TABS = [{
  label: "All",
  value: "all"
}, {
  label: "Live Now",
  value: "live"
}, {
  label: "Upcoming",
  value: "upcoming"
}, {
  label: "Completed",
  value: "completed"
}];
function LiveSessions() {
  const [tab, setTab] = reactExports.useState("all");
  const [reminded, setReminded] = reactExports.useState(/* @__PURE__ */ new Set());
  const [watching, setWatching] = reactExports.useState(null);
  const {
    data: sessions = [],
    isLoading
  } = useQuery({
    queryKey: ["live-sessions"],
    queryFn: () => api.getSessions(),
    refetchInterval: 6e4
  });
  const filtered = tab === "all" ? sessions : sessions.filter((s) => s.status === tab);
  const liveCount = sessions.filter((s) => s.status === "live").length;
  function toggleReminder(id) {
    setReminded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Live Sessions", description: "Join live trading sessions and webinars hosted by our expert analysts." }),
    watching && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-4xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setWatching(null), className: "absolute -top-10 right-0 text-white hover:text-gray-300 flex items-center gap-1 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
        " Close"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl overflow-hidden aspect-video w-full bg-black", children: /* @__PURE__ */ jsxRuntimeExports.jsx("iframe", { src: watching.embedUrl, className: "w-full h-full", allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture", allowFullScreen: true }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white text-sm mt-3 font-semibold", children: watching.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-400 text-xs mt-0.5", children: [
        watching.host,
        " · ",
        watching.role
      ] })
    ] }) }),
    liveCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex items-center gap-3 rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative flex h-3 w-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 animate-ping" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative inline-flex h-3 w-3 rounded-full bg-red-500" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-red-600 dark:text-red-400", children: [
        liveCount,
        " session",
        liveCount > 1 ? "s" : "",
        " happening live right now"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-5 flex flex-wrap gap-2", children: TABS.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setTab(t.value), className: `rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${tab === t.value ? "bg-brand text-white" : "bg-secondary text-muted-foreground hover:bg-secondary/80"}`, children: [
      t.label,
      t.value === "live" && liveCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white", children: liveCount })
    ] }, t.value)) }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-muted-foreground" }) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-20 text-center text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "h-10 w-10 mb-3 opacity-30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "No sessions yet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1", children: "Check back soon for upcoming live sessions." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 md:grid-cols-2 xl:grid-cols-3", children: filtered.map((session) => /* @__PURE__ */ jsxRuntimeExports.jsx(SessionCard, { session, reminded: reminded.has(session.id), onToggleReminder: () => toggleReminder(session.id), onWatch: () => setWatching(session) }, session.id)) })
  ] });
}
function SessionCard({
  session,
  reminded,
  onToggleReminder,
  onWatch
}) {
  const status = session.status;
  const scheduledAt = new Date(session.scheduledAt);
  const statusConfig = {
    live: {
      label: "LIVE",
      color: "bg-red-600",
      dot: true
    },
    upcoming: {
      label: "Upcoming",
      color: "bg-blue-600",
      dot: false
    },
    completed: {
      label: "Completed",
      color: "bg-gray-500",
      dot: false
    }
  }[status];
  const canWatch = (status === "live" || status === "completed") && session.embedUrl;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: `border-border hover:shadow-md transition-shadow flex flex-col ${status === "live" ? "ring-1 ring-red-500/30" : ""}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 flex flex-col gap-4 flex-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: `${statusConfig.color} text-white text-xs gap-1.5 shrink-0`, children: [
        statusConfig.dot && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative flex h-2 w-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inline-flex h-full w-full rounded-full bg-white opacity-75 animate-ping" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative inline-flex h-2 w-2 rounded-full bg-white" })
        ] }),
        status === "live" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "h-3 w-3" }) : status === "upcoming" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3 w-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "h-3 w-3" }),
        statusConfig.label
      ] }),
      session.premium && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-yellow-500 text-white text-xs gap-1 shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-3 w-3" }),
        " Premium"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-base leading-snug", children: session.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 line-clamp-2", children: session.topic })
    ] }),
    session.tags?.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: session.tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-secondary px-2.5 py-0.5 text-xs text-muted-foreground", children: tag }, tag)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-full bg-brand text-white text-xs font-bold shrink-0", children: session.avatarLabel }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: session.host }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: session.role })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5" }),
        scheduledAt.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric"
        })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5" }),
        scheduledAt.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit"
        }),
        " UTC"
      ] }),
      status === "live" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-red-500 font-medium", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3.5 w-3.5" }),
        " Live"
      ] }),
      status === "upcoming" && /* @__PURE__ */ jsxRuntimeExports.jsx(Countdown, { target: scheduledAt })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto pt-1", children: [
      status === "live" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "w-full gap-2 bg-red-600 hover:bg-red-700 text-white", onClick: canWatch ? onWatch : void 0, disabled: !canWatch, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-4 w-4" }),
        canWatch ? "Join Live Session" : "Starting Soon…"
      ] }),
      status === "upcoming" && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "w-full gap-2", onClick: onToggleReminder, children: reminded ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BellOff, { className: "h-4 w-4" }),
        " Remove Reminder"
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-4 w-4" }),
        " Set Reminder"
      ] }) }),
      status === "completed" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "w-full gap-2", onClick: canWatch ? onWatch : void 0, disabled: !canWatch, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "h-4 w-4" }),
        canWatch ? "Watch Recording" : "Recording Coming Soon"
      ] })
    ] })
  ] }) });
}
function Countdown({
  target
}) {
  const [diff, setDiff] = reactExports.useState(() => Math.max(0, target.getTime() - Date.now()));
  reactExports.useEffect(() => {
    const id = setInterval(() => setDiff(Math.max(0, target.getTime() - Date.now())), 1e3);
    return () => clearInterval(id);
  }, [target]);
  if (diff <= 0) return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500 font-medium", children: "Starting now" });
  const d = Math.floor(diff / 864e5);
  const h = Math.floor(diff % 864e5 / 36e5);
  const m = Math.floor(diff % 36e5 / 6e4);
  const s = Math.floor(diff % 6e4 / 1e3);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-brand font-medium", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5" }),
    d > 0 ? `${d}d ` : "",
    String(h).padStart(2, "0"),
    ":",
    String(m).padStart(2, "0"),
    ":",
    String(s).padStart(2, "0")
  ] });
}
export {
  LiveSessions as component
};
