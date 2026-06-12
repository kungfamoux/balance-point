import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/DashboardShell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useState } from "react";

export const Route = createFileRoute("/_authenticated/dashboard/transactions")({
  component: Transactions,
});

const filters = ["all", "deposit", "withdraw", "investment", "profit", "referral"];

function Transactions() {
  const [filter, setFilter] = useState("all");
  const { data } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => api.getTransactions() as any,
  });
  const rows = ((data as any[]) ?? []).filter((t: any) => filter === "all" || t.type === filter);
  return (
    <>
      <PageHeader title="Transactions" description="All movements across your account." />
      <Tabs value={filter} onValueChange={setFilter} className="mb-4">
        <TabsList className="overflow-x-auto">
          {filters.map((f) => <TabsTrigger key={f} value={f} className="capitalize">{f}</TabsTrigger>)}
        </TabsList>
      </Tabs>
      <Card className="border-border">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-secondary/50 text-left text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-5 py-3">Type</th>
                  <th className="px-5 py-3">Gateway</th>
                  <th className="px-5 py-3">Amount</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {rows.length === 0 && (
                  <tr><td colSpan={5} className="px-5 py-10 text-center text-muted-foreground">No transactions yet.</td></tr>
                )}
                {rows.map((t: any) => (
                  <tr key={t.id}>
                    <td className="px-5 py-3 capitalize">{t.type}</td>
                    <td className="px-5 py-3">{t.gateway ?? "—"}</td>
                    <td className="px-5 py-3 font-semibold">${Number(t.amount).toLocaleString()}</td>
                    <td className="px-5 py-3">
                      <Badge variant={t.status === "confirmed" ? "default" : t.status === "pending" ? "secondary" : "destructive"}>
                        {t.status}
                      </Badge>
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">{new Date(t.createdAt ?? t.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
