import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/DashboardShell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Award } from "lucide-react";

export const Route = createFileRoute("/_authenticated/dashboard/copytrade")({
  component: CopyTrade,
});

const traders = [
  { handle: "@alex_volatility", name: "Alex Reyes", roi: "+182%", risk: "Medium", strategy: "FX swing" },
  { handle: "@crypto_mira", name: "Mira Kapoor", roi: "+241%", risk: "High", strategy: "Crypto trend" },
  { handle: "@steady_lin", name: "Linus Park", roi: "+96%", risk: "Low", strategy: "Index DCA" },
  { handle: "@gold_hunter", name: "Diana Vega", roi: "+134%", risk: "Medium", strategy: "Commodities" },
  { handle: "@bluechip_tom", name: "Tomás Oliveira", roi: "+78%", risk: "Low", strategy: "US stocks" },
  { handle: "@scalper_yui", name: "Yui Hayashi", roi: "+312%", risk: "High", strategy: "FX scalping" },
];

function CopyTrade() {
  const qc = useQueryClient();
  const { data: follows } = useQuery({
    queryKey: ["follows"],
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      const { data } = await supabase.from("copy_follows").select("*").eq("user_id", u.user!.id);
      return data ?? [];
    },
  });
  const followed = new Set(follows?.map((f: any) => f.trader_handle));

  async function toggle(handle: string) {
    const { data: u } = await supabase.auth.getUser();
    if (followed.has(handle)) {
      await supabase.from("copy_follows").delete().eq("user_id", u.user!.id).eq("trader_handle", handle);
      toast.success("Unfollowed");
    } else {
      await supabase.from("copy_follows").insert({ user_id: u.user!.id, trader_handle: handle });
      toast.success("Following");
    }
    qc.invalidateQueries({ queryKey: ["follows"] });
  }

  return (
    <>
      <PageHeader title="Copytrade" description="Follow top traders and mirror their strategies." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {traders.map((t) => (
          <Card key={t.handle} className="border-border">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-brand text-white">{t.name.split(" ").map(n=>n[0]).join("")}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{t.name}</p>
                    <Award className="h-4 w-4 text-warning" />
                  </div>
                  <p className="text-xs text-muted-foreground">{t.handle}</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="rounded-md bg-secondary p-2"><p className="text-muted-foreground">ROI</p><p className="font-bold text-success">{t.roi}</p></div>
                <div className="rounded-md bg-secondary p-2"><p className="text-muted-foreground">Risk</p><p className="font-bold">{t.risk}</p></div>
                <div className="rounded-md bg-secondary p-2"><p className="text-muted-foreground">Style</p><p className="truncate font-bold">{t.strategy}</p></div>
              </div>
              <Button
                className="mt-4 w-full" variant={followed.has(t.handle) ? "outline" : "default"}
                onClick={() => toggle(t.handle)}
              >
                {followed.has(t.handle) ? "Following" : "Follow"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
