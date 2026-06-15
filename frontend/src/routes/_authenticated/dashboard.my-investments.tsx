import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/DashboardShell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export const Route = createFileRoute("/_authenticated/dashboard/my-investments")({
  component: MyInvestments,
});

function MyInvestments() {
  const { data } = useQuery({
    queryKey: ["my-investments"],
    queryFn: () => api.getInvestments() as any,
  });
  return (
    <>
      <PageHeader title="My investments" description="All active and completed investments.">
        <Button asChild><Link to="/dashboard/invest">New investment</Link></Button>
      </PageHeader>
      {!(data as any[])?.length ? (
        <Card className="border-border">
          <CardContent className="p-10 text-center text-sm text-muted-foreground">
            You don't have any investments yet.
            <div className="mt-4"><Button asChild><Link to="/dashboard/invest">Browse plans</Link></Button></div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {(data as any[]).map((inv: any) => {
            const start = new Date(inv.startAt ?? inv.start_at).getTime();
            const end = new Date(inv.endAt ?? inv.end_at).getTime();
            const pct = Math.max(0, Math.min(100, ((Date.now() - start) / (end - start)) * 100));
            const daysLeft = Math.max(0, Math.ceil((end - Date.now()) / 86400000));
            return (
              <Card key={inv.id} className="border-border">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs uppercase text-muted-foreground">{inv.plan?.name}</p>
                      <p className="mt-1 font-display text-2xl font-bold">${Number(inv.amount).toLocaleString()}</p>
                    </div>
                    <Badge variant={inv.status === "active" ? "default" : "secondary"}>{inv.status}</Badge>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Progress</span><span>{Math.round(pct)}%</span>
                    </div>
                    <Progress value={pct} className="mt-1" />
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                    <Box label="ROI" value={`${inv.roiPercent ?? inv.roi_percent}%`} accent="text-success" />
                    <Box label="Days left" value={String(daysLeft)} />
                    <Box label="Profit" value={`$${Number(inv.profit ?? 0).toLocaleString()}`} accent="text-success" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
}

function Box({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <div className="rounded-md bg-secondary p-2">
      <p className="text-muted-foreground">{label}</p>
      <p className={`font-bold ${accent ?? ""}`}>{value}</p>
    </div>
  );
}
