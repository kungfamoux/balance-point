import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/DashboardShell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TradingViewWidget } from "@/components/site/TradingViewWidget";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowUp, ArrowDown } from "lucide-react";
import { api } from "@/lib/api";

export const Route = createFileRoute("/_authenticated/dashboard/trade")({
  component: TradePage,
});

const symbols = [
  "BITSTAMP:BTCUSD", "BITSTAMP:ETHUSD", "FX:EURUSD", "FX:GBPUSD", "NASDAQ:AAPL",
  "NASDAQ:TSLA", "NASDAQ:NVDA", "FOREXCOM:SPXUSD",
];

function TradePage() {
  const [symbol, setSymbol] = useState(symbols[0]);
  const [amount, setAmount] = useState("100");
  const [leverage, setLeverage] = useState("10");
  const [isPlacing, setIsPlacing] = useState(false);

  async function place(side: "buy" | "sell") {
    const amt = Number(amount);
    if (!amt || amt <= 0) return toast.error("Enter a valid amount");

    setIsPlacing(true);
    try {
      // Simplified entry price estimation (in real system, this would come from market data)
      const entryPrice = getEstimatedPrice(symbol);
      
      await api.createTrade({
        type: side,
        symbol: symbol.split(":")[1], // Use the symbol part after the colon
        amount: amt,
        entryPrice,
        leverage: Number(leverage),
      });
      
      toast.success(`${side.toUpperCase()} ${amt} on ${symbol} @ ${leverage}x executed successfully`);
    } catch (error: any) {
      toast.error(error.message || "Failed to execute trade");
    } finally {
      setIsPlacing(false);
    }
  }

  // Simplified price estimation for demo purposes
  function getEstimatedPrice(symbol: string): number {
    const symbolName = symbol.split(":")[1];
    const basePrices: Record<string, number> = {
      "BTCUSD": 65000,
      "ETHUSD": 3500,
      "EURUSD": 1.08,
      "GBPUSD": 1.27,
      "AAPL": 175,
      "TSLA": 240,
      "NVDA": 850,
      "SPXUSD": 5200,
    };
    return basePrices[symbolName] || 100;
  }

  return (
    <>
      <PageHeader title="Trade" description="Live charts, news and a quick order ticket." />
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-border lg:col-span-2">
          <CardContent className="p-2">
            <div className="overflow-hidden rounded-lg">
              <TradingViewWidget
                variant="advanced-chart"
                height={560}
                config={{
                  autosize: true,
                  symbol,
                  interval: "60",
                  timezone: "Etc/UTC",
                  theme: "light",
                  style: "1",
                  locale: "en",
                  withdateranges: true,
                  hide_side_toolbar: false,
                  allow_symbol_change: true,
                  details: true,
                  studies: ["MASimple@tv-basicstudies"],
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="space-y-5 p-6">
            <h3 className="font-display text-lg font-bold">Order ticket</h3>
            <div>
              <Label>Symbol</Label>
              <Select value={symbol} onValueChange={setSymbol}>
                <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {symbols.map((s) => <SelectItem key={s} value={s}>{s.split(":")[1]}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Amount (USD)</Label>
              <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="mt-2" />
            </div>
            <div>
              <Label>Leverage</Label>
              <Select value={leverage} onValueChange={setLeverage}>
                <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["1", "2", "5", "10", "20", "50", "100"].map((l) => (
                    <SelectItem key={l} value={l}>{l}x</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                className="bg-success text-success-foreground hover:bg-success/90" 
                onClick={() => place("buy")}
                disabled={isPlacing}
              >
                <ArrowUp className="mr-1 h-4 w-4" /> Buy
              </Button>
              <Button 
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90" 
                onClick={() => place("sell")}
                disabled={isPlacing}
              >
                <ArrowDown className="mr-1 h-4 w-4" /> Sell
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
