import { createFileRoute } from "@tanstack/react-router";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "@/lib/adminApi";
import { toast } from "sonner";
import { FileText, Check, X, Download, Trash2 } from "lucide-react";

export const Route = createFileRoute("/admin/kyc")({
  component: KYCManagement,
});

function KYCManagement() {
  const queryClient = useQueryClient();
  const { data: documents, isLoading } = useQuery({
    queryKey: ["admin-kyc"],
    queryFn: () => adminApi.getKycDocuments(),
  });

  const approveMutation = useMutation({
    mutationFn: (id: string) => adminApi.approveKycDocument(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-kyc"] });
      toast.success("KYC document approved");
    },
    onError: (error: any) => {
      toast.error(error?.message ?? "Failed to approve document");
    },
  });

  const rejectMutation = useMutation({
    mutationFn: ({ id, reason }: { id: string; reason?: string }) => 
      adminApi.rejectKycDocument(id, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-kyc"] });
      toast.success("KYC document rejected");
    },
    onError: (error: any) => {
      toast.error(error?.message ?? "Failed to reject document");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await adminApi.deleteKycDocument(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-kyc"] });
      toast.success("KYC document deleted");
    },
    onError: (error: any) => {
      toast.error(error?.message ?? "Failed to delete document");
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading KYC documents...</div>
      </div>
    );
  }

  return (
    <>
      <AdminPageHeader 
        title="KYC Document Management" 
        description="Review and approve identity verification documents"
      />
      
      <Card className="border-border">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-secondary/50 text-left text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-5 py-3">User</th>
                  <th className="px-5 py-3">Document Type</th>
                  <th className="px-5 py-3">Document URL</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Submitted</th>
                  <th className="px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {documents?.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-5 py-10 text-center text-muted-foreground">
                      No KYC documents submitted yet.
                    </td>
                  </tr>
                )}
                {documents?.map((doc: any) => (
                  <tr key={doc.id}>
                    <td className="px-5 py-3">
                      <div>
                        <div className="font-medium">{doc.profile?.fullName || 'Unknown'}</div>
                        <div className="text-xs text-muted-foreground">{doc.profile?.email}</div>
                      </div>
                    </td>
                    <td className="px-5 py-3 capitalize">
                      {doc.documentType.replace(/_/g, ' ')}
                    </td>
                    <td className="px-5 py-3">
                      <a 
                        href={doc.documentUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline flex items-center gap-1"
                      >
                        <FileText className="h-4 w-4" />
                        View Document
                      </a>
                    </td>
                    <td className="px-5 py-3">
                      <Badge 
                        variant={
                          doc.status === "approved" ? "default" : 
                          doc.status === "rejected" ? "destructive" : 
                          "secondary"
                        }
                        className="capitalize"
                      >
                        {doc.status}
                      </Badge>
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">
                      {new Date(doc.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        {doc.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => approveMutation.mutate(doc.id)}
                              disabled={approveMutation.isPending}
                            >
                              <Check className="h-4 w-4 text-green-500" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => rejectMutation.mutate({ id: doc.id })}
                              disabled={rejectMutation.isPending}
                            >
                              <X className="h-4 w-4 text-red-500" />
                            </Button>
                          </>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => window.open(doc.documentUrl, '_blank')}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deleteMutation.mutate(doc.id)}
                          disabled={deleteMutation.isPending}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </td>
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
