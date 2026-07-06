import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "@/lib/adminApi";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Check } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export const Route = createFileRoute("/admin/investments")({
  component: AdminInvestments,
});

function AdminInvestments() {
  const qc = useQueryClient();
  const { data: investments = [], isLoading } = useQuery({
    queryKey: ["admin", "investments"],
    queryFn: adminApi.getInvestments,
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editProfit, setEditProfit] = useState("");
  const [editStatus, setEditStatus] = useState("");

  const updateMut = useMutation({
    mutationFn: ({ id, body }: { id: string; body: object }) => adminApi.updateInvestment(id, body),
    onSuccess: () => {
      toast.success("Investment updated");
      setEditingId(null);
      setEditProfit("");
      setEditStatus("");
      qc.invalidateQueries({ queryKey: ["admin", "investments"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  const handleEdit = (inv: any) => {
    setEditingId(inv.id);
    setEditProfit(String(inv.profit));
    setEditStatus(inv.status);
  };

  const handleSave = (id: string) => {
    updateMut.mutate({
      id,
      body: {
        ...(editProfit ? { profit: Number(editProfit) } : {}),
        ...(editStatus ? { status: editStatus } : {}),
      },
    });
  };

  return (
    <div className="space-y-4">
      <AdminPageHeader title="Investments" description={`${investments.length} total investments`} />

      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          {/* Mobile card view */}
          <div className="lg:hidden space-y-3">
            {investments.map((inv: any) => (
              <div key={inv.id} className="bg-gray-900 border border-gray-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">{inv.plan?.name ?? "—"}</p>
                    <p className="text-gray-500 text-xs font-mono mt-0.5">{inv.userId.slice(0, 8)}…</p>
                  </div>
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs text-white ${inv.status === "active" ? "bg-green-600" : inv.status === "completed" ? "bg-blue-600" : "bg-gray-600"}`}>
                    {inv.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-400 text-xs">Amount</p>
                    <p className="text-white">${Number(inv.amount).toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">ROI</p>
                    <p className="text-white">{Number(inv.roiPercent).toFixed(1)}%</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">Profit</p>
                    <p className="text-green-400">{editingId === inv.id ? (
                      <Input
                        type="number"
                        value={editProfit}
                        onChange={(e) => setEditProfit(e.target.value)}
                        className="bg-gray-800 border-gray-700 text-white h-8 w-full text-sm mt-0"
                      />
                    ) : (
                      `$${Number(inv.profit).toFixed(2)}`
                    )}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">Duration</p>
                    <p className="text-gray-400">{new Date(inv.startAt).toLocaleDateString()} – {new Date(inv.endAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  {editingId === inv.id ? (
                    <select
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white rounded-md px-2 py-1 text-sm"
                    >
                      <option value="active">active</option>
                      <option value="completed">completed</option>
                      <option value="cancelled">cancelled</option>
                    </select>
                  ) : (
                    <div />
                  )}
                  <div className="flex gap-2">
                    {editingId === inv.id ? (
                      <>
                        <Button
                          size="sm"
                          className="bg-green-700 hover:bg-green-600 h-8 px-3"
                          onClick={() => handleSave(inv.id)}
                          disabled={updateMut.isPending}
                        >
                          <Check className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          size="sm"
                          className="bg-gray-700 hover:bg-gray-600 h-8 px-3"
                          onClick={() => setEditingId(null)}
                        >
                          ✕
                        </Button>
                      </>
                    ) : (
                      <Button
                        size="sm"
                        className="bg-blue-700 hover:bg-blue-600 h-8 px-4 text-xs"
                        onClick={() => handleEdit(inv)}
                      >
                        Edit
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {investments.length === 0 && (
              <div className="text-center py-12 text-gray-500">No investments found</div>
            )}
          </div>

          {/* Desktop table view */}
          <div className="hidden lg:block bg-gray-900 border border-gray-800 rounded-xl overflow-x-auto">
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="border-b border-gray-800 text-gray-400">
                  <th className="text-left px-4 py-3">User ID</th>
                  <th className="text-left px-4 py-3">Plan</th>
                  <th className="text-left px-4 py-3">Amount</th>
                  <th className="text-left px-4 py-3">ROI %</th>
                  <th className="text-left px-4 py-3">Profit</th>
                  <th className="text-left px-4 py-3">Status</th>
                  <th className="text-left px-4 py-3">Start</th>
                  <th className="text-left px-4 py-3">End</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {investments.map((inv: any) => (
                  <tr key={inv.id} className="border-b border-gray-800/50 hover:bg-gray-800/20 transition-colors">
                    <td className="px-4 py-3 text-gray-400 font-mono text-xs max-w-[100px] truncate">{inv.userId}</td>
                    <td className="px-4 py-3 text-white">{inv.plan?.name ?? "—"}</td>
                    <td className="px-4 py-3 text-white">${Number(inv.amount).toFixed(2)}</td>
                    <td className="px-4 py-3 text-white">{Number(inv.roiPercent).toFixed(1)}%</td>
                    <td className="px-4 py-3">
                      {editingId === inv.id ? (
                        <Input
                          type="number"
                          value={editProfit}
                          onChange={(e) => setEditProfit(e.target.value)}
                          className="bg-gray-800 border-gray-700 text-white h-8 w-24 text-sm"
                        />
                      ) : (
                        <span className="text-green-400">${Number(inv.profit).toFixed(2)}</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {editingId === inv.id ? (
                        <select
                          value={editStatus}
                          onChange={(e) => setEditStatus(e.target.value)}
                          className="bg-gray-800 border-gray-700 text-white rounded-md px-2 py-1 text-sm"
                        >
                          <option value="active">active</option>
                          <option value="completed">completed</option>
                          <option value="cancelled">cancelled</option>
                        </select>
                      ) : (
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs text-white ${inv.status === "active" ? "bg-green-600" : inv.status === "completed" ? "bg-blue-600" : "bg-gray-600"}`}>
                          {inv.status}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-400">{new Date(inv.startAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3 text-gray-400">{new Date(inv.endAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      {editingId === inv.id ? (
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            className="bg-green-700 hover:bg-green-600 h-7 px-2"
                            onClick={() => handleSave(inv.id)}
                            disabled={updateMut.isPending}
                          >
                            <Check className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            size="sm"
                            className="bg-gray-700 hover:bg-gray-600 h-7 px-2"
                            onClick={() => setEditingId(null)}
                          >
                            ✕
                          </Button>
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          className="bg-blue-700 hover:bg-blue-600 h-7 px-3 text-xs"
                          onClick={() => handleEdit(inv)}
                        >
                          Edit
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
                {investments.length === 0 && (
                  <tr><td colSpan={9} className="text-center py-12 text-gray-500">No investments found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
