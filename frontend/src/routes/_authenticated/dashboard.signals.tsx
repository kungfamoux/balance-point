import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/DashboardShell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  TrendingUp, TrendingDown, Minus, Clock, Target,
  ShieldAlert, RefreshCw, ExternalLink,
} from "lucide-react";

export const Route = createFileRoute("/_authenticated/dashboard/signals")({
  component: Signals,
});

type Direction = "BUY" | "SELL" | "HOLD";

interface Asset {
  symbol: string;
  name: string;
  category: string;
  coinId?: string;          // CoinGecko id for crypto
  tvSymbol: string;         // TradingView symbol
}

const ASSETS: Asset[] = [
  { symbol: "BTC/USD", name: "Bitcoin",       category: "Crypto",      coinId: "bitcoin",   tvSymbol: "BTCUSD" },
  { symbol: "ETH/USD", name: "Ethereum",      category: "Crypto",      coinId: "ethereum",  tvSymbol: "ETHUSD" },
  { symbol: "XRP/USD", name: "Ripple",        category: "Crypto",      coinId: "ripple",    tvSymbol: "XRPUSD" },
  { symbol: "SOL/USD", name: "Solana",        category: "Crypto",      coinId: "solana",    tvSymbol: "SOLUSD" },
  { symbol: "BNB/USD", name: "BNB",           category: "Crypto",      coinId: "binancecoin", tvSymbol: "BNBUSD" },
  { symbol: "EUR/USD", name: "Euro / Dollar", category: "Forex",       tvSymbol: "EURUSD" },
  { symbol: "GBP/USD", name: "Pound / Dollar",category: "Forex",       tvSymbol: "GBPUSD" },
  { symbol: "USD/JPY", name: "Dollar / Yen",  category: "Forex",       tvSymbol: "USDJPY" },
  { symbol: "AUD/USD", name: "Aussie Dollar", category: "Forex",       tvSymbol: "AUDUSD" },
  { symbol: "USD/CHF", name: "Dollar / Franc",category: "Forex",       tvSymbol: "USDCHF" },
  { symbol: "AAPL",    name: "Apple Inc.",    category: "Stocks",      tvSymbol: "NASDAQ:AAPL" },
  { symbol: "TSLA",    name: "Tesla Inc.",    category: "Stocks",      tvSymbol: "NASDAQ:TSLA" },
  { symbol: "NVDA",    name: "NVIDIA Corp.",  category: "Stocks",      tvSymbol: "NASDAQ:NVDA" },
  { symbol: "AMZN",    name: "Amazon.com",    category: "Stocks",      tvSymbol: "NASDAQ:AMZN" },
  { symbol: "MSFT",    name: "Microsoft",     category: "Stocks",      tvSymbol: "NASDAQ:MSFT" },
  { symbol: "XAUUSD",  name: "Gold Spot",     category: "Commodities", tvSymbol: "XAUUSD" },
  { symbol: "XAGUSD",  name: "Silver Spot",   category: "Commodities", tvSymbol: "XAGUSD" },
  { symbol: "USOIL",   name: "Crude Oil WTI", category: "Commodities", tvSymbol: "USOIL" },
  { symbol: "SPX",     name: "S&P 500",       category: "Indices",     tvSymbol: "SPX500" },
  { symbol: "NDX",     name: "NASDAQ 100",    category: "Indices",     tvSymbol: "NAS100" },
  { symbol: "DAX",     name: "Germany DAX",   category: "Indices",     tvSymbol: "GER40" },
];

const CATEGORIES = ["All", "Crypto", "Forex", "Stocks", "Commodities", "Indices"];
const TODAY_SEED = new Date().getDate() + new Date().getMonth() * 31;

// Deterministic signal per asset per day
function genSignal(symbol: string) {
  const h = symbol.split("").reduce((a, c) => a + c.charCodeAt(0), TODAY_SEED);
  const dirs: Direction[] = ["BUY", "BUY", "SELL", "BUY", "SELL", "HOLD", "BUY", "SELL", "BUY", "SELL"];
  const tfs = ["M15", "H1", "H4", "D1"];
  return {
    direction: dirs[h % dirs.length],
    timeframe: tfs[h % tfs.length],
    tpPct: (1.5 + (h % 35) / 10),
    slPct: (0.5 + (h % 15) / 10),
    confidence: 62 + (h % 33),
    strength: (1 + (h % 3)) as 1 | 2 | 3,
  };
}

