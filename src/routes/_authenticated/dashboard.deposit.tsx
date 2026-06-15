import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/DashboardShell";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Copy, BadgeCheck, RefreshCw, TrendingUp, TrendingDown } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/_authenticated/dashboard/deposit")({
  validateSearch: (search: Record<string, unknown>) => ({
    amount: search.amount ? Number(search.amount) : undefined,
    plan: search.plan ? String(search.plan) : undefined,
  }),
  component: Deposit,
});

const gateways = [
  { id: "Bitcoin (BTC)",  symbol: "BTC",  coinId: "bitcoin",  address: "bc1qwudxts5a5p6njxjkcujh0pmz7flqznxwddcusx",          icon: "₿",  color: "#F7931A" },
  { id: "Ethereum (ETH)", symbol: "ETH",  coinId: "ethereum", address: "0x5E0075153409278ecFf5B1ED7a65F472855c84DE",           icon: "Ξ",  color: "#627EEA" },
  { id: "Solana (SOL)",   symbol: "SOL",  coinId: "solana",   address: "8QdbtaSuFssh2B5fjZQZfNCJqcqDaejrhnYRjvPivKAz",        icon: "◎",  color: "#9945FF" },
  { id: "USDT (ERC-20)",  symbol: "USDT", coinId: "tether",   address: "0x5E0075153409278ecFf5B1ED7a65F472855c84DE",           icon: "₮",  color: "#26A17B" },
  { id: "XRP",            symbol: "XRP",  coinId: "ripple",   address: "r59V8nHMmmt6MAsj1L3mnmq4ELJdDkYQD",                   icon: "✕",  color: "#346AA9" },
];

const COIN_IDS = gateways.map((g) => g.coinId).join(",");

interface PriceData {
  [coinId: string]: {
    usd: number;
    usd_24h_change: number;
  };
}

