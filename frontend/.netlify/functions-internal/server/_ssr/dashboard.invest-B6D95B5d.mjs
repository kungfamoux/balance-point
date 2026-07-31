import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { P as PageHeader } from "./DashboardShell-BgoTQ4yP.mjs";
import { C as Card, a as CardContent } from "./card-tJ_mUcsW.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { B as Badge } from "./badge-DyfXZgLs.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { a as api } from "./api-DONQIbPy.mjs";
import "../_libs/sonner.mjs";
import "../_libs/i18next.mjs";
import { at as CircleCheck, i as ArrowRight } from "../_libs/lucide-react.mjs";
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
const STATIC_PLANS = [{
  id: "regular",
  name: "Regular",
  price: 200,
  returns: 1e3,
  period: "2 Weeks",
  featured: false,
  features: ["200+ Pairs", "Leverage Up To 1:500", "Spreads From 1.2 Pips", "Returns $1,000"]
}, {
  id: "bronze",
  name: "Bronze",
  price: 1e3,
  returns: 1e4,
  period: "1 Month",
  featured: false,
  features: ["300+ Pairs", "Leverage Up To 1:500", "Spreads From 0.8 Pips", "Returns $10,000"]
}, {
  id: "silver",
  name: "Silver",
  price: 1e4,
  returns: 5e4,
  period: "2 Months",
  featured: false,
  features: ["400+ Pairs", "No Swap Fees", "Leverage Up To 1:500", "Returns $50,000"]
}, {
  id: "gold",
  name: "Gold",
  price: 5e4,
  returns: 15e4,
  period: "3 Months",
  featured: true,
  features: ["400+ Pairs", "No Swap Fees", "Leverage Up To 1:500", "Spreads From 0.3 Pips", "Returns $150,000"]
}, {
  id: "diamond",
  name: "Diamond",
  price: 15e4,
  returns: 1e6,
  period: "6 Months",
  featured: false,
  features: ["500+ Pairs", "No Swap Fees", "Priority Support", "Leverage Up To 1:500", "Returns $1,000,000"]
}];
function Invest() {
  const {
    data: backendPlans
  } = useQuery({
    queryKey: ["plans"],
    queryFn: () => api.getPlans()
  });
  const enrich = (staticPlan) => {
    const match = backendPlans?.find((p) => p.name?.toLowerCase() === staticPlan.name.toLowerCase());
    return {
      ...staticPlan,
      roi: match ? Number(match.roiPercent ?? match.roi_percent) : null,
      duration: match ? match.durationDays ?? match.duration_days : null,
      referral: match ? Number(match.referralPercent ?? match.referral_percent) : null,
      backendId: match?.id ?? null
    };
  };
  const plans = STATIC_PLANS.map(enrich);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Pricing", description: "Choose the plan that matches your trading goals and start growing your portfolio." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5", children: plans.map((plan) => /* @__PURE__ */ jsxRuntimeExports.jsx(PlanCard, { plan }, plan.id)) })
  ] });
}
function PlanCard({
  plan
}) {
  const navigate = useNavigate();
  function handleFundTrading() {
    navigate({
      to: "/dashboard/deposit",
      search: {
        amount: plan.price,
        plan: plan.name
      }
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: `relative overflow-hidden border transition-shadow hover:shadow-lg ${plan.featured ? "border-brand shadow-md" : "border-border"}`, children: [
    plan.featured && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-0 top-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "rounded-none rounded-bl-lg bg-brand px-3 py-1 text-xs text-white", children: "Popular" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-semibold", children: plan.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: plan.period }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("hr", { className: "my-4 border-border" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-muted-foreground align-top mt-1", children: "$" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-2xl font-bold", children: plan.price.toLocaleString() })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Minimum investment" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 rounded-lg bg-brand/10 px-3 py-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Returns" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-brand text-lg", children: [
          "$",
          plan.returns.toLocaleString()
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("hr", { className: "my-4 border-border" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2.5", children: plan.features.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2 text-sm text-foreground/80", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 shrink-0 text-brand" }),
        f
      ] }, f)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "mt-6 w-full gap-2", variant: plan.featured ? "default" : "default", onClick: handleFundTrading, children: [
        "Fund Trading ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
      ] })
    ] })
  ] });
}
export {
  Invest as component
};
