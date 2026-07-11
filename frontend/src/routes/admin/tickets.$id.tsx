import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "@/lib/adminApi";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Send, MessageSquare, Shield, User } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export const Route = createFileRoute("/admin/tickets/$id")({
  component: TicketDetails,
});

function TicketDetails() {
  const { id } = Route.useParams();
  const queryClient = useQueryClient();
  const [reply, setReply] = useState("");

  const { data: ticket, isLoading } = useQuery({
    queryKey: ["admin", "ticket", id],
    queryFn: () => adminApi.getTicket(id),
    refetchInterval: 10000,
  });

  const replyMutation = useMutation({
    mutationFn: (body: string) => adminApi.replyToTicket(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "ticket", id] });
      queryClient.invalidateQueries({ queryKey: ["admin", "tickets"] });
      setReply("");
      toast.success("Reply sent");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to send reply");
    },
  });

  const statusMutation = useMutation({
    mutationFn: (status: string) => adminApi.updateTicketStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "ticket", id] });
      queryClient.invalidateQueries({ queryKey: ["admin", "tickets"] });
      toast.success("Status updated");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update status");
    },
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge className="bg-green-600">Open</Badge>;
      case "in_progress":
        return <Badge className="bg-blue-600">In Progress</Badge>;
      case "closed":
        return <Badge className="bg-gray-600">Closed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reply.trim()) return;
    replyMutation.mutate(reply);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">Ticket not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/admin/tickets">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>
        <AdminPageHeader title={ticket.subject} description={`Ticket ID: ${id.slice(0, 8)}`} />
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getStatusBadge(ticket.status)}
              <span className="text-sm text-gray-400">
                Created {new Date(ticket.createdAt).toLocaleString()}
              </span>
            </div>
            <Select
              value={ticket.status}
              onValueChange={(value) => statusMutation.mutate(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Conversation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {ticket.messages && ticket.messages.length > 0 ? (
            ticket.messages.map((message: any) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.isAdmin ? "flex-row-reverse" : ""}`}
              >
                <div className={`p-2 rounded-lg ${message.isAdmin ? "bg-blue-600" : "bg-gray-700"}`}>
                  {message.isAdmin ? (
                    <Shield className="w-4 h-4 text-white" />
                  ) : (
                    <User className="w-4 h-4 text-white" />
                  )}
                </div>
                <div
                  className={`flex-1 p-4 rounded-lg ${
                    message.isAdmin
                      ? "bg-blue-600/20 border border-blue-600/30"
                      : "bg-gray-800 border border-gray-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">
                      {message.isAdmin ? "Admin" : "User"}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(message.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-gray-200">{message.body}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 py-8">No messages yet</p>
          )}
        </CardContent>
      </Card>

      {ticket.status !== "closed" && (
        <Card>
          <CardHeader>
            <CardTitle>Reply</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleReply} className="space-y-4">
              <Textarea
                placeholder="Type your reply..."
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                rows={4}
                className="bg-gray-900 border-gray-700"
              />
              <Button
                type="submit"
                disabled={replyMutation.isPending || !reply.trim()}
                className="w-full"
              >
                <Send className="w-4 h-4 mr-2" />
                {replyMutation.isPending ? "Sending..." : "Send Reply"}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
