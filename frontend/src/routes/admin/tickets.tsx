import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "@/lib/adminApi";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, Clock, CheckCircle, XCircle, ChevronRight, Trash2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/tickets")({
  component: AdminTickets,
});

function AdminTickets() {
  const queryClient = useQueryClient();
  const { data: tickets, isLoading } = useQuery({
    queryKey: ["admin", "tickets"],
    queryFn: adminApi.getTickets,
    refetchInterval: 30000,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminApi.deleteTicket(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "tickets"] });
      toast.success("Ticket deleted");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete ticket");
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Support Tickets" description="Manage user support requests" />

      <div className="grid gap-4">
        {tickets && tickets.length > 0 ? (
          tickets.map((ticket: any) => (
            <Card key={ticket.id} className="hover:border-gray-600 transition-colors">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="p-3 bg-blue-600/20 rounded-lg shrink-0">
                    <MessageSquare className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                      <h3 className="font-semibold text-white">{ticket.subject}</h3>
                      {getStatusBadge(ticket.status)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {new Date(ticket.createdAt).toLocaleDateString()}
                      </span>
                      <span>{ticket.messages?.length || 0} messages</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:flex-row flex-row-reverse shrink-0">
                    <Link to="/admin/tickets/$id" params={{ id: ticket.id }}>
                      <Button variant="outline" size="sm">
                        View
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteMutation.mutate(ticket.id)}
                      disabled={deleteMutation.isPending}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <MessageSquare className="w-12 h-12 mx-auto text-gray-600 mb-4" />
              <p className="text-gray-400">No support tickets yet</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