async function fetchPrices(): Promise<PriceData> {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${COIN_IDS}&vs_currencies=usd&include_24hr_change=true`
  );
  if (!res.ok) throw new Error("Failed to fetch prices");
  return res.json();
}

function Deposit() {
  const { t } = useTranslation();
  const { amount: prefillAmount, plan: prefillPlan } = Route.useSearch();
  const [gateway, setGateway] = useState(gateways[0].id);
  const [amount, setAmount] = useState(prefillAmount ? String(prefillAmount) : "");
  const [loading, setLoading] = useState(false);

  const selected = gateways.find((g) => g.id === gateway)!;

  const { data: prices, isLoading: pricesLoading, refetch, dataUpdatedAt } = useQuery({
    queryKey: ["crypto-prices"],
    queryFn: fetchPrices,
    refetchInterval: 30_000,
    staleTime: 20_000,
  });

  const usdAmount = Number(amount) || 0;
  const selectedPrice = prices?.[selected.coinId]?.usd ?? 0;
  const selectedChange = prices?.[selected.coinId]?.usd_24h_change ?? 0;
  const cryptoEquivalent = selectedPrice > 0 ? usdAmount / selectedPrice : 0;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const amt = Number(amount);
    if (!amt || amt <= 0) { toast.error("Enter a valid amount"); return; }
    setLoading(true);
    try {
      await api.createDeposit({ amount: amt, gateway: selected.id });
      toast.success(t("dashboard.deposit.success"));
      setAmount("");
    } catch (err: any) {
      toast.error(err?.message ?? t("common.error"));
    } finally {
      setLoading(false);
    }
  }

  const updatedTime = dataUpdatedAt
    ? new Date(dataUpdatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
    : null;

  return (
    <>
      <PageHeader title={t("dashboard.deposit.title")} description={t("dashboard.deposit.desc")} />

      {/* Plan banner */}
      {prefillPlan && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-brand/30 bg-brand/5 px-5 py-4">
          <BadgeCheck className="h-5 w-5 text-brand" />
          <div>
            <p className="font-semibold text-brand">{prefillPlan} Plan selected</p>
            <p className="text-sm text-muted-foreground">
              Minimum deposit of <span className="font-semibold">${Number(prefillAmount ?? 0).toLocaleString()}</span> has been pre-filled below.
            </p>
          </div>
          <Badge className="ml-auto bg-brand/10 text-brand">${Number(prefillAmount ?? 0).toLocaleString()}</Badge>
        </div>
      )}

      {/* Live rates bar */}
      <div className="mb-6 overflow-hidden rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Live Rates</p>
          <button
            onClick={() => refetch()}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
          >
            <RefreshCw className={`h-3 w-3 ${pricesLoading ? "animate-spin" : ""}`} />
            {updatedTime ? `Updated ${updatedTime}` : "Loading…"}
          </button>
        </div>
        <div className="grid grid-cols-2 divide-border sm:grid-cols-5 sm:divide-x">
          {gateways.map((g) => {
            const price = prices?.[g.coinId]?.usd;
            const change = prices?.[g.coinId]?.usd_24h_change ?? 0;
            const positive = change >= 0;
            const isSelected = g.id === gateway;
            return (
              <button
                key={g.id}
                onClick={() => setGateway(g.id)}
                className={`flex flex-col items-center gap-0.5 px-3 py-3 transition-colors hover:bg-secondary/50 ${
                  isSelected ? "bg-brand/5 ring-inset ring-1 ring-brand/30" : ""
                }`}
              >
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ backgroundColor: g.color }}
                >
                  {g.icon}
                </span>
                <span className="mt-1 text-xs font-semibold">{g.symbol}</span>
                {price ? (
                  <>
                    <span className="text-sm font-bold">
                      ${price.toLocaleString(undefined, { maximumFractionDigits: price < 1 ? 4 : 2 })}
                    </span>
                    <span className={`flex items-center gap-0.5 text-[10px] font-medium ${positive ? "text-green-500" : "text-red-500"}`}>
                      {positive ? <TrendingUp className="h-2.5 w-2.5" /> : <TrendingDown className="h-2.5 w-2.5" />}
                      {positive ? "+" : ""}{change.toFixed(2)}%
                    </span>
                  </>
                ) : (
                  <span className="text-xs text-muted-foreground">—</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-border lg:col-span-2">
          <CardContent className="space-y-5 p-6">
            {/* Gateway selector */}
            <div>
              <Label>{t("dashboard.deposit.method")}</Label>
              <Select value={gateway} onValueChange={setGateway}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {gateways.map((g) => (
                    <SelectItem key={g.id} value={g.id}>
                      <span className="flex items-center gap-2">
                        <span
                          className="inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white"
                          style={{ backgroundColor: g.color }}
                        >
                          {g.icon}
                        </span>
                        {g.id}
                        {prices?.[g.coinId]?.usd && (
                          <span className="ml-auto text-xs text-muted-foreground">
                            ${prices[g.coinId].usd.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                          </span>
                        )}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Amount input */}
            <div>
              <Label htmlFor="amt">{t("dashboard.deposit.amount")}</Label>
              <div className="relative mt-2">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">$</span>
                <Input
                  id="amt"
                  type="number"
                  min="1"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-7"
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* Conversion display */}
            {usdAmount > 0 && (
              <div className="rounded-xl border border-brand/20 bg-brand/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">You will send</p>
                <div className="mt-2 flex items-center justify-between">
                  <div>
                    <p className="font-display text-2xl font-bold" style={{ color: selected.color }}>
                      {selected.symbol === "USDT"
                        ? usdAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                        : cryptoEquivalent.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 8 })}
                      {" "}{selected.symbol}
                    </p>
                    <p className="text-sm text-muted-foreground">≈ ${usdAmount.toLocaleString()} USD</p>
                  </div>
                  <div className="text-right">
                    {selectedPrice > 0 && (
                      <div className="text-xs text-muted-foreground">
                        <p>1 {selected.symbol}</p>
                        <p className="font-semibold text-foreground">
                          = ${selectedPrice.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Wallet address */}
            <div className="rounded-lg border border-border bg-secondary/50 p-4">
              <p className="text-xs uppercase text-muted-foreground">{t("dashboard.deposit.sendTo")}</p>
              <div className="mt-2 flex items-center justify-between gap-3">
                <code className="break-all text-sm">{selected.address}</code>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    navigator.clipboard.writeText(selected.address);
                    toast.success(t("common.copied"));
                  }}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Button onClick={submit} disabled={loading} className="w-full">
              {loading ? t("dashboard.deposit.submitting") : t("dashboard.deposit.submit")}
            </Button>
          </CardContent>
        </Card>

        {/* Right panel */}
        <div className="flex flex-col gap-6">
          {/* How it works */}
          <Card className="border-border">
            <CardContent className="p-6">
              <h3 className="font-display text-lg font-bold">{t("dashboard.deposit.howItWorks")}</h3>
              <ol className="mt-3 space-y-3 text-sm text-muted-foreground">
                <li>1. {t("dashboard.deposit.step1")}</li>
                <li>2. {t("dashboard.deposit.step2")}</li>
                <li>3. {t("dashboard.deposit.step3")}</li>
                <li>4. {t("dashboard.deposit.step4")}</li>
              </ol>
              <p className="mt-5 text-xs text-muted-foreground">{t("dashboard.deposit.note")}</p>
            </CardContent>
          </Card>

          {/* All rates summary */}
          <Card className="border-border">
            <CardContent className="p-6">
              <h3 className="font-display text-base font-bold mb-3">All Rates (USD)</h3>
              <div className="space-y-2.5">
                {gateways.map((g) => {
                  const price = prices?.[g.coinId]?.usd;
                  const change = prices?.[g.coinId]?.usd_24h_change ?? 0;
                  const positive = change >= 0;
                  return (
                    <div key={g.id} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span
                          className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-white"
                          style={{ backgroundColor: g.color }}
                        >
                          {g.icon}
                        </span>
                        <span className="font-medium">{g.symbol}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          {price
                            ? `$${price.toLocaleString(undefined, { maximumFractionDigits: price < 1 ? 4 : 2 })}`
                            : "—"}
                        </p>
                        {price && (
                          <p className={`text-[10px] ${positive ? "text-green-500" : "text-red-500"}`}>
                            {positive ? "+" : ""}{change.toFixed(2)}% (24h)
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
