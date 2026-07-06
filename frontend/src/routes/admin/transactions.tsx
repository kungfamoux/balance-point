import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "@/lib/adminApi";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Check, X } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export const Route = createFileRoute("/admin/transactions")({
  component: AdminTransactions,
  validateSearch: (search: Record<string, unknown>) => ({
    type: (search.type as string) ?? "",
    status: (search.status as string) ?? "",
  }),
});

function AdminTransactions() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const qc = useQueryClient();

  const { data: txs = [], isLoading } = useQuery({
    queryKey: ["admin", "transactions", search.type, search.status],
    queryFn: () => adminApi.getTransactions(search.type || undefined, search.status || undefined),
  });

  const approveMut = useMutation({
    mutationFn: (id: string) => adminApi.approveTransaction(id),
    onSuccess: () => {
      toast.success("Transaction approved");
      qc.invalidateQueries({ queryKey: ["admin", "transactions"] });
      qc.invalidateQueries({ queryKey: ["admin", "stats"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  const rejectMut = useMutation({
    mutationFn: (id: string) => adminApi.rejectTransaction(id),
    onSuccess: () => {
      toast.success("Transaction rejected");
      qc.invalidateQueries({ queryKey: ["admin", "transactions"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  return (
    <div className="space-y-4">
      <AdminPageHeader
        title="Transactions"
        description={`${txs.length} results`}
        actions={
          <div className="flex gap-2">
            <select
              value={search.type}
              onChange={(e) => navigate({ search: { ...search, type: e.target.value } })}
              className="bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-1.5 text-sm"
            >
              <option value="">All types</option>
              <option value="deposit">Deposit</option>
              <option value="withdrawal">Withdrawal</option>
            </select>
            <select
              value={search.status}
              onChange={(e) => navigate({ search: { ...search, status: e.target.value } })}
              className="bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-1.5 text-sm"
            >
              <option value="">All statuses</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        }
      />

      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          {/* Mobile card view */}
          <div className="lg:hidden space-y-3">
            {txs.map((t: any) => (
              <div key={t.id} className="bg-gray-900 border border-gray-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium capitalize">{t.type}</p>
                    <p className="text-gray-500 text-xs font-mono mt-0.5">{t.userId.slice(0, 8)}…</p>
                  </div>
                  <StatusBadge status={t.status} />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white font-medium">${Number(t.amount).toFixed(2)}</span>
                  <span className="text-gray-400">{t.gateway ?? "—"}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">{new Date(t.createdAt).toLocaleDateString()}</span>
                  {t.status === "pending" && (
                    <div className="flex gap-1.5">
                      <Button
                        size="sm"
                        className="bg-green-700 hover:bg-green-600 h-7 px-2"
                        onClick={() => approveMut.mutate(t.id)}
                        disabled={approveMut.isPending}
                      >
                        <Check className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        size="sm"
                        className="bg-red-700 hover:bg-red-600 h-7 px-2"
                        onClick={() => rejectMut.mutate(t.id)}
                        disabled={rejectMut.isPending}
                      >
                        <X className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {txs.length === 0 && (
              <div className="text-center py-12 text-gray-500">No transactions found</div>
            )}
          </div>

          {/* Desktop table view */}
          <div className="hidden lg:block bg-gray-900 border border-gray-800 rounded-xl overflow-x-auto">
            <table className="w-full text-sm min-w-[600px]">
              <thead>
                <tr className="border-b border-gray-800 text-gray-400">
                  <th className="text-left px-4 py-3">User ID</th>
                  <th className="text-left px-4 py-3">Type</th>
                  <th className="text-left px-4 py-3">Amount</th>
                  <th className="text-left px-4 py-3">Gateway</th>
                  <th className="text-left px-4 py-3">Status</th>
                  <th className="text-left px-4 py-3">Date</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {txs.map((t: any) => (
                  <tr key={t.id} className="border-b border-gray-800/50 hover:bg-gray-800/20 transition-colors">
                    <td className="px-4 py-3 text-gray-400 font-mono text-xs max-w-[120px] truncate">{t.userId}</td>
                    <td className="px-4 py-3 capitalize text-white">{t.type}</td>
                    <td className="px-4 py-3 text-white font-medium">${Number(t.amount).toFixed(2)}</td>
                    <td className="px-4 py-3 text-gray-400">{t.gateway ?? "—"}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={t.status} />
                    </td>
                    <td className="px-4 py-3 text-gray-400">{new Date(t.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      {t.status === "pending" && (
                        <div className="flex gap-1.5">
                          <Button
                            size="sm"
                            className="bg-green-700 hover:bg-green-600 h-7 px-2"
                            onClick={() => approveMut.mutate(t.id)}
                            disabled={approveMut.isPending}
                          >
                            <Check className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            size="sm"
                            className="bg-red-700 hover:bg-red-600 h-7 px-2"
                            onClick={() => rejectMut.mutate(t.id)}
                            disabled={rejectMut.isPending}
                          >
                            <X className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
                {txs.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-gray-500">No transactions found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    approved: "bg-green-600",
    pending: "bg-yellow-600",
    rejected: "bg-red-600",
  };
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs text-white ${map[status] ?? "bg-gray-600"}`}>
      {status}
    </span>
  );
}
