import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "@/lib/adminApi";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export const Route = createFileRoute("/admin/ledger")({
  component: AdminLedger,
});

const EMPTY = { kind: "deposit", gateway: "BTC", name: "", amount: "", hoursAgo: "", sortOrder: "0" };

function AdminLedger() {
  const qc = useQueryClient();
  const { data: entries = [], isLoading } = useQuery({
    queryKey: ["admin", "ledger"],
    queryFn: adminApi.getLedger,
  });
  const [form, setForm] = useState<typeof EMPTY | null>(null);
  const [editId, setEditId] = useState<string | null>(null);

  const createMut = useMutation({
    mutationFn: (body: object) => adminApi.createLedgerEntry(body),
    onSuccess: () => { toast.success("Entry created"); qc.invalidateQueries({ queryKey: ["admin", "ledger"] }); setForm(null); },
    onError: (e: any) => toast.error(e.message),
  });
  const updateMut = useMutation({
    mutationFn: ({ id, body }: { id: string; body: object }) => adminApi.updateLedgerEntry(id, body),
    onSuccess: () => { toast.success("Entry updated"); qc.invalidateQueries({ queryKey: ["admin", "ledger"] }); setForm(null); setEditId(null); },
    onError: (e: any) => toast.error(e.message),
  });
  const deleteMut = useMutation({
    mutationFn: (id: string) => adminApi.deleteLedgerEntry(id),
    onSuccess: () => { toast.success("Entry deleted"); qc.invalidateQueries({ queryKey: ["admin", "ledger"] }); },
    onError: (e: any) => toast.error(e.message),
  });

  function openEdit(entry: any) {
    setEditId(entry.id);
    setForm({ kind: entry.kind, gateway: entry.gateway, name: entry.name, amount: entry.amount, hoursAgo: entry.hoursAgo, sortOrder: entry.sortOrder });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    const body = { ...form, amount: Number(form.amount), hoursAgo: Number(form.hoursAgo), sortOrder: Number(form.sortOrder) };
    if (editId) updateMut.mutate({ id: editId, body });
    else createMut.mutate(body);
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Public Ledger"
        description="Manage visible transaction feed on homepage"
        actions={
          <Button onClick={() => { setEditId(null); setForm(EMPTY); }} className="bg-blue-600 hover:bg-blue-700 gap-2">
            <Plus className="w-4 h-4" /> Add Entry
          </Button>
        }
      />

      {form && (
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-semibold">{editId ? "Edit Entry" : "New Entry"}</h2>
            <button onClick={() => { setForm(null); setEditId(null); }} className="text-gray-400 hover:text-white"><X className="w-4 h-4" /></button>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-300 text-sm">Kind</Label>
              <select
                value={form.kind}
                onChange={(e) => setForm((f) => f ? { ...f, kind: e.target.value } : f)}
                className="mt-1 w-full bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-2 text-sm"
              >
                <option value="deposit">deposit</option>
                <option value="withdrawal">withdrawal</option>
                <option value="profit">profit</option>
              </select>
            </div>
            <div>
              <Label className="text-gray-300 text-sm">Gateway</Label>
              <Input value={form.gateway} onChange={(e) => setForm((f) => f ? { ...f, gateway: e.target.value } : f)} className="mt-1 bg-gray-800 border-gray-700 text-white" placeholder="BTC" />
            </div>
            <div>
              <Label className="text-gray-300 text-sm">Name</Label>
              <Input value={form.name} onChange={(e) => setForm((f) => f ? { ...f, name: e.target.value } : f)} className="mt-1 bg-gray-800 border-gray-700 text-white" placeholder="J*** D***" />
            </div>
            <div>
              <Label className="text-gray-300 text-sm">Amount ($)</Label>
              <Input type="number" step="0.01" value={form.amount} onChange={(e) => setForm((f) => f ? { ...f, amount: e.target.value } : f)} className="mt-1 bg-gray-800 border-gray-700 text-white" />
            </div>
            <div>
              <Label className="text-gray-300 text-sm">Hours Ago</Label>
              <Input type="number" value={form.hoursAgo} onChange={(e) => setForm((f) => f ? { ...f, hoursAgo: e.target.value } : f)} className="mt-1 bg-gray-800 border-gray-700 text-white" />
            </div>
            <div>
              <Label className="text-gray-300 text-sm">Sort Order</Label>
              <Input type="number" value={form.sortOrder} onChange={(e) => setForm((f) => f ? { ...f, sortOrder: e.target.value } : f)} className="mt-1 bg-gray-800 border-gray-700 text-white" />
            </div>
            <div className="col-span-1 sm:col-span-2 flex gap-2 justify-end pt-2">
              <Button type="button" variant="outline" onClick={() => { setForm(null); setEditId(null); }} className="border-gray-700 text-gray-300">Cancel</Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={createMut.isPending || updateMut.isPending}>
                {editId ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          {/* Mobile card view */}
          <div className="lg:hidden space-y-3">
            {entries.map((e: any) => (
              <div key={e.id} className="bg-gray-900 border border-gray-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium capitalize">{e.kind}</p>
                    <p className="text-gray-400 text-xs">{e.gateway}</p>
                  </div>
                  <p className="text-white font-medium">${Number(e.amount).toFixed(2)}</p>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <p className="text-gray-400 text-xs">Name</p>
                    <p className="text-gray-300">{e.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">Hours Ago</p>
                    <p className="text-gray-400">{e.hoursAgo}h</p>
                  </div>
                </div>
                <div className="flex gap-2 justify-end">
                  <Button size="sm" variant="outline" className="border-gray-700 text-gray-300 h-8 px-3" onClick={() => openEdit(e)}>
                    <Pencil className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    size="sm"
                    className="bg-red-700 hover:bg-red-600 h-8 px-3"
                    onClick={() => { if (confirm("Delete entry?")) deleteMut.mutate(e.id); }}
                    disabled={deleteMut.isPending}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            ))}
            {entries.length === 0 && (
              <div className="text-center py-12 text-gray-500">No ledger entries</div>
            )}
          </div>

          {/* Desktop table view */}
          <div className="hidden lg:block bg-gray-900 border border-gray-800 rounded-xl overflow-x-auto">
            <table className="w-full text-sm min-w-[500px]">
              <thead>
                <tr className="border-b border-gray-800 text-gray-400">
                  <th className="text-left px-4 py-3">Kind</th>
                  <th className="text-left px-4 py-3">Gateway</th>
                  <th className="text-left px-4 py-3">Name</th>
                  <th className="text-left px-4 py-3">Amount</th>
                  <th className="text-left px-4 py-3">Hours Ago</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {entries.map((e: any) => (
                  <tr key={e.id} className="border-b border-gray-800/50 hover:bg-gray-800/20 transition-colors">
                    <td className="px-4 py-3 capitalize text-white">{e.kind}</td>
                    <td className="px-4 py-3 text-gray-300">{e.gateway}</td>
                    <td className="px-4 py-3 text-gray-300">{e.name}</td>
                    <td className="px-4 py-3 text-white">${Number(e.amount).toFixed(2)}</td>
                    <td className="px-4 py-3 text-gray-400">{e.hoursAgo}h</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1.5 justify-end">
                        <Button size="sm" variant="outline" className="border-gray-700 text-gray-300 h-7 w-7 p-0" onClick={() => openEdit(e)}>
                          <Pencil className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          size="sm"
                          className="bg-red-700 hover:bg-red-600 h-7 w-7 p-0"
                          onClick={() => { if (confirm("Delete entry?")) deleteMut.mutate(e.id); }}
                          disabled={deleteMut.isPending}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {entries.length === 0 && (
                  <tr><td colSpan={6} className="text-center py-12 text-gray-500">No ledger entries</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
