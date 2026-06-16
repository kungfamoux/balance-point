import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/DashboardShell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { TrendingUp, TrendingDown, Minus, Clock, Target, ShieldAlert, RefreshCw } from "lucide-react";

export const Route = createFileRoute("/_authenticated/dashboard/signals")({
  component: Signals,
});

type Direction = "BUY" | "SELL" | "HOLD";
type Asset = { symbol: string; name: string; category: string };

const ASSETS: Asset[] = [
  { symbol: "BTC/USD", name: "Bitcoin", category: "Crypto" },
  { symbol: "ETH/USD", name: "Ethereum", category: "Crypto" },
  { symbol: "XRP/USD", name: "Ripple", category: "Crypto" },
  { symbol: "SOL/USD", name: "Solana", category: "Crypto" },
  { symbol: "EUR/USD", name: "Euro / Dollar", category: "Forex" },
  { symbol: "GBP/USD", name: "Pound / Dollar", category: "Forex" },
  { symbol: "USD/JPY", name: "Dollar / Yen", category: "Forex" },
  { symbol: "AUD/USD", name: "Australian Dollar", category: "Forex" },
  { symbol: "AAPL", name: "Apple Inc.", category: "Stocks" },
  { symbol: "TSLA", name: "Tesla Inc.", category: "Stocks" },
  { symbol: "NVDA", name: "NVIDIA Corp.", category: "Stocks" },
  { symbol: "AMZN", name: "Amazon.com", category: "Stocks" },
  { symbol: "GOLD", name: "Gold Spot", category: "Commodities" },
  { symbol: "SILVER", name: "Silver Spot", category: "Commodities" },
  { symbol: "OIL", name: "Crude Oil WTI", category: "Commodities" },
  { symbol: "SP500", name: "S&P 500", category: "Indices" },
  { symbol: "NDX", name: "NASDAQ 100", category: "Indices" },
  { symbol: "DAX", name: "Germany DAX", category: "Indices" },
];

// Deterministic pseudo-signal based on symbol string
function generateSignal(symbol: string, seed: number): {
  direction: Direction; strength: number; entry: string; tp: string; sl: string; timeframe: string; confidence: number;
} {
  const hash = symbol.split("").reduce((a, c) => a + c.charCodeAt(0), seed);
  const directions: Direction[] = ["BUY", "SELL", "BUY", "BUY", "SELL", "HOLD", "BUY", "SELL"];
  const direction = directions[hash % directions.length];
  const timeframes = ["M15", "H1", "H4", "D1"];
  const timeframe = timeframes[hash % timeframes.length];
  const base = 100 + (hash % 900);
  const pct = (hash % 30) / 10;
  const entry = base.toFixed(2);
  const tp = direction === "BUY" ? (base * (1 + pct / 100)).toFixed(2) : (base * (1 - pct / 100)).toFixed(2);
  const sl = direction === "BUY" ? (base * (1 - pct / 200)).toFixed(2) : (base * (1 + pct / 200)).toFixed(2);
  const confidence = 60 + (hash % 35);
  const strength = 1 + (hash % 3);
  return { direction, strength, entry, tp, sl, timeframe, confidence };
}

const CATEGORIES = ["All", "Crypto", "Forex", "Stocks", "Commodities", "Indices"];

const TODAY_SEED = new Date().getDate() + new Date().getMonth() * 31;

function Signals() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = ASSETS.filter((a) => activeCategory === "All" || a.category === activeCategory);

  return (
    <>
      <PageHeader
        title="Trading Signals"
        description="Expert-curated signals updated daily across all major markets."
      />

      {/* Disclaimer */}
      <div className="mb-5 flex items-start gap-2 rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-3 text-xs text-yellow-700 dark:text-yellow-300">
        <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
        <span>Trading signals are for informational purposes only and do not constitute financial advice. Always manage your risk carefully.</span>
      </div>

      {/* Category filter */}
      <div className="mb-5 flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
              activeCategory === cat
                ? "bg-brand text-white"
                : "bg-secondary text-muted-foreground hover:bg-secondary/80"
            }`}
          >
            {cat}
          </button>
        ))}
        <span className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
          <RefreshCw className="h-3 w-3" /> Updated daily
        </span>
      </div>

      {/* Signals grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((asset) => {
          const sig = generateSignal(asset.symbol, TODAY_SEED);
          return <SignalCard key={asset.symbol} asset={asset} signal={sig} />;
        })}
      </div>
    </>
  );
}

function SignalCard({ asset, signal }: {
  asset: Asset;
  signal: ReturnType<typeof generateSignal>;
}) {
  const isBuy = signal.direction === "BUY";
  const isSell = signal.direction === "SELL";

  const directionConfig = {
    BUY: { color: "bg-green-600", text: "text-green-600", icon: TrendingUp, label: "BUY" },
    SELL: { color: "bg-red-600", text: "text-red-600", icon: TrendingDown, label: "SELL" },
    HOLD: { color: "bg-yellow-600", text: "text-yellow-600", icon: Minus, label: "HOLD" },
  }[signal.direction];

  const Icon = directionConfig.icon;

  const strengthDots = Array.from({ length: 3 }).map((_, i) => (
    <span
      key={i}
      className={`inline-block h-2 w-2 rounded-full ${i < signal.strength ? directionConfig.color : "bg-muted"}`}
    />
  ));

  return (
    <Card className="border-border hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="font-bold text-base">{asset.symbol}</p>
            <p className="text-xs text-muted-foreground">{asset.name}</p>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <Badge className={`${directionConfig.color} text-white gap-1 px-2.5`}>
              <Icon className="h-3 w-3" />
              {directionConfig.label}
            </Badge>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" /> {signal.timeframe}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-xs mb-4">
          <div className="rounded-md bg-secondary p-2 text-center">
            <p className="text-muted-foreground">Entry</p>
            <p className="font-semibold mt-0.5">{signal.entry}</p>
          </div>
          <div className="rounded-md bg-green-500/10 p-2 text-center">
            <p className="text-green-600 dark:text-green-400 flex items-center justify-center gap-0.5">
              <Target className="h-3 w-3" /> TP
            </p>
            <p className="font-semibold mt-0.5 text-green-600 dark:text-green-400">{signal.tp}</p>
          </div>
          <div className="rounded-md bg-red-500/10 p-2 text-center">
            <p className="text-red-500 flex items-center justify-center gap-0.5">
              <ShieldAlert className="h-3 w-3" /> SL
            </p>
            <p className="font-semibold mt-0.5 text-red-500">{signal.sl}</p>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground">Strength:</span>
            <span className="flex gap-1">{strengthDots}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground">Confidence:</span>
            <span className={`font-semibold ${directionConfig.text}`}>{signal.confidence}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
