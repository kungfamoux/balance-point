import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "@/lib/adminApi";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Check, X, FileText, User, Calendar } from "lucide-react";

export const Route = createFileRoute("/admin/kyc")({
  component: AdminKyc,
});

function AdminKyc() {
  const qc = useQueryClient();
  const { data: kycDocs = [], isLoading } = useQuery({
    queryKey: ["admin", "kyc"],
    queryFn: adminApi.getKycDocuments,
  });

  const approveMut = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => adminApi.updateKycDocument(id, status),
    onSuccess: () => {
      toast.success("KYC document updated");
      qc.invalidateQueries({ queryKey: ["admin", "kyc"] });
      qc.invalidateQueries({ queryKey: ["admin", "users"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  return (
    <div className="p-6 space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-white">KYC Approvals</h1>
        <p className="text-gray-400 text-sm mt-1">{kycDocs.length} pending submissions</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : kycDocs.length === 0 ? (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-12 text-center">
          <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-500">No pending KYC submissions</p>
        </div>
      ) : (
        <div className="space-y-4">
          {kycDocs.map((doc: any) => (
            <div key={doc.id} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-white font-medium">{doc.profile?.fullName || "Unknown User"}</p>
                      <p className="text-gray-400 text-xs font-mono">{doc.userId}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-white capitalize">{doc.documentType.replace(/_/g, " ")}</p>
                      <a 
                        href={doc.documentUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-400 text-xs hover:text-blue-300"
                      >
                        View Document
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <p className="text-gray-400 text-sm">
                      Submitted {new Date(doc.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="bg-green-700 hover:bg-green-600 h-9 px-4"
                    onClick={() => approveMut.mutate({ id: doc.id, status: "approved" })}
                    disabled={approveMut.isPending}
                  >
                    <Check className="w-4 h-4 mr-1" />
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    className="bg-red-700 hover:bg-red-600 h-9 px-4"
                    onClick={() => approveMut.mutate({ id: doc.id, status: "rejected" })}
                    disabled={approveMut.isPending}
                  >
                    <X className="w-4 h-4 mr-1" />
                    Reject
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
