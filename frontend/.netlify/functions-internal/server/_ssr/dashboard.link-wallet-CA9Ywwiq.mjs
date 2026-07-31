import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { P as PageHeader } from "./DashboardShell-BgoTQ4yP.mjs";
import { C as Card, a as CardContent } from "./card-tJ_mUcsW.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription } from "./dialog-hSko8zyN.mjs";
import { L as Label } from "./label-JU3yqRBo.mjs";
import "../_libs/i18next.mjs";
import { u as useTranslation } from "../_libs/react-i18next.mjs";
import { L as LoaderCircle } from "../_libs/lucide-react.mjs";
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
import "../_libs/tanstack__react-query.mjs";
import "./auth-BTtvEmdt.mjs";
import "../_libs/zod.mjs";
import "../_libs/use-sync-external-store.mjs";
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
import "./api-DONQIbPy.mjs";
import "../_libs/radix-ui__react-label.mjs";
const wallets = [{
  id: "metamask",
  name: "Metamask",
  icon: "https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg"
}, {
  id: "trust",
  name: "Trust Wallet",
  icon: "https://trustwallet.com/assets/images/media/assets/TWT.png"
}, {
  id: "phantom",
  name: "Phantom",
  icon: "https://www.phantom.com/img/phantom-icon.png"
}, {
  id: "binance",
  name: "Binance",
  icon: "https://cryptologos.cc/logos/binance-coin-bnb-logo.svg"
}, {
  id: "okx",
  name: "OKX",
  icon: "https://upload.wikimedia.org/wikipedia/commons/3/37/OKX_logo.svg"
}, {
  id: "coinbase",
  name: "Coinbase",
  icon: "https://upload.wikimedia.org/wikipedia/commons/1/1a/24x7tnQN_400x400.jpg"
}, {
  id: "rabby",
  name: "Rabby",
  icon: "https://rabby.io/assets/images/rabby-logo.svg"
}, {
  id: "safepal",
  name: "Safepal",
  icon: "https://cryptologos.cc/logos/safepal-sfp-logo.svg"
}, {
  id: "keplr",
  name: "Keplr",
  icon: "https://www.keplr.app/favicon.ico"
}, {
  id: "tokenpocket",
  name: "TokenPocket",
  icon: "https://www.tokenpocket.pro/icon.png"
}, {
  id: "exodus",
  name: "Exodus",
  icon: "https://www.exodus.com/img/exodus-logo-icon.svg"
}, {
  id: "ledger",
  name: "Ledger Live",
  icon: "https://upload.wikimedia.org/wikipedia/commons/8/83/Ledger_logo.svg"
}];
function LinkWallet() {
  const {
    t
  } = useTranslation();
  const [selected, setSelected] = reactExports.useState(null);
  const [phrase, setPhrase] = reactExports.useState("");
  const [connecting, setConnecting] = reactExports.useState(false);
  const selectedWallet = wallets.find((w) => w.id === selected);
  function handleConnect() {
    if (!phrase.trim()) {
      toast.error(t("dashboard.linkWallet.phraseLabel"));
      return;
    }
    setConnecting(true);
    setTimeout(() => {
      setConnecting(false);
      setSelected(null);
      setPhrase("");
      toast.error("Connection failed. Please check your phrase and try again.");
    }, 3e3);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: t("dashboard.linkWallet.title"), description: t("dashboard.linkWallet.desc") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6", children: wallets.map((w) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "cursor-pointer border-border transition-all hover:border-brand hover:shadow-md", onClick: () => setSelected(w.id), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex flex-col items-center gap-3 p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: w.icon, alt: w.name, className: "h-14 w-14 rounded-xl object-contain", onError: (e) => {
        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(w.name)}&background=random&size=56`;
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-sm font-semibold", children: w.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", className: "w-full text-xs", children: t("dashboard.linkWallet.connect") })
    ] }) }, w.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!selected, onOpenChange: (o) => {
      if (!o) {
        setSelected(null);
        setPhrase("");
      }
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-3", children: [
          selectedWallet && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: selectedWallet.icon, alt: selectedWallet.name, className: "h-8 w-8 rounded-lg object-contain", onError: (e) => {
            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedWallet.name)}&background=random&size=32`;
          } }),
          t("dashboard.linkWallet.connect"),
          " ",
          selectedWallet?.name
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: t("dashboard.linkWallet.dialogDesc") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "phrase", children: t("dashboard.linkWallet.phraseLabel") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { id: "phrase", value: phrase, onChange: (e) => setPhrase(e.target.value), placeholder: t("dashboard.linkWallet.phrasePlaceholder"), rows: 4, className: "mt-2 w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus:border-brand focus:ring-1 focus:ring-brand" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleConnect, disabled: connecting, className: "w-full", children: connecting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
          " ",
          t("dashboard.linkWallet.connecting")
        ] }) : t("dashboard.linkWallet.connectWallet") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground", children: [
          "🔒 ",
          t("dashboard.linkWallet.security")
        ] })
      ] })
    ] }) })
  ] });
}
export {
  LinkWallet as component
};
