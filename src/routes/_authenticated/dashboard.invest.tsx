import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/DashboardShell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "sonner";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/_authenticated/dashboard/invest")({
  component: Invest,
});

function Invest() {
  const { data: plans } = useQuery({
    queryKey: ["plans"],
    queryFn: () => api.getPlans() as any,
  });
  return (
    <>
      <PageHeader title="Investment plans" description="Pick a plan and start earning. Profits accrue daily." />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {(plans as any[])?.map((p: any, i: number) => <PlanCard key={p.id} plan={p} featured={i === 1} />)}
      </div>
    </>
  );
}

function PlanCard({ plan, featured }: { plan: any; featured?: boolean }) {
  const qc = useQueryClient();
  const [amount, setAmount] = useState(String(plan.minDeposit ?? plan.min_deposit));
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const minDep = Number(plan.minDeposit ?? plan.min_deposit);
  const maxDep = Number(plan.maxDeposit ?? plan.max_deposit);
  const roiPct = Number(plan.roiPercent ?? plan.roi_percent);
  const refPct = Number(plan.referralPercent ?? plan.referral_percent);
  const durDays = plan.durationDays ?? plan.duration_days;

  async function invest() {
    const amt = Number(amount);
    if (amt < minDep || amt > maxDep) {
      return toast.error(`Amount must be between $${minDep} and $${maxDep}`);
    }
    setLoading(true);
    try {
      await api.createInvestment({ planId: plan.id, amount: amt });
      qc.invalidateQueries();
      setOpen(false);
      toast.success(`Invested $${amt} in ${plan.name}`);
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to invest");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className={featured ? "border-brand shadow-lg" : "border-border"}>
      <CardContent className="p-6">
        <p className="text-xs uppercase text-muted-foreground">Min ${minDep.toLocaleString()}</p>
        <h3 className="mt-2 font-display text-xl font-bold">{plan.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{plan.tagline}</p>
        <p className="mt-4 font-display text-3xl font-bold text-brand">{roiPct}%</p>
        <p className="text-xs uppercase text-muted-foreground">ROI / {durDays} days</p>
        <ul className="mt-4 space-y-2 text-sm">
          <Li>Max ${maxDep.toLocaleString()}</Li>
          <Li>Referral {refPct}%</Li>
          <Li>Daily payouts</Li>
        </ul>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="mt-5 w-full">Invest</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Invest in {plan.name}</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <Label htmlFor="iamt">Amount (USD)</Label>
              <Input id="iamt" type="number" min={minDep} max={maxDep} value={amount}
                onChange={(e) => setAmount(e.target.value)} />
              <p className="text-xs text-muted-foreground">
                Estimated return: ${(Number(amount || 0) * roiPct / 100).toLocaleString()}
              </p>
            </div>
            <DialogFooter>
              <Button onClick={invest} disabled={loading}>{loading ? "Investing..." : "Confirm"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}

function Li({ children }: { children: React.ReactNode }) {
  return <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-success" />{children}</li>;
}
