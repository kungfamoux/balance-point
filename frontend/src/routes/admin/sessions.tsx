import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "@/lib/adminApi";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, X, Radio } from "lucide-react";

export const Route = createFileRoute("/admin/sessions")({
  component: AdminSessions,
});

const EMPTY = {
  title: "", host: "", role: "", avatarLabel: "", topic: "",
  status: "upcoming", scheduledAt: "", duration: "60 min",
  embedUrl: "", tags: "", premium: false, sortOrder: "0",
};

function AdminSessions() {
  const qc = useQueryClient();
  const { data: sessions = [], isLoading } = useQuery({
    queryKey: ["admin", "sessions"],
    queryFn: adminApi.getSessions,
  });
  const [form, setForm] = useState<typeof EMPTY | null>(null);
  const [editId, setEditId] = useState<string | null>(null);

  const createMut = useMutation({
    mutationFn: (body: object) => adminApi.createSession(body),
    onSuccess: () => { toast.success("Session created"); qc.invalidateQueries({ queryKey: ["admin", "sessions"] }); setForm(null); },
    onError: (e: any) => toast.error(e.message),
  });
  const updateMut = useMutation({
    mutationFn: ({ id, body }: { id: string; body: object }) => adminApi.updateSession(id, body),
    onSuccess: () => { toast.success("Session updated"); qc.invalidateQueries({ queryKey: ["admin", "sessions"] }); setForm(null); setEditId(null); },
    onError: (e: any) => toast.error(e.message),
  });
  const deleteMut = useMutation({
    mutationFn: (id: string) => adminApi.deleteSession(id),
    onSuccess: () => { toast.success("Session deleted"); qc.invalidateQueries({ queryKey: ["admin", "sessions"] }); },
    onError: (e: any) => toast.error(e.message),
  });

  function openEdit(s: any) {
    setEditId(s.id);
    setForm({
      title: s.title, host: s.host, role: s.role, avatarLabel: s.avatarLabel,
      topic: s.topic, status: s.status,
      scheduledAt: new Date(s.scheduledAt).toISOString().slice(0, 16),
      duration: s.duration, embedUrl: s.embedUrl ?? "",
      tags: (s.tags ?? []).join(", "), premium: s.premium, sortOrder: String(s.sortOrder),
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    const body = {
      ...form,
      tags: form.tags.split(",").map((t: string) => t.trim()).filter(Boolean),
      sortOrder: Number(form.sortOrder),
      premium: Boolean(form.premium),
    };
    if (editId) updateMut.mutate({ id: editId, body });
    else createMut.mutate(body);
  }

  const statusColor: Record<string, string> = {
    live: "bg-red-600", upcoming: "bg-blue-600", completed: "bg-gray-500",
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Live Sessions</h1>
          <p className="text-gray-400 text-sm mt-1">{sessions.length} sessions</p>
        </div>
        <Button onClick={() => { setEditId(null); setForm(EMPTY); }} className="bg-blue-600 hover:bg-blue-700 gap-2">
          <Plus className="w-4 h-4" /> New Session
        </Button>
      </div>

      {form && (
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-semibold">{editId ? "Edit Session" : "Create Session"}</h2>
            <button onClick={() => { setForm(null); setEditId(null); }} className="text-gray-400 hover:text-white"><X className="w-4 h-4" /></button>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="col-span-1 sm:col-span-2">
              <Label className="text-gray-300 text-sm">Title</Label>
              <Input value={form.title} onChange={(e) => setForm((f) => f ? { ...f, title: e.target.value } : f)} className="mt-1 bg-gray-800 border-gray-700 text-white" required />
            </div>
            <div>
              <Label className="text-gray-300 text-sm">Host Name</Label>
              <Input value={form.host} onChange={(e) => setForm((f) => f ? { ...f, host: e.target.value } : f)} className="mt-1 bg-gray-800 border-gray-700 text-white" required />
            </div>
            <div>
              <Label className="text-gray-300 text-sm">Host Role</Label>
              <Input value={form.role} onChange={(e) => setForm((f) => f ? { ...f, role: e.target.value } : f)} className="mt-1 bg-gray-800 border-gray-700 text-white" placeholder="e.g. Senior Analyst" />
            </div>
            <div>
              <Label className="text-gray-300 text-sm">Avatar Label (2 letters)</Label>
              <Input value={form.avatarLabel} onChange={(e) => setForm((f) => f ? { ...f, avatarLabel: e.target.value.toUpperCase().slice(0, 2) } : f)} className="mt-1 bg-gray-800 border-gray-700 text-white" maxLength={2} placeholder="JW" />
            </div>
            <div>
              <Label className="text-gray-300 text-sm">Status</Label>
              <select value={form.status} onChange={(e) => setForm((f) => f ? { ...f, status: e.target.value } : f)}
                className="mt-1 w-full bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-2 text-sm">
                <option value="upcoming">Upcoming</option>
                <option value="live">Live</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div>
              <Label className="text-gray-300 text-sm">Scheduled At</Label>
              <Input type="datetime-local" value={form.scheduledAt} onChange={(e) => setForm((f) => f ? { ...f, scheduledAt: e.target.value } : f)} className="mt-1 bg-gray-800 border-gray-700 text-white" required />
            </div>
            <div>
              <Label className="text-gray-300 text-sm">Duration</Label>
              <Input value={form.duration} onChange={(e) => setForm((f) => f ? { ...f, duration: e.target.value } : f)} className="mt-1 bg-gray-800 border-gray-700 text-white" placeholder="60 min" />
            </div>
            <div className="col-span-1 sm:col-span-2">
              <Label className="text-gray-300 text-sm">Topic / Description</Label>
              <textarea value={form.topic} onChange={(e) => setForm((f) => f ? { ...f, topic: e.target.value } : f)}
                className="mt-1 w-full bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-2 text-sm min-h-[80px] resize-y" />
            </div>
            <div className="col-span-1 sm:col-span-2">
              <Label className="text-gray-300 text-sm">
                Embed URL
                <span className="ml-2 text-xs text-gray-500 font-normal">YouTube: https://www.youtube.com/embed/VIDEO_ID — for live use ?autoplay=1</span>
              </Label>
              <Input value={form.embedUrl} onChange={(e) => setForm((f) => f ? { ...f, embedUrl: e.target.value } : f)} className="mt-1 bg-gray-800 border-gray-700 text-white" placeholder="https://www.youtube.com/embed/..." />
            </div>
            <div>
              <Label className="text-gray-300 text-sm">Tags (comma-separated)</Label>
              <Input value={form.tags} onChange={(e) => setForm((f) => f ? { ...f, tags: e.target.value } : f)} className="mt-1 bg-gray-800 border-gray-700 text-white" placeholder="BTC, Crypto, Analysis" />
            </div>
            <div>
              <Label className="text-gray-300 text-sm">Sort Order</Label>
              <Input type="number" value={form.sortOrder} onChange={(e) => setForm((f) => f ? { ...f, sortOrder: e.target.value } : f)} className="mt-1 bg-gray-800 border-gray-700 text-white" />
            </div>
            <div className="col-span-1 sm:col-span-2 flex items-center gap-3">
              <input type="checkbox" id="premium" checked={form.premium} onChange={(e) => setForm((f) => f ? { ...f, premium: e.target.checked } : f)} className="h-4 w-4" />
              <Label htmlFor="premium" className="text-gray-300 text-sm cursor-pointer">Premium session (lock icon shown)</Label>
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
        <div className="space-y-3">
          {sessions.map((s: any) => (
            <div key={s.id} className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs text-white ${statusColor[s.status] ?? "bg-gray-600"}`}>
                    {s.status === "live" && <Radio className="w-3 h-3" />} {s.status}
                  </span>
                  {s.premium && <span className="inline-block px-2 py-0.5 rounded-full text-xs bg-yellow-600 text-white">Premium</span>}
                </div>
                <p className="text-white font-medium truncate">{s.title}</p>
                <p className="text-gray-400 text-xs mt-0.5">
                  {s.host} · {new Date(s.scheduledAt).toLocaleString()} · {s.duration}
                </p>
                {s.tags?.length > 0 && (
                  <p className="text-gray-500 text-xs mt-0.5">{s.tags.join(", ")}</p>
                )}
              </div>
              <div className="flex gap-2 shrink-0 sm:flex-row flex-row-reverse">
                <Button
                  size="sm"
                  className="bg-red-700 hover:bg-red-600 h-8"
                  onClick={() => { if (confirm("Delete session?")) deleteMut.mutate(s.id); }}
                  disabled={deleteMut.isPending}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
                <Button size="sm" variant="outline" className="border-gray-700 text-gray-300 h-8" onClick={() => openEdit(s)}>
                  <Pencil className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          ))}
          {sessions.length === 0 && <p className="text-center text-gray-500 py-12">No sessions yet. Click "New Session" to add one.</p>}
        </div>
      )}
    </div>
  );
}
