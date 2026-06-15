import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/DashboardShell";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/dashboard/withdraw")({
  component: Withdraw,
});

const methods = ["Bitcoin", "Ethereum", "Bitcoin Cash", "Western Union", "PerfectMoney"];

function Withdraw() {
  const [method, setMethod] = useState(methods[0]);
  const [amount, setAmount] = useState("");
  const [destination, setDestination] = useState("");
  const [loading, setLoading] = useState(false);

  const { data: wallet } = useQuery({
    queryKey: ["wallet-balance"],
    queryFn: () => api.getWallet() as any,
  });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const amt = Number(amount);
    if (!amt || amt <= 0) return toast.error("Enter a valid amount");
    if (amt > Number((wallet as any)?.balance ?? 0)) return toast.error("Insufficient balance");
    if (!destination.trim()) return toast.error("Enter a destination");
    setLoading(true);
    try {
      await api.createWithdrawal({ amount: amt, gateway: method, meta: { destination } });
      toast.success("Withdrawal request submitted.");
      setAmount(""); setDestination("");
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to submit withdrawal");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <PageHeader title="Withdraw funds" description="Send funds from your account to your preferred destination." />
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-border lg:col-span-2">
          <CardContent className="space-y-5 p-6">
            <div className="rounded-lg border border-border bg-brand-soft/40 p-4">
              <p className="text-xs uppercase text-muted-foreground">Available balance</p>
              <p className="font-display text-2xl font-bold text-brand">
                ${Number((wallet as any)?.balance ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div>
              <Label>Method</Label>
              <Select value={method} onValueChange={setMethod}>
                <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {methods.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="amt">Amount (USD)</Label>
              <Input id="amt" type="number" min="1" step="0.01" value={amount}
                onChange={(e) => setAmount(e.target.value)} className="mt-2" />
            </div>
            <div>
              <Label htmlFor="dest">Destination address / account</Label>
              <Input id="dest" value={destination} onChange={(e) => setDestination(e.target.value)} className="mt-2" />
            </div>
            <Button onClick={submit} disabled={loading} className="w-full">
              {loading ? "Submitting..." : "Submit withdrawal"}
            </Button>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-6 text-sm">
            <h3 className="font-display text-lg font-bold">Processing times</h3>
            <ul className="mt-3 space-y-2 text-muted-foreground">
              <li>Crypto: under 1 hour</li>
              <li>Bank/wire: 1–3 business days</li>
              <li>Other: 1–2 business days</li>
            </ul>
            <p className="mt-5 text-xs text-muted-foreground">
              Withdrawals are reviewed for security before processing. KYC must be complete.
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
