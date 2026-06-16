import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/DashboardShell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, TrendingUp, ArrowDownRight, DollarSign, Package, Signal } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { TradingViewWidget } from "@/components/site/TradingViewWidget";

export const Route = createFileRoute("/_authenticated/dashboard/")({
  component: Overview,
});


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
      <PageHeader title="Dashboard" description="Welcome Susan">
        <Button asChild><Link to="/dashboard/deposit">Deposit</Link></Button>
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon={DollarSign} label="Balance" value={`$${num(w?.balance)}`} accent="text-blue-500" iconColor="bg-blue-500" />
        <Stat icon={TrendingUp} label="Profits" value={`$${num(w?.total_profit)}`} accent="text-green-500" iconColor="bg-green-500" />
        <Stat icon={Package} label="Deposits" value={`$${num(w?.total_deposits ?? 0)}`} accent="text-orange-500" iconColor="bg-orange-500" />
        <Stat icon={Signal} label="Signal Strength" value={`${w?.signal_strength ?? 0}%`} accent="text-teal-500" iconColor="bg-teal-500" />
      </div>


      <div className="mt-6">
        <Card className="border-border">
          <CardContent className="p-2">
            <div className="overflow-hidden rounded-lg">
              <TradingViewWidget
                variant="advanced-chart"
                height={500}
                config={{
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
                  container_id: "tradingview_chart",
                }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function Stat({ icon: Icon, label, value, accent, iconColor }: any) {
  return (
    <Card className="border-border">
      <CardContent className="p-5">
        <div className="flex items-center gap-3">
          <div className={`flex h-10 w-10 items-center justify-center rounded-full ${iconColor} text-white`}>
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
            <p className={`mt-1 font-display text-2xl font-bold ${accent ?? ""}`}>{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function num(v: any) {
  return Number(v ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
