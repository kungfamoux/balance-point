import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/DashboardShell";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/dashboard/support")({
  component: Support,
});

function Support() {
  const qc = useQueryClient();
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const { data: tickets } = useQuery({
    queryKey: ["tickets"],
    queryFn: () => api.getTickets() as any,
  });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!subject.trim() || !body.trim()) return toast.error("Subject and message required");
    try {
      await api.createTicket({ subject, body });
      setSubject(""); setBody("");
      toast.success("Ticket opened. Our team will reply soon.");
      qc.invalidateQueries({ queryKey: ["tickets"] });
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to open ticket");
    }
  }

  return (
    <>
      <PageHeader title="Support" description="Open a ticket and our team will respond within hours." />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border">
          <CardContent className="p-6">
            <h3 className="font-display text-lg font-bold">New ticket</h3>
            <form className="mt-4 space-y-4" onSubmit={submit}>
              <div>
                <Label>Subject</Label>
                <Input value={subject} onChange={(e) => setSubject(e.target.value)} className="mt-2" />
              </div>
              <div>
                <Label>Message</Label>
                <Textarea rows={6} value={body} onChange={(e) => setBody(e.target.value)} className="mt-2" />
              </div>
              <Button type="submit" className="w-full">Open ticket</Button>
            </form>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-6">
            <h3 className="font-display text-lg font-bold">Your tickets</h3>
            <ul className="mt-4 divide-y divide-border">
              {!(tickets as any[])?.length && <p className="py-10 text-center text-sm text-muted-foreground">No tickets yet.</p>}
              {(tickets as any[])?.map((t: any) => (
                <li key={t.id} className="flex items-start justify-between gap-3 py-3">
                  <div>
                    <p className="font-medium">{t.subject}</p>
                    <p className="text-xs text-muted-foreground">{new Date(t.createdAt ?? t.created_at).toLocaleString()}</p>
                  </div>
                  <Badge variant={t.status === "open" ? "default" : "secondary"} className="capitalize">{t.status}</Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
