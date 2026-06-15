import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "@/lib/adminApi";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ChevronDown, ChevronUp, Send, XCircle } from "lucide-react";

export const Route = createFileRoute("/admin/tickets")({
  component: AdminTickets,
});

const ADMIN_UUID = "00000000-0000-0000-0000-000000000000";

function AdminTickets() {
  const qc = useQueryClient();
  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["admin", "tickets"],
    queryFn: adminApi.getTickets,
  });
  const [expanded, setExpanded] = useState<string | null>(null);
  const [replyText, setReplyText] = useState<Record<string, string>>({});

  const replyMut = useMutation({
    mutationFn: ({ id, body }: { id: string; body: string }) => adminApi.replyTicket(id, body),
    onSuccess: (_data, vars) => {
      toast.success("Reply sent");
      setReplyText((r) => ({ ...r, [vars.id]: "" }));
      qc.invalidateQueries({ queryKey: ["admin", "tickets"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  const closeMut = useMutation({
    mutationFn: (id: string) => adminApi.closeTicket(id),
    onSuccess: () => { toast.success("Ticket closed"); qc.invalidateQueries({ queryKey: ["admin", "tickets"] }); },
    onError: (e: any) => toast.error(e.message),
  });

  return (
    <div className="p-6 space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-white">Support Tickets</h1>
        <p className="text-gray-400 text-sm mt-1">{tickets.length} total</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="space-y-3">
          {tickets.map((t: any) => (
            <div key={t.id} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
              <div
                className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-800/40 transition-colors"
                onClick={() => setExpanded(expanded === t.id ? null : t.id)}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full ${t.status === "closed" ? "bg-gray-500" : "bg-green-500"}`} />
                  <div>
                    <p className="text-white font-medium">{t.subject}</p>
                    <p className="text-gray-400 text-xs font-mono">{t.userId}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs text-white ${t.status === "closed" ? "bg-gray-600" : "bg-blue-600"}`}>
                    {t.status}
                  </span>
                  <p className="text-gray-400 text-xs">{new Date(t.createdAt).toLocaleDateString()}</p>
                  {expanded === t.id ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </div>
              </div>

              {expanded === t.id && (
                <div className="border-t border-gray-800 px-5 py-4 space-y-4">
                  <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                    {(t.messages ?? []).map((m: any) => {
                      const isAdmin = m.userId === ADMIN_UUID;
                      return (
                        <div key={m.id} className={`flex ${isAdmin ? "justify-end" : "justify-start"}`}>
                          <div className={`max-w-sm px-3 py-2 rounded-lg text-sm ${isAdmin ? "bg-blue-700 text-white" : "bg-gray-800 text-gray-200"}`}>
                            {isAdmin && <p className="text-xs text-blue-300 mb-1">Admin</p>}
                            <p>{m.body}</p>
                            <p className="text-xs opacity-50 mt-1">{new Date(m.createdAt).toLocaleTimeString()}</p>
                          </div>
                        </div>
                      );
                    })}
                    {!t.messages?.length && <p className="text-gray-500 text-sm text-center py-4">No messages</p>}
                  </div>
                  {t.status !== "closed" && (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={replyText[t.id] ?? ""}
                        onChange={(e) => setReplyText((r) => ({ ...r, [t.id]: e.target.value }))}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && replyText[t.id]?.trim()) {
                            replyMut.mutate({ id: t.id, body: replyText[t.id] });
                          }
                        }}
                        placeholder="Type reply…"
                        className="flex-1 bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-2 text-sm"
                      />
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 h-9"
                        onClick={() => { if (replyText[t.id]?.trim()) replyMut.mutate({ id: t.id, body: replyText[t.id] }); }}
                        disabled={replyMut.isPending}
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        className="bg-gray-700 hover:bg-gray-600 h-9"
                        onClick={() => closeMut.mutate(t.id)}
                        disabled={closeMut.isPending}
                      >
                        <XCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
          {tickets.length === 0 && <p className="text-center text-gray-500 py-12">No tickets</p>}
        </div>
      )}
    </div>
  );
}