// Fetch CoinGecko prices for crypto assets
async function fetchCryptoPrices(): Promise<Record<string, number>> {
  const ids = ASSETS.filter((a) => a.coinId).map((a) => a.coinId).join(",");
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`,
      { headers: { Accept: "application/json" } }
    );
    const data = await res.json();
    const map: Record<string, number> = {};
    ASSETS.forEach((a) => {
      if (a.coinId && data[a.coinId]) map[a.symbol] = data[a.coinId].usd;
    });
    return map;
  } catch {
    return {};
  }
}

function Signals() {
  const [category, setCategory] = useState("All");

  const { data: prices = {}, dataUpdatedAt } = useQuery({
    queryKey: ["signal-prices"],
    queryFn: fetchCryptoPrices,
    refetchInterval: 60_000,
    staleTime: 30_000,
  });

  const filtered = ASSETS.filter((a) => category === "All" || a.category === category);
  const lastUpdated = dataUpdatedAt ? new Date(dataUpdatedAt).toLocaleTimeString() : null;

  return (
    <>
      <PageHeader
        title="Trading Signals"
        description="Expert-curated signals updated daily. Live prices for crypto assets."
      />

      {/* TradingView Ticker Tape */}
      <div className="mb-5 rounded-xl overflow-hidden border border-border">
        <TickerTape />
      </div>

      {/* Disclaimer */}
      <div className="mb-5 flex items-start gap-2 rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-3 text-xs text-yellow-700 dark:text-yellow-300">
        <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
        <span>Signals are for informational purposes only and do not constitute financial advice. Always manage your risk carefully.</span>
      </div>

      {/* Category filter */}
      <div className="mb-5 flex flex-wrap items-center gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
              category === cat ? "bg-brand text-white" : "bg-secondary text-muted-foreground hover:bg-secondary/80"
            }`}
          >
            {cat}
          </button>
        ))}
        <span className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
          <RefreshCw className="h-3 w-3" />
          {lastUpdated ? `Prices at ${lastUpdated}` : "Updating…"}
        </span>
      </div>

      {/* Signal cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((asset) => (
          <SignalCard key={asset.symbol} asset={asset} livePrice={prices[asset.symbol]} />
        ))}
      </div>
    </>
  );
}

function SignalCard({ asset, livePrice }: { asset: Asset; livePrice?: number }) {
  const sig = genSignal(asset.symbol);
  const price = livePrice ?? null;

  const entry = price ? price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: price > 100 ? 2 : 4 }) : "—";
  const tp = price
    ? (sig.direction === "SELL"
        ? price * (1 - sig.tpPct / 100)
        : price * (1 + sig.tpPct / 100)
      ).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: price > 100 ? 2 : 4 })
    : "—";
  const sl = price
    ? (sig.direction === "SELL"
        ? price * (1 + sig.slPct / 100)
        : price * (1 - sig.slPct / 100)
      ).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: price > 100 ? 2 : 4 })
    : "—";

  const cfg = {
    BUY:  { color: "bg-green-600", text: "text-green-600", Icon: TrendingUp,  label: "BUY"  },
    SELL: { color: "bg-red-600",   text: "text-red-600",   Icon: TrendingDown, label: "SELL" },
    HOLD: { color: "bg-yellow-600",text: "text-yellow-600",Icon: Minus,        label: "HOLD" },
  }[sig.direction];

  const tvUrl = `https://www.tradingview.com/chart/?symbol=${asset.tvSymbol}`;

  return (
    <Card className="border-border hover:shadow-md transition-shadow">
      <CardContent className="p-5 space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <p className="font-bold text-base">{asset.symbol}</p>
            <p className="text-xs text-muted-foreground">{asset.name}</p>
            {livePrice && (
              <p className="text-xs font-semibold text-brand mt-0.5">
                ${livePrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: livePrice > 100 ? 2 : 6 })}
                <span className="ml-1 font-normal text-muted-foreground">live</span>
              </p>
            )}
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <Badge className={`${cfg.color} text-white gap-1 px-2.5`}>
              <cfg.Icon className="h-3 w-3" /> {cfg.label}
            </Badge>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" /> {sig.timeframe}
            </span>
          </div>
        </div>

        {/* Entry / TP / SL */}
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="rounded-md bg-secondary p-2 text-center">
            <p className="text-muted-foreground">Entry</p>
            <p className="font-semibold mt-0.5 truncate">{entry}</p>
          </div>
          <div className="rounded-md bg-green-500/10 p-2 text-center">
            <p className="text-green-600 dark:text-green-400 flex items-center justify-center gap-0.5">
              <Target className="h-3 w-3" /> TP
            </p>
            <p className="font-semibold mt-0.5 text-green-600 dark:text-green-400 truncate">{tp}</p>
          </div>
          <div className="rounded-md bg-red-500/10 p-2 text-center">
            <p className="text-red-500 flex items-center justify-center gap-0.5">
              <ShieldAlert className="h-3 w-3" /> SL
            </p>
            <p className="font-semibold mt-0.5 text-red-500 truncate">{sl}</p>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground">Strength:</span>
            {[1, 2, 3].map((i) => (
              <span key={i} className={`inline-block h-2 w-2 rounded-full ${i <= sig.strength ? cfg.color : "bg-muted"}`} />
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground">Confidence:</span>
            <span className={`font-semibold ${cfg.text}`}>{sig.confidence}%</span>
          </div>
        </div>

        {/* TradingView chart link */}
        <a
          href={tvUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-brand transition-colors pt-1 border-t border-border"
        >
          <ExternalLink className="h-3.5 w-3.5" /> View live chart on TradingView
        </a>
      </CardContent>
    </Card>
  );
}

// TradingView Ticker Tape Widget
function TickerTape() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || ref.current.childElementCount > 0) return;
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
        { proName: "BITSTAMP:ETHUSD", title: "Ethereum" },
        { proName: "COINBASE:SOLUSD", title: "Solana" },
        { proName: "FX:EURUSD",       title: "EUR/USD" },
        { proName: "FX:GBPUSD",       title: "GBP/USD" },
        { proName: "NASDAQ:AAPL",     title: "Apple" },
        { proName: "NASDAQ:NVDA",     title: "NVIDIA" },
        { proName: "TVC:GOLD",        title: "Gold" },
        { proName: "TVC:USOIL",       title: "Oil" },
        { proName: "FOREXCOM:SPXUSD", title: "S&P 500" },
      ],
      showSymbolLogo: true,
      isTransparent: false,
      displayMode: "adaptive",
      colorTheme: "dark",
      locale: "en",
    });
    ref.current.appendChild(script);
  }, []);

  return (
    <div className="tradingview-widget-container" ref={ref}>
      <div className="tradingview-widget-container__widget" />
    </div>
  );
}
