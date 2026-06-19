import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "@/lib/adminApi";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Check } from "lucide-react";

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
    <div className="p-6 space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-white">Investments</h1>
        <p className="text-gray-400 text-sm mt-1">{investments.length} total investments</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-x-auto">
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
      )}
    </div>
  );
}
