import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/DashboardShell";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Copy } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/dashboard/deposit")({
  component: Deposit,
});

const gateways = [
  { id: "Bitcoin", address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh" },
  { id: "Ethereum", address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e" },
  { id: "Bitcoin Cash", address: "qq9vnzx04k0gja7p8kmrjly3jypxrqyfxsxa6r2ucu" },
  { id: "Western Union", address: "Send to: Balancepoint Capital LLC, London, UK — Reference: your email" },
  { id: "PerfectMoney", address: "U18293482" },
];

function Deposit() {
  const [gateway, setGateway] = useState(gateways[0].id);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const selected = gateways.find((g) => g.id === gateway)!;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const amt = Number(amount);
    if (!amt || amt <= 0) { toast.error("Enter a valid amount"); return; }
    setLoading(true);
    const { data: u } = await supabase.auth.getUser();
    const { error } = await supabase.from("transactions").insert({
      user_id: u.user!.id, type: "deposit", gateway, amount: amt, status: "pending",
    });
    setLoading(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Deposit submitted. We'll confirm once funds arrive.");
    setAmount("");
  }

  return (
    <>
      <PageHeader title="Deposit funds" description="Top up your account using one of our supported gateways." />
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-border lg:col-span-2">
          <CardContent className="space-y-5 p-6">
            <div>
              <Label>Payment method</Label>
              <Select value={gateway} onValueChange={setGateway}>
                <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {gateways.map((g) => <SelectItem key={g.id} value={g.id}>{g.id}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="amt">Amount (USD)</Label>
              <Input id="amt" type="number" min="1" step="0.01" value={amount}
                onChange={(e) => setAmount(e.target.value)} className="mt-2" placeholder="100.00" />
            </div>
            <div className="rounded-lg border border-border bg-secondary/50 p-4">
              <p className="text-xs uppercase text-muted-foreground">Send to</p>
              <div className="mt-2 flex items-center justify-between gap-3">
                <code className="break-all text-sm">{selected.address}</code>
                <Button
                  type="button" variant="ghost" size="icon"
                  onClick={() => { navigator.clipboard.writeText(selected.address); toast.success("Copied"); }}
                ><Copy className="h-4 w-4" /></Button>
              </div>
            </div>
            <Button onClick={submit} disabled={loading} className="w-full">
              {loading ? "Submitting..." : "Submit deposit"}
            </Button>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-6">
            <h3 className="font-display text-lg font-bold">How it works</h3>
            <ol className="mt-3 space-y-3 text-sm text-muted-foreground">
              <li>1. Pick your preferred payment method.</li>
              <li>2. Send the funds to the wallet/account shown.</li>
              <li>3. Submit the form so we can match your payment.</li>
              <li>4. Your balance updates on confirmation.</li>
            </ol>
            <p className="mt-5 text-xs text-muted-foreground">
              Crypto deposits typically confirm within 1 network confirmation. Bank transfers take 1–3 business days.
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
