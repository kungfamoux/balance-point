import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "@/lib/adminApi";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, X } from "lucide-react";

export const Route = createFileRoute("/admin/plans")({
  component: AdminPlans,
});

const EMPTY = {
  slug: "", name: "", tagline: "",
  minDeposit: "", maxDeposit: "",
  roiPercent: "", referralPercent: "5",
  durationDays: "", sortOrder: "0",
};

function AdminPlans() {
  const qc = useQueryClient();
  const { data: plans = [], isLoading } = useQuery({
    queryKey: ["admin", "plans"],
    queryFn: adminApi.getPlans,
  });
  const [form, setForm] = useState<typeof EMPTY | null>(null);
  const [editId, setEditId] = useState<string | null>(null);

  const createMut = useMutation({
    mutationFn: (body: object) => adminApi.createPlan(body),
    onSuccess: () => { toast.success("Plan created"); qc.invalidateQueries({ queryKey: ["admin", "plans"] }); setForm(null); },
    onError: (e: any) => toast.error(e.message),
  });
  const updateMut = useMutation({
    mutationFn: ({ id, body }: { id: string; body: object }) => adminApi.updatePlan(id, body),
    onSuccess: () => { toast.success("Plan updated"); qc.invalidateQueries({ queryKey: ["admin", "plans"] }); setForm(null); setEditId(null); },
    onError: (e: any) => toast.error(e.message),
  });
  const deleteMut = useMutation({
    mutationFn: (id: string) => adminApi.deletePlan(id),
    onSuccess: () => { toast.success("Plan deleted"); qc.invalidateQueries({ queryKey: ["admin", "plans"] }); },
    onError: (e: any) => toast.error(e.message),
  });

  function openEdit(plan: any) {
    setEditId(plan.id);
    setForm({
      slug: plan.slug, name: plan.name, tagline: plan.tagline ?? "",
      minDeposit: plan.minDeposit, maxDeposit: plan.maxDeposit,
      roiPercent: plan.roiPercent, referralPercent: plan.referralPercent,
      durationDays: plan.durationDays, sortOrder: plan.sortOrder,
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    const body = {
      ...form,
      minDeposit: Number(form.minDeposit),
      maxDeposit: Number(form.maxDeposit),
      roiPercent: Number(form.roiPercent),
      referralPercent: Number(form.referralPercent),
      durationDays: Number(form.durationDays),
      sortOrder: Number(form.sortOrder),
    };
    if (editId) updateMut.mutate({ id: editId, body });
    else createMut.mutate(body);
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Investment Plans</h1>
          <p className="text-gray-400 text-sm mt-1">{plans.length} plans</p>
        </div>
        <Button onClick={() => { setEditId(null); setForm(EMPTY); }} className="bg-blue-600 hover:bg-blue-700 gap-2">
          <Plus className="w-4 h-4" /> New Plan
        </Button>
      </div>

      {form && (
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-semibold">{editId ? "Edit Plan" : "Create Plan"}</h2>
            <button onClick={() => { setForm(null); setEditId(null); }} className="text-gray-400 hover:text-white"><X className="w-4 h-4" /></button>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            {[
              ["slug", "Slug", "text"],
              ["name", "Name", "text"],
              ["tagline", "Tagline", "text"],
              ["minDeposit", "Min Deposit ($)", "number"],
              ["maxDeposit", "Max Deposit ($)", "number"],
              ["roiPercent", "ROI %", "number"],
              ["referralPercent", "Referral %", "number"],
              ["durationDays", "Duration (days)", "number"],
              ["sortOrder", "Sort Order", "number"],
            ].map(([key, label, type]) => (
              <div key={key as string}>
                <Label className="text-gray-300 text-sm">{label as string}</Label>
                <Input
                  type={type as string}
                  value={(form as any)[key as string]}
                  onChange={(e) => setForm((f) => f ? { ...f, [key as string]: e.target.value } : f)}
                  className="mt-1 bg-gray-800 border-gray-700 text-white"
                  step={type === "number" ? "0.01" : undefined}
                />
              </div>
            ))}
            <div className="col-span-2 flex gap-2 justify-end pt-2">
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
        <div className="grid gap-4">
          {plans.map((plan: any) => (
            <div key={plan.id} className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex items-center justify-between gap-4">
              <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div>
                  <p className="text-gray-400 text-xs">Name</p>
                  <p className="text-white font-medium">{plan.name}</p>
                  <p className="text-gray-500 text-xs">{plan.tagline}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Deposit Range</p>
                  <p className="text-white">${Number(plan.minDeposit).toLocaleString()} – ${Number(plan.maxDeposit).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">ROI / Duration</p>
                  <p className="text-white">{Number(plan.roiPercent).toFixed(1)}% · {plan.durationDays}d</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Referral</p>
                  <p className="text-white">{Number(plan.referralPercent).toFixed(1)}%</p>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button size="sm" variant="outline" className="border-gray-700 text-gray-300 h-8" onClick={() => openEdit(plan)}>
                  <Pencil className="w-3.5 h-3.5" />
                </Button>
                <Button
                  size="sm"
                  className="bg-red-700 hover:bg-red-600 h-8"
                  onClick={() => { if (confirm("Delete this plan?")) deleteMut.mutate(plan.id); }}
                  disabled={deleteMut.isPending}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          ))}
          {plans.length === 0 && <p className="text-center text-gray-500 py-12">No plans yet</p>}
        </div>
      )}
    </div>
  );
}
