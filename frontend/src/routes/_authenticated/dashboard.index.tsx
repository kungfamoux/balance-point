import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/DashboardShell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Wallet, TrendingUp, ArrowDownRight, DollarSign, Package, Signal, X, Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { TradingViewWidget } from "@/components/site/TradingViewWidget";
import { useState } from "react";

export const Route = createFileRoute("/_authenticated/dashboard/")({
  component: Overview,
});


function Overview() {
  const navigate = useNavigate();
  const [signalDialogOpen, setSignalDialogOpen] = useState(false);
  const [depositDialogOpen, setDepositDialogOpen] = useState(false);
  const [depositAmount, setDepositAmount] = useState("");
  
  const { data } = useQuery({
    queryKey: ["dashboard-overview"],
    queryFn: async () => {
      const [wallet, tx] = await Promise.all([
        api.getWallet(),
        api.getTransactions(5),
      ]) as any[];
      return { wallet, tx: tx ?? [] };
    },
  });
  const w = data?.wallet;
  const activePlan = w?.activePlan;

  const signalBoostOptions = [
    { percent: 10, price: 1000 },
    { percent: 25, price: 2500 },
    { percent: 50, price: 5000 },
    { percent: 75, price: 7500 },
    { percent: 100, price: 10000 },
  ];

  const handleSignalBoost = (price: number) => {
    setSignalDialogOpen(false);
    navigate({ to: "/dashboard/deposit", search: { amount: price, plan: undefined } });
  };

  const handleQuickDeposit = async () => {
    const amount = Number(depositAmount);
    if (!amount || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    try {
      await api.createDeposit({ amount, gateway: "Direct Deposit" });
      alert("Deposit successful!");
      setDepositAmount("");
      setDepositDialogOpen(false);
      // Refresh wallet data
      window.location.reload();
    } catch (error: any) {
      alert(error?.message || "Deposit failed");
    }
  };

  return (
    <>
      <PageHeader title="Dashboard" description="">
        <Button asChild><Link to="/dashboard/deposit" search={{ amount: undefined, plan: undefined }}>Deposit</Link></Button>
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon={DollarSign} label="Deposit" value={`$${num(w?.balance)}`} accent="text-blue-500" iconColor="bg-blue-500" />
        <Stat icon={TrendingUp} label="Profits" value={`$${num(w?.totalProfit)}`} accent="text-green-500" iconColor="bg-green-500" />
        <Stat icon={Package} label="Active Plan" value={activePlan?.name || "None"} accent="text-orange-500" iconColor="bg-orange-500" />
        <Stat 
          icon={Signal} 
          label="Signal Strength" 
          value={`${w?.signal_strength ?? 0}%`} 
          accent="text-teal-500" 
          iconColor="bg-teal-500" 
          onClick={() => setSignalDialogOpen(true)}
          clickable
        />
      </div>

      {/* Quick Deposit Card */}
      <Card className="border-border bg-gradient-to-r from-blue-500/10 to-purple-500/10">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white">
                <Wallet className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Quick Deposit</h3>
                <p className="text-sm text-muted-foreground">Add funds to your wallet instantly</p>
              </div>
            </div>
            <Button 
              onClick={() => setDepositDialogOpen(true)}
              className="bg-blue-500 hover:bg-blue-600"
            >
              <Plus className="mr-2 h-4 w-4" />
              Deposit
            </Button>
          </div>
        </CardContent>
      </Card>

      <SignalBoostDialog 
        open={signalDialogOpen} 
        onOpenChange={setSignalDialogOpen} 
        options={signalBoostOptions}
        onSelect={handleSignalBoost}
      />

      <QuickDepositDialog 
        open={depositDialogOpen} 
        onOpenChange={setDepositDialogOpen}
        amount={depositAmount}
        onAmountChange={setDepositAmount}
        onDeposit={handleQuickDeposit}
      />


      <div className="mt-6">
        <Card className="border-border">
          <CardContent className="p-2">
            <div className="overflow-hidden rounded-lg dashboard-chart-container" style={{ minHeight: "800px" }}>
              <TradingViewWidget
                variant="advanced-chart"
                height={800}
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

function Stat({ icon: Icon, label, value, accent, iconColor, clickable, onClick }: any) {
  return (
    <Card 
      className={`border-border ${clickable ? "cursor-pointer hover:shadow-lg transition-shadow" : ""}`}
      onClick={onClick}
    >
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

function SignalBoostDialog({ open, onOpenChange, options, onSelect }: any) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Boost Your Signal Strength</DialogTitle>
          <DialogDescription>
            Select a signal boost package to improve your trading signals
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 mt-4">
          {options.map((option: any) => (
            <button
              key={option.percent}
              onClick={() => onSelect(option.price)}
              className="flex items-center justify-between rounded-lg border border-border bg-card p-4 hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-500 text-white">
                  <Signal className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <p className="font-semibold">{option.percent}% Signal Boost</p>
                  <p className="text-sm text-muted-foreground">Enhanced trading accuracy</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-display text-xl font-bold text-teal-500">${option.price}</p>
                <p className="text-xs text-muted-foreground">one-time</p>
              </div>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function QuickDepositDialog({ open, onOpenChange, amount, onAmountChange, onDeposit }: any) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Quick Deposit</DialogTitle>
          <DialogDescription>
            Enter the amount you want to deposit to your wallet
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <div>
            <label className="text-sm font-medium">Amount (USD)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => onAmountChange(e.target.value)}
              placeholder="Enter amount"
              className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[100, 500, 1000, 2500, 5000, 10000].map((preset) => (
              <button
                key={preset}
                onClick={() => onAmountChange(String(preset))}
                className="rounded-md border border-border bg-secondary/50 px-3 py-2 text-sm hover:bg-secondary"
              >
                ${preset}
              </button>
            ))}
          </div>
          <Button onClick={onDeposit} className="w-full bg-blue-500 hover:bg-blue-600">
            Deposit Now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
