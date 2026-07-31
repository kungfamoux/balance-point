import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "@/lib/adminApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Edit, Trash2, Plus } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { useState } from "react";

export const Route = createFileRoute("/admin/trades")({
  component: AdminTrades,
});

function AdminTrades() {
  const qc = useQueryClient();
  const [editingTrade, setEditingTrade] = useState<any>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const { data: trades = [], isLoading } = useQuery({
    queryKey: ["admin", "trades"],
    queryFn: () => adminApi.getTrades(),
  });

  const updateMut = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => adminApi.updateTrade(id, data),
    onSuccess: () => {
      toast.success("Trade updated successfully");
      qc.invalidateQueries({ queryKey: ["admin", "trades"] });
      setEditingTrade(null);
    },
    onError: (e: any) => toast.error(e.message),
  });

  const deleteMut = useMutation({
    mutationFn: (id: string) => adminApi.deleteTrade(id),
    onSuccess: () => {
      toast.success("Trade deleted successfully");
      qc.invalidateQueries({ queryKey: ["admin", "trades"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  const createMut = useMutation({
    mutationFn: (data: any) => adminApi.createTrade(data),
    onSuccess: () => {
      toast.success("Trade created successfully");
      qc.invalidateQueries({ queryKey: ["admin", "trades"] });
      setIsCreateDialogOpen(false);
    },
    onError: (e: any) => toast.error(e.message),
  });

  function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!editingTrade) return;
    updateMut.mutate({
      id: editingTrade.id,
      data: {
        type: editingTrade.type,
        symbol: editingTrade.symbol,
        amount: Number(editingTrade.amount),
        entryPrice: Number(editingTrade.entryPrice),
        exitPrice: editingTrade.exitPrice ? Number(editingTrade.exitPrice) : null,
        leverage: Number(editingTrade.leverage),
        profitLoss: editingTrade.profitLoss ? Number(editingTrade.profitLoss) : null,
        status: editingTrade.status,
      },
    });
  }

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    createMut.mutate({
      userId: formData.get("userId") as string,
      type: formData.get("type") as string,
      symbol: formData.get("symbol") as string,
      amount: Number(formData.get("amount")),
      entryPrice: Number(formData.get("entryPrice")),
      exitPrice: formData.get("exitPrice") ? Number(formData.get("exitPrice")) : null,
      leverage: Number(formData.get("leverage")) || 1,
      profitLoss: formData.get("profitLoss") ? Number(formData.get("profitLoss")) : null,
      status: (formData.get("status") as string) || "open",
    });
  }

  return (
    <div className="space-y-4">
      <AdminPageHeader
        title="Trades"
        description={`${trades.length} results`}
        actions={
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Trade
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Trade</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <Label>User ID</Label>
                  <Input name="userId" required className="mt-2" placeholder="Enter user ID" />
                </div>
                <div>
                  <Label>Type</Label>
                  <select name="type" required className="w-full mt-2 rounded-md border border-input bg-background px-3 py-2">
                    <option value="buy">Buy</option>
                    <option value="sell">Sell</option>
                  </select>
                </div>
                <div>
                  <Label>Symbol</Label>
                  <Input name="symbol" required className="mt-2" placeholder="BTCUSD" />
                </div>
                <div>
                  <Label>Amount (USD)</Label>
                  <Input name="amount" type="number" required className="mt-2" placeholder="100" />
                </div>
                <div>
                  <Label>Entry Price</Label>
                  <Input name="entryPrice" type="number" required className="mt-2" placeholder="65000" />
                </div>
                <div>
                  <Label>Exit Price (optional)</Label>
                  <Input name="exitPrice" type="number" className="mt-2" placeholder="66000" />
                </div>
                <div>
                  <Label>Leverage</Label>
                  <Input name="leverage" type="number" defaultValue="1" className="mt-2" />
                </div>
                <div>
                  <Label>Profit/Loss (optional)</Label>
                  <Input name="profitLoss" type="number" className="mt-2" placeholder="1000" />
                </div>
                <div>
                  <Label>Status</Label>
                  <select name="status" className="w-full mt-2 rounded-md border border-input bg-background px-3 py-2">
                    <option value="open">Open</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
                <Button type="submit" className="w-full">Create Trade</Button>
              </form>
            </DialogContent>
          </Dialog>
        }
      />

      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <Card className="border-gray-800">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-800 text-gray-400">
                    <th className="text-left px-4 py-3">User ID</th>
                    <th className="text-left px-4 py-3">Type</th>
                    <th className="text-left px-4 py-3">Symbol</th>
                    <th className="text-left px-4 py-3">Amount</th>
                    <th className="text-left px-4 py-3">Entry Price</th>
                    <th className="text-left px-4 py-3">Exit Price</th>
                    <th className="text-left px-4 py-3">P/L</th>
                    <th className="text-left px-4 py-3">Status</th>
                    <th className="text-left px-4 py-3">Date</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {trades.map((t: any) => (
                    <tr key={t.id} className="border-b border-gray-800/50 hover:bg-gray-800/20">
                      <td className="px-4 py-3 text-gray-400 font-mono text-xs max-w-[120px] truncate">{t.userId}</td>
                      <td className="px-4 py-3 capitalize text-white">{t.type}</td>
                      <td className="px-4 py-3 text-white font-medium">{t.symbol}</td>
                      <td className="px-4 py-3 text-white">${Number(t.amount).toLocaleString()}</td>
                      <td className="px-4 py-3 text-gray-400">${Number(t.entryPrice).toLocaleString()}</td>
                      <td className="px-4 py-3 text-gray-400">{t.exitPrice ? `$${Number(t.exitPrice).toLocaleString()}` : "-"}</td>
                      <td className={`px-4 py-3 font-medium ${Number(t.profitLoss) >= 0 ? "text-green-500" : "text-red-500"}`}>
                        {Number(t.profitLoss) >= 0 ? "+" : ""}${Number(t.profitLoss).toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${t.status === "closed" ? "bg-green-600" : "bg-yellow-600"}`}>
                          {t.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-400">{new Date(t.createdAt).toLocaleDateString()}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline" onClick={() => setEditingTrade(t)}>
                                <Edit className="h-3 w-3" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Edit Trade</DialogTitle>
                              </DialogHeader>
                              <form onSubmit={handleUpdate} className="space-y-4">
                                <div>
                                  <Label>Type</Label>
                                  <select
                                    value={editingTrade?.type}
                                    onChange={(e) => setEditingTrade({ ...editingTrade, type: e.target.value })}
                                    className="w-full mt-2 rounded-md border border-input bg-background px-3 py-2"
                                  >
                                    <option value="buy">Buy</option>
                                    <option value="sell">Sell</option>
                                  </select>
                                </div>
                                <div>
                                  <Label>Symbol</Label>
                                  <Input
                                    value={editingTrade?.symbol}
                                    onChange={(e) => setEditingTrade({ ...editingTrade, symbol: e.target.value })}
                                    className="mt-2"
                                  />
                                </div>
                                <div>
                                  <Label>Amount (USD)</Label>
                                  <Input
                                    type="number"
                                    value={editingTrade?.amount}
                                    onChange={(e) => setEditingTrade({ ...editingTrade, amount: e.target.value })}
                                    className="mt-2"
                                  />
                                </div>
                                <div>
                                  <Label>Entry Price</Label>
                                  <Input
                                    type="number"
                                    value={editingTrade?.entryPrice}
                                    onChange={(e) => setEditingTrade({ ...editingTrade, entryPrice: e.target.value })}
                                    className="mt-2"
                                  />
                                </div>
                                <div>
                                  <Label>Exit Price</Label>
                                  <Input
                                    type="number"
                                    value={editingTrade?.exitPrice || ""}
                                    onChange={(e) => setEditingTrade({ ...editingTrade, exitPrice: e.target.value })}
                                    className="mt-2"
                                  />
                                </div>
                                <div>
                                  <Label>Leverage</Label>
                                  <Input
                                    type="number"
                                    value={editingTrade?.leverage}
                                    onChange={(e) => setEditingTrade({ ...editingTrade, leverage: e.target.value })}
                                    className="mt-2"
                                  />
                                </div>
                                <div>
                                  <Label>Profit/Loss</Label>
                                  <Input
                                    type="number"
                                    value={editingTrade?.profitLoss || ""}
                                    onChange={(e) => setEditingTrade({ ...editingTrade, profitLoss: e.target.value })}
                                    className="mt-2"
                                  />
                                </div>
                                <div>
                                  <Label>Status</Label>
                                  <select
                                    value={editingTrade?.status}
                                    onChange={(e) => setEditingTrade({ ...editingTrade, status: e.target.value })}
                                    className="w-full mt-2 rounded-md border border-input bg-background px-3 py-2"
                                  >
                                    <option value="open">Open</option>
                                    <option value="closed">Closed</option>
                                  </select>
                                </div>
                                <Button type="submit" className="w-full">Update Trade</Button>
                              </form>
                            </DialogContent>
                          </Dialog>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => deleteMut.mutate(t.id)}
                            disabled={deleteMut.isPending}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {trades.length === 0 && (
                    <tr>
                      <td colSpan={10} className="text-center py-12 text-gray-500">No trades found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
