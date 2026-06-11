import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/DashboardShell";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy, Share2, Users, DollarSign } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/dashboard/referrals")({
  component: Referrals,
});

function Referrals() {
  const { data } = useQuery({
    queryKey: ["referrals"],
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      const [{ data: p }, { data: w }, { data: refs }] = await Promise.all([
        supabase.from("profiles").select("referral_code").eq("id", u.user!.id).maybeSingle(),
        supabase.from("wallets").select("referral_earnings").eq("user_id", u.user!.id).maybeSingle(),
        supabase.from("referrals").select("*").eq("referrer_id", u.user!.id),
      ]);
      return { profile: p, wallet: w, refs: refs ?? [] };
    },
  });
  const link = typeof window !== "undefined" && data?.profile?.referral_code
    ? `${window.location.origin}/auth?ref=${data.profile.referral_code}`
    : "";

  return (
    <>
      <PageHeader title="Referrals" description="Invite friends and earn 5% bonus on their deposits." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard icon={Users} label="Referred users" value={String(data?.refs.length ?? 0)} />
        <StatCard icon={DollarSign} label="Referral earnings" value={`$${Number(data?.wallet?.referral_earnings ?? 0).toLocaleString()}`} accent="text-success" />
        <StatCard icon={Share2} label="Your code" value={data?.profile?.referral_code ?? "—"} accent="text-brand" />
      </div>
      <Card className="mt-6 border-border">
        <CardContent className="p-6">
          <h3 className="font-display text-lg font-bold">Your referral link</h3>
          <div className="mt-4 flex gap-2">
            <Input value={link} readOnly />
            <Button onClick={() => { navigator.clipboard.writeText(link); toast.success("Copied"); }}>
              <Copy className="mr-1 h-4 w-4" /> Copy
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card className="mt-6 border-border">
        <CardContent className="p-0">
          <div className="border-b border-border p-5"><h3 className="font-display text-lg font-bold">Referred users</h3></div>
          {data?.refs.length === 0 ? (
            <p className="p-10 text-center text-sm text-muted-foreground">No referrals yet. Share your link to start earning.</p>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-secondary/50 text-left text-xs uppercase tracking-wide text-muted-foreground">
                <tr><th className="px-5 py-3">User</th><th className="px-5 py-3">Bonus</th><th className="px-5 py-3">Joined</th></tr>
              </thead>
              <tbody className="divide-y divide-border">
                {data?.refs.map((r: any) => (
                  <tr key={r.id}>
                    <td className="px-5 py-3">{r.referred_id.slice(0, 8)}…</td>
                    <td className="px-5 py-3 text-success">${Number(r.bonus_amount).toLocaleString()}</td>
                    <td className="px-5 py-3 text-muted-foreground">{new Date(r.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </>
  );
}

function StatCard({ icon: Icon, label, value, accent }: any) {
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
