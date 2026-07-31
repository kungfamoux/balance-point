import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { P as PageHeader } from "./DashboardShell-BgoTQ4yP.mjs";
import { C as Card, a as CardContent } from "./card-tJ_mUcsW.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { L as Label } from "./label-JU3yqRBo.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { B as Badge } from "./badge-DyfXZgLs.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CZRUt5a6.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { a as api } from "./api-DONQIbPy.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { e as Route$1 } from "./router-Brv9oJny.mjs";
import "../_libs/i18next.mjs";
import { u as useTranslation } from "../_libs/react-i18next.mjs";
import { au as BadgeCheck, ak as RefreshCw, T as TrendingUp, am as TrendingDown, a as Copy } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/tailwind-merge.mjs";
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
import "./auth-BTtvEmdt.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/zod.mjs";
import "../_libs/use-sync-external-store.mjs";
const gateways = [{
  id: "Bitcoin (BTC)",
  symbol: "BTC",
  coinId: "bitcoin",
  address: "bc1qwudxts5a5p6njxjkcujh0pmz7flqznxwddcusx",
  trustWalletLink: "https://link.trustwallet.com/send?address=bc1qwudxts5a5p6njxjkcujh0pmz7flqznxwddcusx&asset=c0",
  icon: "₿",
  color: "#F7931A"
}, {
  id: "Ethereum (ETH)",
  symbol: "ETH",
  coinId: "ethereum",
  address: "0x5E0075153409278ecFf5B1ED7a65F472855c84DE",
  trustWalletLink: "https://link.trustwallet.com/send?address=0x5E0075153409278ecFf5B1ED7a65F472855c84DE&asset=c60",
  icon: "Ξ",
  color: "#627EEA"
}, {
  id: "Solana (SOL)",
  symbol: "SOL",
  coinId: "solana",
  address: "8QdbtaSuFssh2B5fjZQZfNCJqcqDaejrhnYRjvPivKAz",
  trustWalletLink: "https://link.trustwallet.com/send?address=8QdbtaSuFssh2B5fjZQZfNCJqcqDaejrhnYRjvPivKAz&asset=c501",
  icon: "◎",
  color: "#9945FF"
}, {
  id: "USDT (ERC-20)",
  symbol: "USDT",
  coinId: "tether",
  address: "0x5E0075153409278ecFf5B1ED7a65F472855c84DE",
  trustWalletLink: "https://link.trustwallet.com/send?address=0x5E0075153409278ecFf5B1ED7a65F472855c84DE&asset=c60_t0xdAC17F958D2ee523a2206206994597C13D831ec7",
  icon: "₮",
  color: "#26A17B"
}, {
  id: "XRP",
  symbol: "XRP",
  coinId: "ripple",
  address: "r59V8nHMmmt6MAsj1L3mnmq4ELJdDkYQD",
  trustWalletLink: "https://link.trustwallet.com/send?address=r59V8nHMmmt6MAsj1L3mnmq4ELJdDkYQD&asset=c144",
  icon: "✕",
  color: "#346AA9"
}];
const COIN_IDS = gateways.map((g) => g.coinId).join(",");
async function fetchPrices() {
  const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${COIN_IDS}&vs_currencies=usd&include_24hr_change=true`);
  if (!res.ok) throw new Error("Failed to fetch prices");
  return res.json();
}
function Deposit() {
  const {
    t
  } = useTranslation();
  const {
    amount: prefillAmount,
    plan: prefillPlan
  } = Route$1.useSearch();
  const [gateway, setGateway] = reactExports.useState(gateways[0].id);
  const [amount, setAmount] = reactExports.useState(prefillAmount ? String(prefillAmount) : "");
  const [loading, setLoading] = reactExports.useState(false);
  const selected = gateways.find((g) => g.id === gateway);
  const {
    data: prices,
    isLoading: pricesLoading,
    refetch,
    dataUpdatedAt
  } = useQuery({
    queryKey: ["crypto-prices"],
    queryFn: fetchPrices,
    refetchInterval: 3e4,
    staleTime: 2e4
  });
  const usdAmount = Number(amount) || 0;
  const selectedPrice = prices?.[selected.coinId]?.usd ?? 0;
  prices?.[selected.coinId]?.usd_24h_change ?? 0;
  const cryptoEquivalent = selectedPrice > 0 ? usdAmount / selectedPrice : 0;
  async function submit(e) {
    e.preventDefault();
    const amt = Number(amount);
    if (!amt || amt <= 0) {
      toast.error("Enter a valid amount");
      return;
    }
    setLoading(true);
    try {
      await api.createDeposit({
        amount: amt,
        gateway: selected.id
      });
      toast.success(t("dashboard.deposit.success"));
      setAmount("");
    } catch (err) {
      toast.error(err?.message ?? t("common.error"));
    } finally {
      setLoading(false);
    }
  }
  const updatedTime = dataUpdatedAt ? new Date(dataUpdatedAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  }) : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: t("dashboard.deposit.title"), description: t("dashboard.deposit.desc") }),
    prefillPlan && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex items-center gap-3 rounded-xl border border-brand/30 bg-brand/5 px-5 py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "h-5 w-5 text-brand" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-brand", children: [
          prefillPlan,
          " Plan selected"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          "Minimum deposit of ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold", children: [
            "$",
            Number(prefillAmount ?? 0).toLocaleString()
          ] }),
          " has been pre-filled below."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "ml-auto bg-brand/10 text-brand", children: [
        "$",
        Number(prefillAmount ?? 0).toLocaleString()
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 overflow-hidden rounded-xl border border-border bg-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border px-4 py-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground", children: "Live Rates" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => refetch(), className: "flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: `h-3 w-3 ${pricesLoading ? "animate-spin" : ""}` }),
          updatedTime ? `Updated ${updatedTime}` : "Loading…"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 divide-border sm:grid-cols-5 sm:divide-x", children: gateways.map((g) => {
        const price = prices?.[g.coinId]?.usd;
        const change = prices?.[g.coinId]?.usd_24h_change ?? 0;
        const positive = change >= 0;
        const isSelected = g.id === gateway;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setGateway(g.id), className: `flex flex-col items-center gap-0.5 px-3 py-3 transition-colors hover:bg-secondary/50 ${isSelected ? "bg-brand/5 ring-inset ring-1 ring-brand/30" : ""}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold text-white", style: {
            backgroundColor: g.color
          }, children: g.icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1 text-xs font-semibold", children: g.symbol }),
          price ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-bold", children: [
              "$",
              price.toLocaleString(void 0, {
                maximumFractionDigits: price < 1 ? 4 : 2
              })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `flex items-center gap-0.5 text-[10px] font-medium ${positive ? "text-green-500" : "text-red-500"}`, children: [
              positive ? /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-2.5 w-2.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "h-2.5 w-2.5" }),
              positive ? "+" : "",
              change.toFixed(2),
              "%"
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "—" })
        ] }, g.id);
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border lg:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-5 p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: t("dashboard.deposit.method") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: gateway, onValueChange: setGateway, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: gateways.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: g.id, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white", style: {
                backgroundColor: g.color
              }, children: g.icon }),
              g.id,
              prices?.[g.coinId]?.usd && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto text-xs text-muted-foreground", children: [
                "$",
                prices[g.coinId].usd.toLocaleString(void 0, {
                  maximumFractionDigits: 2
                })
              ] })
            ] }) }, g.id)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "amt", children: t("dashboard.deposit.amount") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground", children: "$" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "amt", type: "number", min: "1", step: "0.01", value: amount, onChange: (e) => setAmount(e.target.value), className: "pl-7", placeholder: "0.00" })
          ] })
        ] }),
        usdAmount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-brand/20 bg-brand/5 p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground", children: "You will send" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-2xl font-bold", style: {
                color: selected.color
              }, children: [
                selected.symbol === "USDT" ? usdAmount.toLocaleString(void 0, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                }) : cryptoEquivalent.toLocaleString(void 0, {
                  minimumFractionDigits: 4,
                  maximumFractionDigits: 8
                }),
                " ",
                selected.symbol
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                "≈ $",
                usdAmount.toLocaleString(),
                " USD"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right", children: selectedPrice > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                "1 ",
                selected.symbol
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-foreground", children: [
                "= $",
                selectedPrice.toLocaleString(void 0, {
                  maximumFractionDigits: 2
                })
              ] })
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-secondary/50 p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase text-muted-foreground", children: t("dashboard.deposit.sendTo") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex flex-col gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "break-all text-sm", children: selected.address }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", size: "icon", onClick: () => {
                navigator.clipboard.writeText(selected.address);
                toast.success(t("common.copied"));
              }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-4 w-4" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", className: "w-full", onClick: () => {
              window.open(selected.trustWalletLink, "_blank");
            }, children: "Pay via Trust Wallet" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: submit, disabled: loading, className: "w-full", children: loading ? t("dashboard.deposit.submitting") : t("dashboard.deposit.submit") })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-bold", children: t("dashboard.deposit.howItWorks") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { className: "mt-3 space-y-3 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
              "1. ",
              t("dashboard.deposit.step1")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
              "2. ",
              t("dashboard.deposit.step2")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
              "3. ",
              t("dashboard.deposit.step3")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
              "4. ",
              t("dashboard.deposit.step4")
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-xs text-muted-foreground", children: t("dashboard.deposit.note") })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-bold mb-3", children: "All Rates (USD)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5", children: gateways.map((g) => {
            const price = prices?.[g.coinId]?.usd;
            const change = prices?.[g.coinId]?.usd_24h_change ?? 0;
            const positive = change >= 0;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-white", style: {
                  backgroundColor: g.color
                }, children: g.icon }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: g.symbol })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: price ? `$${price.toLocaleString(void 0, {
                  maximumFractionDigits: price < 1 ? 4 : 2
                })}` : "—" }),
                price && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: `text-[10px] ${positive ? "text-green-500" : "text-red-500"}`, children: [
                  positive ? "+" : "",
                  change.toFixed(2),
                  "% (24h)"
                ] })
              ] })
            ] }, g.id);
          }) })
        ] }) })
      ] })
    ] })
  ] });
}
export {
  Deposit as component
};
