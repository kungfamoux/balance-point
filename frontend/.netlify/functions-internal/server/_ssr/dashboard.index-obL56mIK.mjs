import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { P as PageHeader } from "./DashboardShell-BgoTQ4yP.mjs";
import { C as Card, a as CardContent } from "./card-tJ_mUcsW.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription } from "./dialog-hSko8zyN.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { a as api } from "./api-DONQIbPy.mjs";
import { a as TradingViewWidget } from "./TradingViewWidget-HoBTQETY.mjs";
import "../_libs/sonner.mjs";
import "../_libs/i18next.mjs";
import { ac as DollarSign, T as TrendingUp, ad as Package, ae as Signal } from "../_libs/lucide-react.mjs";
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
function Overview() {
  const navigate = useNavigate();
  const [signalDialogOpen, setSignalDialogOpen] = reactExports.useState(false);
  const {
    data
  } = useQuery({
    queryKey: ["dashboard-overview"],
    queryFn: async () => {
      const [wallet, tx, investments] = await Promise.all([api.getWallet(), api.getTransactions(5), api.getInvestments()]);
      const activeInv = (investments ?? []).find((i) => i.status === "active");
      return {
        wallet,
        tx: tx ?? [],
        investment: activeInv ?? null
      };
    }
  });
  const w = data?.wallet;
  const signalBoostOptions = [{
    percent: 10,
    price: 1e3
  }, {
    percent: 25,
    price: 2500
  }, {
    percent: 50,
    price: 5e3
  }, {
    percent: 75,
    price: 7500
  }, {
    percent: 100,
    price: 1e4
  }];
  const handleSignalBoost = (price) => {
    setSignalDialogOpen(false);
    navigate({
      to: "/dashboard/deposit",
      search: {
        amount: price,
        plan: void 0
      }
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Dashboard", description: "", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard/deposit", search: {
      amount: void 0,
      plan: void 0
    }, children: "Deposit" }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: DollarSign, label: "Balance", value: `$${num(w?.balance)}`, accent: "text-blue-500", iconColor: "bg-blue-500" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: TrendingUp, label: "Profits", value: `$${num(w?.total_profit)}`, accent: "text-green-500", iconColor: "bg-green-500" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: Package, label: "Deposits", value: `$${num(w?.total_deposits ?? 0)}`, accent: "text-orange-500", iconColor: "bg-orange-500" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: Signal, label: "Signal Strength", value: `${w?.signal_strength ?? 0}%`, accent: "text-teal-500", iconColor: "bg-teal-500", onClick: () => setSignalDialogOpen(true), clickable: true })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SignalBoostDialog, { open: signalDialogOpen, onOpenChange: setSignalDialogOpen, options: signalBoostOptions, onSelect: handleSignalBoost }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-lg dashboard-chart-container", style: {
      minHeight: "800px"
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(TradingViewWidget, { variant: "advanced-chart", height: 800, config: {
      symbol: "BINANCE:BTCUSD",
      interval: "D",
      timezone: "Etc/UTC",
      theme: "light",
      style: "1",
      locale: "en",
      toolbar_bg: "#f1f3f6",
      enable_publishing: false,
      hide_side_toolbar: false,
      allow_symbol_change: true,
      container_id: "tradingview_chart"
    } }) }) }) }) })
  ] });
}
function Stat({
  icon: Icon,
  label,
  value,
  accent,
  iconColor,
  clickable,
  onClick
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: `border-border ${clickable ? "cursor-pointer hover:shadow-lg transition-shadow" : ""}`, onClick, children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex h-10 w-10 items-center justify-center rounded-full ${iconColor} text-white`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wide text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `mt-1 font-display text-2xl font-bold ${accent ?? ""}`, children: value })
    ] })
  ] }) }) });
}
function num(v) {
  return Number(v ?? 0).toLocaleString(void 0, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}
function SignalBoostDialog({
  open,
  onOpenChange,
  options,
  onSelect
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Boost Your Signal Strength" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Select a signal boost package to improve your trading signals" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 mt-4", children: options.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => onSelect(option.price), className: "flex items-center justify-between rounded-lg border border-border bg-card p-4 hover:bg-secondary/50 transition-colors", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-teal-500 text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Signal, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold", children: [
            option.percent,
            "% Signal Boost"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Enhanced trading accuracy" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-xl font-bold text-teal-500", children: [
          "$",
          option.price
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "one-time" })
      ] })
    ] }, option.percent)) })
  ] }) });
}
export {
  Overview as component
};
