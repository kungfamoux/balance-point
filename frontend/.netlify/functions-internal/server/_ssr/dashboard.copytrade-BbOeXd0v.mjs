import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { P as PageHeader } from "./DashboardShell-BgoTQ4yP.mjs";
import { C as Card, a as CardContent } from "./card-tJ_mUcsW.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { A as Avatar, a as AvatarFallback } from "./avatar-BJDbbUeP.mjs";
import { a as useQueryClient, u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { a as api } from "./api-DONQIbPy.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/i18next.mjs";
import { A as Award } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-avatar.mjs";
import "../_libs/@radix-ui/react-use-is-hydrated+[...].mjs";
const traders = [{
  handle: "@vulturetrades",
  name: "Vulture trades 🦅",
  roi: null,
  followers: 186900,
  risk: "Medium",
  strategy: "Options trader, here to share my knowledge and show the ups and the downs of a full time trader. NO PAID SERVICES EVER! Nothing posted here is financial advice."
}, {
  handle: "@StockOptions888",
  name: "SniperAlert",
  roi: "+$6,302,393.49",
  followers: 121300,
  risk: "High",
  strategy: "Multi-millionaire day trader sharing the ins & outs of trading along the way to long term success. NO PAID SERVICE! Nothing Posted on here is financial advice. Tracking period: 03/08/2018 - 12/02/2024."
}, {
  handle: "@alex_volatility",
  name: "Alex Reyes",
  roi: "+182%",
  risk: "Medium",
  strategy: "FX swing"
}, {
  handle: "@crypto_mira",
  name: "Mira Kapoor",
  roi: "+241%",
  risk: "High",
  strategy: "Crypto trend"
}, {
  handle: "@steady_lin",
  name: "Linus Park",
  roi: "+96%",
  risk: "Low",
  strategy: "Index DCA"
}, {
  handle: "@gold_hunter",
  name: "Diana Vega",
  roi: "+134%",
  risk: "Medium",
  strategy: "Commodities"
}, {
  handle: "@bluechip_tom",
  name: "Tomás Oliveira",
  roi: "+78%",
  risk: "Low",
  strategy: "US stocks"
}, {
  handle: "@scalper_yui",
  name: "Yui Hayashi",
  roi: "+312%",
  risk: "High",
  strategy: "FX scalping"
}];
function CopyTrade() {
  const qc = useQueryClient();
  const {
    data: follows
  } = useQuery({
    queryKey: ["follows"],
    queryFn: () => api.getCopyFollows()
  });
  const followed = new Map((follows ?? []).map((f) => [f.traderHandle ?? f.trader_handle, f.id]));
  async function toggle(handle) {
    try {
      if (followed.has(handle)) {
        await api.unfollowTrader(followed.get(handle));
        toast.success("Unfollowed");
      } else {
        await api.followTrader(handle);
        toast.success("Following");
      }
      qc.invalidateQueries({
        queryKey: ["follows"]
      });
    } catch (err) {
      toast.error(err?.message ?? "Failed");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Copytrade", description: "Follow top traders and mirror their strategies." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: traders.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "h-12 w-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-brand text-white", children: t.name.split(" ").map((n) => n[0]).join("") }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: t.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-4 w-4 text-warning" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: t.handle })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid grid-cols-3 gap-2 text-center text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md bg-secondary p-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "ROI" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-success", children: t.roi ?? "-" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md bg-secondary p-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Risk" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold", children: t.risk })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md bg-secondary p-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: t.followers ? "Followers" : "Style" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate font-bold", children: t.followers ? t.followers.toLocaleString() : t.strategy })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 line-clamp-2 text-sm text-muted-foreground", children: t.strategy }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "mt-4 w-full", variant: followed.has(t.handle) ? "outline" : "default", onClick: () => toggle(t.handle), children: followed.has(t.handle) ? "Following" : "Follow" })
    ] }) }, t.handle)) })
  ] });
}
export {
  CopyTrade as component
};
