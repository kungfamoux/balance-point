import { createFileRoute, useParams } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "@/lib/adminApi";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/users/$id")({
  component: AdminUserDetail,
});

function AdminUserDetail() {
  const { id } = useParams({ from: "/admin/users/$id" });
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "user", id],
    queryFn: () => adminApi.getUser(id),
  });
  const [balanceInput, setBalanceInput] = useState("");
  const [kycInput, setKycInput] = useState("");

  const balanceMut = useMutation({
    mutationFn: () => adminApi.updateBalance(id, Number(balanceInput)),
    onSuccess: () => { toast.success("Balance updated"); qc.invalidateQueries({ queryKey: ["admin", "user", id] }); },
    onError: (e: any) => toast.error(e.message),
  });
  const kycMut = useMutation({
    mutationFn: () => adminApi.updateKyc(id, kycInput),
    onSuccess: () => { toast.success("KYC updated"); qc.invalidateQueries({ queryKey: ["admin", "user", id] }); },
    onError: (e: any) => toast.error(e.message),
  });

  if (isLoading) return (
    <div className="flex items-center justify-center h-full">
      <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const { profile, wallet, investments, transactions } = data ?? {};

  return (
    <div className="p-6 space-y-6 max-w-4xl">
      <div className="flex items-center gap-3">
        <Link to="/admin/users" className="text-gray-400 hover:text-white">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">{profile?.fullName ?? "User"}</h1>
          <p className="text-gray-400 text-xs font-mono mt-0.5">{id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Profile */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 space-y-2">
          <h2 className="text-white font-semibold mb-3">Profile</h2>
          <Row label="Full Name" value={profile?.fullName ?? "—"} />
          <Row label="Country" value={profile?.country ?? "—"} />
          <Row label="Phone" value={profile?.phone ?? "—"} />
          <Row label="KYC Status" value={profile?.kycStatus} />
          <Row label="Referral Code" value={profile?.referralCode} />
          <Row label="Joined" value={new Date(profile?.createdAt).toLocaleDateString()} />
        </div>

        {/* Wallet */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 space-y-2">
          <h2 className="text-white font-semibold mb-3">Wallet</h2>
          <Row label="Balance" value={`$${Number(wallet?.balance ?? 0).toFixed(2)}`} />
          <Row label="Active Investment" value={`$${Number(wallet?.activeInvestment ?? 0).toFixed(2)}`} />
          <Row label="Total Profit" value={`$${Number(wallet?.totalProfit ?? 0).toFixed(2)}`} />
          <Row label="Referral Earnings" value={`$${Number(wallet?.referralEarnings ?? 0).toFixed(2)}`} />
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h2 className="text-white font-semibold mb-3">Adjust Balance</h2>
          <div className="flex gap-2">
            <Input
              type="number"
              value={balanceInput}
              onChange={(e) => setBalanceInput(e.target.value)}
              placeholder="New balance"
              className="bg-gray-800 border-gray-700 text-white"
            />
            <Button
              onClick={() => balanceMut.mutate()}
              disabled={balanceMut.isPending || !balanceInput}
              className="bg-blue-600 hover:bg-blue-700 shrink-0"
            >
              Set
            </Button>
          </div>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h2 className="text-white font-semibold mb-3">Update KYC</h2>
          <div className="flex gap-2">
            <select
              value={kycInput}
              onChange={(e) => setKycInput(e.target.value)}
              className="flex-1 bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-2 text-sm"
            >
              <option value="">Select status</option>
              <option value="verified">verified</option>
              <option value="unverified">unverified</option>
              <option value="rejected">rejected</option>
            </select>
            <Button
              onClick={() => kycMut.mutate()}
              disabled={kycMut.isPending || !kycInput}
              className="bg-blue-600 hover:bg-blue-700 shrink-0"
            >
              Update
            </Button>
          </div>
        </div>
      </div>

      {/* Transactions */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <h2 className="text-white font-semibold px-5 py-4 border-b border-gray-800">Transactions</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-400 border-b border-gray-800">
              <th className="text-left px-4 py-2">Type</th>
              <th className="text-left px-4 py-2">Amount</th>
              <th className="text-left px-4 py-2">Gateway</th>
              <th className="text-left px-4 py-2">Status</th>
              <th className="text-left px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {(transactions ?? []).map((t: any) => (
              <tr key={t.id} className="border-b border-gray-800/50">
                <td className="px-4 py-2 capitalize text-white">{t.type}</td>
                <td className="px-4 py-2 text-white">${Number(t.amount).toFixed(2)}</td>
                <td className="px-4 py-2 text-gray-400">{t.gateway ?? "—"}</td>
                <td className="px-4 py-2">
                  <StatusBadge status={t.status} />
                </td>
                <td className="px-4 py-2 text-gray-400">{new Date(t.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
            {!transactions?.length && (
              <tr><td colSpan={5} className="text-center py-8 text-gray-500">No transactions</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: any }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gray-400">{label}</span>
      <span className="text-white font-medium">{value ?? "—"}</span>
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
