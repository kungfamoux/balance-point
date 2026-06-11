import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/DashboardShell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
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
    queryFn: async () => (await supabase.from("plans").select("*").order("sort_order")).data ?? [],
  });
  return (
    <>
      <PageHeader title="Investment plans" description="Pick a plan and start earning. Profits accrue daily." />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {plans?.map((p, i) => <PlanCard key={p.id} plan={p} featured={i === 1} />)}
      </div>
    </>
  );
}

function PlanCard({ plan, featured }: { plan: any; featured?: boolean }) {
  const qc = useQueryClient();
  const [amount, setAmount] = useState(String(plan.min_deposit));
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function invest() {
    const amt = Number(amount);
    if (amt < Number(plan.min_deposit) || amt > Number(plan.max_deposit)) {
      return toast.error(`Amount must be between $${plan.min_deposit} and $${plan.max_deposit}`);
    }
    setLoading(true);
    const { data: u } = await supabase.auth.getUser();
    const { data: wallet } = await supabase.from("wallets").select("*").eq("user_id", u.user!.id).maybeSingle();
    if (!wallet || Number(wallet.balance) < amt) {
      setLoading(false);
      return toast.error("Insufficient balance. Please deposit first.");
    }
    const end = new Date();
    end.setDate(end.getDate() + plan.duration_days);
    const { error: invErr } = await supabase.from("investments").insert({
      user_id: u.user!.id, plan_id: plan.id, amount: amt, roi_percent: plan.roi_percent,
      end_at: end.toISOString(), status: "active",
    });
    if (invErr) { setLoading(false); return toast.error(invErr.message); }
    await supabase.from("wallets").update({
      balance: Number(wallet.balance) - amt,
      active_investment: Number(wallet.active_investment) + amt,
    }).eq("user_id", u.user!.id);
    await supabase.from("transactions").insert({
      user_id: u.user!.id, type: "investment", gateway: plan.name, amount: amt, status: "confirmed",
    });
    setLoading(false);
    setOpen(false);
    qc.invalidateQueries();
    toast.success(`Invested $${amt} in ${plan.name}`);
  }

  return (
    <Card className={featured ? "border-brand shadow-lg" : "border-border"}>
      <CardContent className="p-6">
        <p className="text-xs uppercase text-muted-foreground">Min ${Number(plan.min_deposit).toLocaleString()}</p>
        <h3 className="mt-2 font-display text-xl font-bold">{plan.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{plan.tagline}</p>
        <p className="mt-4 font-display text-3xl font-bold text-brand">{plan.roi_percent}%</p>
        <p className="text-xs uppercase text-muted-foreground">ROI / {plan.duration_days} days</p>
        <ul className="mt-4 space-y-2 text-sm">
          <Li>Max ${Number(plan.max_deposit).toLocaleString()}</Li>
          <Li>Referral {plan.referral_percent}%</Li>
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
              <Input id="iamt" type="number" min={plan.min_deposit} max={plan.max_deposit} value={amount}
                onChange={(e) => setAmount(e.target.value)} />
              <p className="text-xs text-muted-foreground">
                Estimated return: ${(Number(amount || 0) * Number(plan.roi_percent) / 100).toLocaleString()}
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
