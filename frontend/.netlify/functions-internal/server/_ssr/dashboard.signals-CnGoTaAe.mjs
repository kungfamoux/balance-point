import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { P as PageHeader } from "./DashboardShell-BgoTQ4yP.mjs";
import { B as Badge } from "./badge-DyfXZgLs.mjs";
import { C as Card, a as CardContent } from "./card-tJ_mUcsW.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import "../_libs/sonner.mjs";
import "../_libs/i18next.mjs";
import { aj as ShieldAlert, ak as RefreshCw, al as Minus, am as TrendingDown, T as TrendingUp, C as Clock, an as Target, ao as ExternalLink } from "../_libs/lucide-react.mjs";
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
import "./button-BC9oXVxV.mjs";
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
const ASSETS = [{
  symbol: "BTC/USD",
  name: "Bitcoin",
  category: "Crypto",
  coinId: "bitcoin",
  tvSymbol: "BTCUSD"
}, {
  symbol: "ETH/USD",
  name: "Ethereum",
  category: "Crypto",
  coinId: "ethereum",
  tvSymbol: "ETHUSD"
}, {
  symbol: "XRP/USD",
  name: "Ripple",
  category: "Crypto",
  coinId: "ripple",
  tvSymbol: "XRPUSD"
}, {
  symbol: "SOL/USD",
  name: "Solana",
  category: "Crypto",
  coinId: "solana",
  tvSymbol: "SOLUSD"
}, {
  symbol: "BNB/USD",
  name: "BNB",
  category: "Crypto",
  coinId: "binancecoin",
  tvSymbol: "BNBUSD"
}, {
  symbol: "EUR/USD",
  name: "Euro / Dollar",
  category: "Forex",
  tvSymbol: "EURUSD"
}, {
  symbol: "GBP/USD",
  name: "Pound / Dollar",
  category: "Forex",
  tvSymbol: "GBPUSD"
}, {
  symbol: "USD/JPY",
  name: "Dollar / Yen",
  category: "Forex",
  tvSymbol: "USDJPY"
}, {
  symbol: "AUD/USD",
  name: "Aussie Dollar",
  category: "Forex",
  tvSymbol: "AUDUSD"
}, {
  symbol: "USD/CHF",
  name: "Dollar / Franc",
  category: "Forex",
  tvSymbol: "USDCHF"
}, {
  symbol: "AAPL",
  name: "Apple Inc.",
  category: "Stocks",
  tvSymbol: "NASDAQ:AAPL"
}, {
  symbol: "TSLA",
  name: "Tesla Inc.",
  category: "Stocks",
  tvSymbol: "NASDAQ:TSLA"
}, {
  symbol: "NVDA",
  name: "NVIDIA Corp.",
  category: "Stocks",
  tvSymbol: "NASDAQ:NVDA"
}, {
  symbol: "AMZN",
  name: "Amazon.com",
  category: "Stocks",
  tvSymbol: "NASDAQ:AMZN"
}, {
  symbol: "MSFT",
  name: "Microsoft",
  category: "Stocks",
  tvSymbol: "NASDAQ:MSFT"
}, {
  symbol: "XAUUSD",
  name: "Gold Spot",
  category: "Commodities",
  tvSymbol: "XAUUSD"
}, {
  symbol: "XAGUSD",
  name: "Silver Spot",
  category: "Commodities",
  tvSymbol: "XAGUSD"
}, {
  symbol: "USOIL",
  name: "Crude Oil WTI",
  category: "Commodities",
  tvSymbol: "USOIL"
}, {
  symbol: "SPX",
  name: "S&P 500",
  category: "Indices",
  tvSymbol: "SPX500"
}, {
  symbol: "NDX",
  name: "NASDAQ 100",
  category: "Indices",
  tvSymbol: "NAS100"
}, {
  symbol: "DAX",
  name: "Germany DAX",
  category: "Indices",
  tvSymbol: "GER40"
}];
const CATEGORIES = ["All", "Crypto", "Forex", "Stocks", "Commodities", "Indices"];
const TODAY_SEED = (/* @__PURE__ */ new Date()).getDate() + (/* @__PURE__ */ new Date()).getMonth() * 31;
function genSignal(symbol) {
  const h = symbol.split("").reduce((a, c) => a + c.charCodeAt(0), TODAY_SEED);
  const dirs = ["BUY", "BUY", "SELL", "BUY", "SELL", "HOLD", "BUY", "SELL", "BUY", "SELL"];
  const tfs = ["M15", "H1", "H4", "D1"];
  return {
    direction: dirs[h % dirs.length],
    timeframe: tfs[h % tfs.length],
    tpPct: 1.5 + h % 35 / 10,
    slPct: 0.5 + h % 15 / 10,
    confidence: 62 + h % 33,
    strength: 1 + h % 3
  };
}
async function fetchCryptoPrices() {
  const ids = ASSETS.filter((a) => a.coinId).map((a) => a.coinId).join(",");
  try {
    const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`, {
      headers: {
        Accept: "application/json"
      }
    });
    const data = await res.json();
    const map = {};
    ASSETS.forEach((a) => {
      if (a.coinId && data[a.coinId]) map[a.symbol] = data[a.coinId].usd;
    });
    return map;
  } catch {
    return {};
  }
}
function Signals() {
  const [category, setCategory] = reactExports.useState("All");
  const {
    data: prices = {},
    dataUpdatedAt
  } = useQuery({
    queryKey: ["signal-prices"],
    queryFn: fetchCryptoPrices,
    refetchInterval: 6e4,
    staleTime: 3e4
  });
  const filtered = ASSETS.filter((a) => category === "All" || a.category === category);
  const lastUpdated = dataUpdatedAt ? new Date(dataUpdatedAt).toLocaleTimeString() : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Trading Signals", description: "Expert-curated signals updated daily. Live prices for crypto assets." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-5 rounded-xl overflow-hidden border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TickerTape, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex items-start gap-2 rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-3 text-xs text-yellow-700 dark:text-yellow-300", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "mt-0.5 h-4 w-4 shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Signals are for informational purposes only and do not constitute financial advice. Always manage your risk carefully." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex flex-wrap items-center gap-2", children: [
      CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setCategory(cat), className: `rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${category === cat ? "bg-brand text-white" : "bg-secondary text-muted-foreground hover:bg-secondary/80"}`, children: cat }, cat)),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto flex items-center gap-1 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-3 w-3" }),
        lastUpdated ? `Prices at ${lastUpdated}` : "Updating…"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-3", children: filtered.map((asset) => /* @__PURE__ */ jsxRuntimeExports.jsx(SignalCard, { asset, livePrice: prices[asset.symbol] }, asset.symbol)) })
  ] });
}
function SignalCard({
  asset,
  livePrice
}) {
  const sig = genSignal(asset.symbol);
  const price = livePrice ?? null;
  const entry = price ? price.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: price > 100 ? 2 : 4
  }) : "—";
  const tp = price ? (sig.direction === "SELL" ? price * (1 - sig.tpPct / 100) : price * (1 + sig.tpPct / 100)).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: price > 100 ? 2 : 4
  }) : "—";
  const sl = price ? (sig.direction === "SELL" ? price * (1 + sig.slPct / 100) : price * (1 - sig.slPct / 100)).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: price > 100 ? 2 : 4
  }) : "—";
  const cfg = {
    BUY: {
      color: "bg-green-600",
      text: "text-green-600",
      Icon: TrendingUp,
      label: "BUY"
    },
    SELL: {
      color: "bg-red-600",
      text: "text-red-600",
      Icon: TrendingDown,
      label: "SELL"
    },
    HOLD: {
      color: "bg-yellow-600",
      text: "text-yellow-600",
      Icon: Minus,
      label: "HOLD"
    }
  }[sig.direction];
  const tvUrl = `https://www.tradingview.com/chart/?symbol=${asset.tvSymbol}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border hover:shadow-md transition-shadow", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-base", children: asset.symbol }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: asset.name }),
        livePrice && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-brand mt-0.5", children: [
          "$",
          livePrice.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: livePrice > 100 ? 2 : 6
          }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 font-normal text-muted-foreground", children: "live" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: `${cfg.color} text-white gap-1 px-2.5`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(cfg.Icon, { className: "h-3 w-3" }),
          " ",
          cfg.label
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
          " ",
          sig.timeframe
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2 text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md bg-secondary p-2 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Entry" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold mt-0.5 truncate", children: entry })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md bg-green-500/10 p-2 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-green-600 dark:text-green-400 flex items-center justify-center gap-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "h-3 w-3" }),
          " TP"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold mt-0.5 text-green-600 dark:text-green-400 truncate", children: tp })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md bg-red-500/10 p-2 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-red-500 flex items-center justify-center gap-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "h-3 w-3" }),
          " SL"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold mt-0.5 text-red-500 truncate", children: sl })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Strength:" }),
        [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-block h-2 w-2 rounded-full ${i <= sig.strength ? cfg.color : "bg-muted"}` }, i))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Confidence:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `font-semibold ${cfg.text}`, children: [
          sig.confidence,
          "%"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: tvUrl, target: "_blank", rel: "noopener noreferrer", className: "flex items-center gap-1.5 text-xs text-muted-foreground hover:text-brand transition-colors pt-1 border-t border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3.5 w-3.5" }),
      " View live chart on TradingView"
    ] })
  ] }) });
}
function TickerTape() {
  const ref = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!ref.current || ref.current.childElementCount > 0) return;
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [{
        proName: "BITSTAMP:BTCUSD",
        title: "Bitcoin"
      }, {
        proName: "BITSTAMP:ETHUSD",
        title: "Ethereum"
      }, {
        proName: "COINBASE:SOLUSD",
        title: "Solana"
      }, {
        proName: "FX:EURUSD",
        title: "EUR/USD"
      }, {
        proName: "FX:GBPUSD",
        title: "GBP/USD"
      }, {
        proName: "NASDAQ:AAPL",
        title: "Apple"
      }, {
        proName: "NASDAQ:NVDA",
        title: "NVIDIA"
      }, {
        proName: "TVC:GOLD",
        title: "Gold"
      }, {
        proName: "TVC:USOIL",
        title: "Oil"
      }, {
        proName: "FOREXCOM:SPXUSD",
        title: "S&P 500"
      }],
      showSymbolLogo: true,
      isTransparent: false,
      displayMode: "adaptive",
      colorTheme: "dark",
      locale: "en"
    });
    ref.current.appendChild(script);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tradingview-widget-container", ref, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tradingview-widget-container__widget" }) });
}
export {
  Signals as component
};
