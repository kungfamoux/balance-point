import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/DashboardShell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, TrendingUp, Briefcase, Users, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { TradingViewWidget } from "@/components/site/TradingViewWidget";

export const Route = createFileRoute("/_authenticated/dashboard/")({
  component: Overview,
});

const equity = Array.from({ length: 14 }).map((_, i) => ({
  d: `Day ${i + 1}`,
  v: 1000 + Math.round(Math.sin(i / 2) * 200 + i * 80 + Math.random() * 60),
}));

function Overview() {
  const { data } = useQuery({
    queryKey: ["dashboard-overview"],
    queryFn: async () => {
      const [wallet, tx, investments] = await Promise.all([
        api.getWallet(),
        api.getTransactions(5),
        api.getInvestments(),
      ]) as any[];
      const activeInv = (investments ?? []).find((i: any) => i.status === "active");
      return { wallet, tx: tx ?? [], investment: activeInv ?? null };
    },
  });
  const w = data?.wallet;
  return (
    <>
      <PageHeader title="Overview" description="A snapshot of your account and activity.">
        <Button asChild><Link to="/dashboard/deposit">Deposit</Link></Button>
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon={Wallet} label="Balance" value={`$${num(w?.balance)}`} accent="text-brand" />
        <Stat icon={Briefcase} label="Active investment" value={`$${num(w?.active_investment)}`} />
        <Stat icon={TrendingUp} label="Total profit" value={`$${num(w?.total_profit)}`} accent="text-success" />
        <Stat icon={Users} label="Referral earnings" value={`$${num(w?.referral_earnings)}`} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="border-border lg:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-bold">Equity curve</h3>
              <p className="text-xs text-muted-foreground">Last 14 days (demo)</p>
            </div>
            <div className="mt-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={equity}>
                  <defs>
                    <linearGradient id="eq" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.52 0.19 258)" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="oklch(0.52 0.19 258)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="oklch(0.92 0.01 258)" strokeDasharray="3 3" />
                  <XAxis dataKey="d" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="v" stroke="oklch(0.52 0.19 258)" fill="url(#eq)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-6">
            <h3 className="font-display text-lg font-bold">Active plan</h3>
            {data?.investment ? (
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">{(data.investment as any).plans?.name ?? "Plan"}</p>
                <p className="mt-1 font-display text-2xl font-bold">${num(data.investment.amount)}</p>
                <p className="text-xs text-success">ROI {data.investment.roi_percent}%</p>
                <p className="mt-3 text-xs text-muted-foreground">
                  Ends {new Date(data.investment.end_at).toLocaleDateString()}
                </p>
              </div>
            ) : (
              <div className="mt-4 space-y-3">
                <p className="text-sm text-muted-foreground">You don't have an active plan yet.</p>
                <Button asChild size="sm" className="w-full"><Link to="/dashboard/invest">Choose a plan</Link></Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="border-border lg:col-span-1">
          <CardContent className="p-6">
            <h3 className="font-display text-lg font-bold">Recent transactions</h3>
            <ul className="mt-4 divide-y divide-border">
              {(data?.tx ?? []).length === 0 && <p className="py-6 text-center text-sm text-muted-foreground">No activity yet.</p>}
              {(data?.tx ?? []).map((t: any) => {
                const credit = t.type === "deposit" || t.type === "profit" || t.type === "referral";
                return (
                  <li key={t.id} className="flex items-center justify-between gap-3 py-3">
                    <div className="flex items-center gap-3">
                      <span className={`flex h-8 w-8 items-center justify-center rounded-full ${credit ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"}`}>
                        {credit ? <ArrowDownRight className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                      </span>
                      <div>
                        <p className="text-sm font-medium capitalize">{t.type}</p>
                        <p className="text-xs text-muted-foreground">{t.gateway ?? "—"} · {new Date(t.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <p className={`text-sm font-semibold ${credit ? "text-success" : "text-foreground"}`}>${num(t.amount)}</p>
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>
        <Card className="border-border lg:col-span-2">
          <CardContent className="p-2">
            <div className="overflow-hidden rounded-lg">
              <TradingViewWidget
                variant="market-overview"
                height={360}
                config={{
                  colorTheme: "light",
                  dateRange: "1M",
                  showChart: true,
                  locale: "en",
                  width: "100%",
                  height: "100%",
                  tabs: [{
                    title: "Watchlist", symbols: [
                      { s: "BITSTAMP:BTCUSD", d: "BTC" },
                      { s: "BITSTAMP:ETHUSD", d: "ETH" },
                      { s: "NASDAQ:AAPL", d: "AAPL" },
                      { s: "FX:EURUSD", d: "EUR/USD" },
                    ],
                  }],
                }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function Stat({ icon: Icon, label, value, accent }: any) {
  return (
    <Card className="border-border">
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
        <p className={`mt-2 font-display text-2xl font-bold ${accent ?? ""}`}>{value}</p>
      </CardContent>
    </Card>
  );
}

function num(v: any) {
  return Number(v ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
