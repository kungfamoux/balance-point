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
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin", "user", id],
    queryFn: () => adminApi.getUser(id),
  });
  const [balanceInput, setBalanceInput] = useState("");
  const [depositInput, setDepositInput] = useState("");
  const [profitInput, setProfitInput] = useState("");
  const [kycInput, setKycInput] = useState("");
  const [editingInvestment, setEditingInvestment] = useState<string | null>(null);
  const [invProfitInput, setInvProfitInput] = useState("");
  const [invAmountInput, setInvAmountInput] = useState("");
  const [planAssignPlanId, setPlanAssignPlanId] = useState("");
  const [planAssignAmount, setPlanAssignAmount] = useState("");

  const { data: plans } = useQuery({
    queryKey: ["admin", "plans"],
    queryFn: adminApi.getPlans,
  });

  const { data: planAssignments } = useQuery({
    queryKey: ["admin", "user", id, "plan-assignments"],
    queryFn: () => adminApi.getUserPlanAssignments(id),
  });

  const balanceMut = useMutation({
    mutationFn: () => adminApi.updateBalance(id, Number(balanceInput)),
    onSuccess: () => { toast.success("Balance updated"); qc.invalidateQueries({ queryKey: ["admin", "user", id] }); },
    onError: (e: any) => toast.error(e.message),
  });
  const depositMut = useMutation({
    mutationFn: () => adminApi.depositToWallet(id, Number(depositInput)),
    onSuccess: () => { toast.success("Deposit successful"); setDepositInput(""); qc.invalidateQueries({ queryKey: ["admin", "user", id] }); },
    onError: (e: any) => toast.error(e.message),
  });
  const profitMut = useMutation({
    mutationFn: () => adminApi.updateProfit(id, Number(profitInput)),
    onSuccess: () => { toast.success("Profit updated"); setProfitInput(""); qc.invalidateQueries({ queryKey: ["admin", "user", id] }); },
    onError: (e: any) => toast.error(e.message),
  });
  const kycMut = useMutation({
    mutationFn: () => adminApi.updateKyc(id, kycInput),
    onSuccess: () => { toast.success("KYC updated"); qc.invalidateQueries({ queryKey: ["admin", "user", id] }); },
    onError: (e: any) => toast.error(e.message),
  });
  const investmentMut = useMutation({
    mutationFn: (invId: string) => adminApi.updateInvestment(invId, {
      profit: invProfitInput ? Number(invProfitInput) : undefined,
      amount: invAmountInput ? Number(invAmountInput) : undefined,
    }),
    onSuccess: () => {
      toast.success("Investment updated");
      setEditingInvestment(null);
      setInvProfitInput("");
      setInvAmountInput("");
      qc.invalidateQueries({ queryKey: ["admin", "user", id] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  const planAssignMut = useMutation({
    mutationFn: () => adminApi.assignUserToPlan(id, {
      planId: planAssignPlanId,
      amount: Number(planAssignAmount),
    }),
    onSuccess: () => {
      toast.success("Plan assigned successfully");
      setPlanAssignPlanId("");
      setPlanAssignAmount("");
      qc.invalidateQueries({ queryKey: ["admin", "user", id, "plan-assignments"] });
      qc.invalidateQueries({ queryKey: ["admin", "user", id] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  const deletePlanAssignmentMut = useMutation({
    mutationFn: (assignmentId: string) => adminApi.deletePlanAssignment(assignmentId),
    onSuccess: () => {
      toast.success("Plan assignment deleted");
      qc.invalidateQueries({ queryKey: ["admin", "user", id, "plan-assignments"] });
      qc.invalidateQueries({ queryKey: ["admin", "user", id] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  if (isLoading) return (
    <div className="flex items-center justify-center h-full">
      <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-red-400">Failed to load user data: {(error as any).message}</div>
      </div>
    );
  }

  const { profile, wallet, investments, transactions } = data ?? {};

  return (
    <div className="space-y-6 max-w-4xl">
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
          <Row label="Email" value={profile?.email ?? "—"} />
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
          <h2 className="text-white font-semibold mb-3">Deposit to Wallet</h2>
          <div className="flex gap-2">
            <Input
              type="number"
              value={depositInput}
              onChange={(e) => setDepositInput(e.target.value)}
              placeholder="Amount to add"
              className="bg-gray-800 border-gray-700 text-white"
            />
            <Button
              onClick={() => depositMut.mutate()}
              disabled={depositMut.isPending || !depositInput}
              className="bg-green-600 hover:bg-green-700 shrink-0"
            >
              Add
            </Button>
          </div>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h2 className="text-white font-semibold mb-3">Adjust Profit</h2>
          <div className="flex gap-2">
            <Input
              type="number"
              value={profitInput}
              onChange={(e) => setProfitInput(e.target.value)}
              placeholder="New profit"
              className="bg-gray-800 border-gray-700 text-white"
            />
            <Button
              onClick={() => profitMut.mutate()}
              disabled={profitMut.isPending || !profitInput}
              className="bg-purple-600 hover:bg-purple-700 shrink-0"
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
        {/* Mobile card view */}
        <div className="lg:hidden space-y-3 p-4">
          {(transactions ?? []).map((t: any) => (
            <div key={t.id} className="bg-gray-800 border border-gray-700 rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-white font-medium capitalize">{t.type}</span>
                <StatusBadge status={t.status} />
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-gray-400 text-xs">Amount</p>
                  <p className="text-white">${Number(t.amount).toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Gateway</p>
                  <p className="text-gray-300">{t.gateway ?? "—"}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-400 text-xs">Date</p>
                  <p className="text-gray-300">{new Date(t.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          ))}
          {!transactions?.length && (
            <div className="text-center py-8 text-gray-500">No transactions</div>
          )}
        </div>
        {/* Desktop table view */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-sm min-w-[500px]">
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

      {/* Investments */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <h2 className="text-white font-semibold px-5 py-4 border-b border-gray-800">Investments</h2>
        {/* Mobile card view */}
        <div className="lg:hidden space-y-3 p-4">
          {(investments ?? []).map((inv: any) => (
            <div key={inv.id} className="bg-gray-800 border border-gray-700 rounded-lg p-3 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">{inv.plan?.name || "—"}</span>
                <StatusBadge status={inv.status} />
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-gray-400 text-xs">Amount</p>
                  <p className="text-white">${Number(inv.amount).toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">ROI</p>
                  <p className="text-white">{inv.roiPercent}%</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Profit</p>
                  <p className="text-white">${Number(inv.profit).toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">End Date</p>
                  <p className="text-gray-300">{new Date(inv.endAt).toLocaleDateString()}</p>
                </div>
              </div>
              <Button
                size="sm"
                onClick={() => {
                  setEditingInvestment(inv.id);
                  setInvProfitInput(inv.profit.toString());
                  setInvAmountInput(inv.amount.toString());
                }}
                className="w-full"
              >
                Edit
              </Button>
            </div>
          ))}
          {!investments?.length && (
            <div className="text-center py-8 text-gray-500">No investments</div>
          )}
        </div>
        {/* Desktop table view */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr className="text-gray-400 border-b border-gray-800">
                <th className="text-left px-4 py-2">Plan</th>
                <th className="text-left px-4 py-2">Amount</th>
                <th className="text-left px-4 py-2">Profit</th>
                <th className="text-left px-4 py-2">ROI</th>
                <th className="text-left px-4 py-2">Status</th>
                <th className="text-left px-4 py-2">End Date</th>
                <th className="text-left px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {(investments ?? []).map((inv: any) => (
                <tr key={inv.id} className="border-b border-gray-800/50">
                  {editingInvestment === inv.id ? (
                    <>
                      <td className="px-4 py-2 text-white">{inv.plan?.name || "—"}</td>
                      <td className="px-4 py-2">
                        <Input
                          type="number"
                          value={invAmountInput}
                          onChange={(e) => setInvAmountInput(e.target.value)}
                          placeholder={inv.amount.toString()}
                          className="bg-gray-800 border-gray-700 text-white h-8 w-24"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <Input
                          type="number"
                          value={invProfitInput}
                          onChange={(e) => setInvProfitInput(e.target.value)}
                          placeholder={inv.profit.toString()}
                          className="bg-gray-800 border-gray-700 text-white h-8 w-24"
                        />
                      </td>
                      <td className="px-4 py-2 text-gray-400">{inv.roiPercent}%</td>
                      <td className="px-4 py-2">
                        <StatusBadge status={inv.status} />
                      </td>
                      <td className="px-4 py-2 text-gray-400">{new Date(inv.endAt).toLocaleDateString()}</td>
                      <td className="px-4 py-2">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => investmentMut.mutate(inv.id)}
                            disabled={investmentMut.isPending}
                            className="bg-green-600 hover:bg-green-700 h-8"
                          >
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingInvestment(null);
                              setInvProfitInput("");
                              setInvAmountInput("");
                            }}
                            className="h-8"
                          >
                            Cancel
                          </Button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-4 py-2 text-white">{inv.plan?.name || "—"}</td>
                      <td className="px-4 py-2 text-white">${Number(inv.amount).toFixed(2)}</td>
                      <td className="px-4 py-2 text-white">${Number(inv.profit).toFixed(2)}</td>
                      <td className="px-4 py-2 text-gray-400">{inv.roiPercent}%</td>
                      <td className="px-4 py-2">
                        <StatusBadge status={inv.status} />
                      </td>
                      <td className="px-4 py-2 text-gray-400">{new Date(inv.endAt).toLocaleDateString()}</td>
                      <td className="px-4 py-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingInvestment(inv.id);
                            setInvProfitInput(inv.profit.toString());
                            setInvAmountInput(inv.amount.toString());
                          }}
                          className="h-8"
                        >
                          Edit
                        </Button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
              {!investments?.length && (
                <tr><td colSpan={7} className="text-center py-8 text-gray-500">No investments</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Plan Assignments */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <h2 className="text-white font-semibold px-5 py-4 border-b border-gray-800">Plan Assignments</h2>
        <div className="p-5 border-b border-gray-800">
          <div className="flex gap-2">
            <select
              value={planAssignPlanId}
              onChange={(e) => setPlanAssignPlanId(e.target.value)}
              className="flex-1 bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-2 text-sm"
            >
              <option value="">Select plan</option>
              {(plans ?? []).map((plan: any) => (
                <option key={plan.id} value={plan.id}>
                  {plan.name} ${Number(plan.minDeposit)}
                </option>
              ))}
            </select>
            <Input
              type="number"
              value={planAssignAmount}
              onChange={(e) => setPlanAssignAmount(e.target.value)}
              placeholder="Amount"
              className="bg-gray-800 border-gray-700 text-white w-32"
            />
            <Button
              onClick={() => planAssignMut.mutate()}
              disabled={planAssignMut.isPending || !planAssignPlanId || !planAssignAmount}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Assign Plan
            </Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr className="text-gray-400 border-b border-gray-800">
                <th className="text-left px-4 py-2">Plan</th>
                <th className="text-left px-4 py-2">Amount</th>
                <th className="text-left px-4 py-2">ROI</th>
                <th className="text-left px-4 py-2">Status</th>
                <th className="text-left px-4 py-2">Start Date</th>
                <th className="text-left px-4 py-2">End Date</th>
                <th className="text-left px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {(planAssignments ?? []).map((assignment: any) => (
                <tr key={assignment.id} className="border-b border-gray-800/50">
                  <td className="px-4 py-2 text-white">{assignment.plan?.name || "—"}</td>
                  <td className="px-4 py-2 text-white">${Number(assignment.amount).toFixed(2)}</td>
                  <td className="px-4 py-2 text-gray-400">{assignment.roiPercent}%</td>
                  <td className="px-4 py-2">
                    <StatusBadge status={assignment.status} />
                  </td>
                  <td className="px-4 py-2 text-gray-400">{new Date(assignment.startAt).toLocaleDateString()}</td>
                  <td className="px-4 py-2 text-gray-400">{new Date(assignment.endAt).toLocaleDateString()}</td>
                  <td className="px-4 py-2">
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deletePlanAssignmentMut.mutate(assignment.id)}
                      disabled={deletePlanAssignmentMut.isPending}
                      className="h-8"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
              {!planAssignments?.length && (
                <tr><td colSpan={7} className="text-center py-8 text-gray-500">No plan assignments</td></tr>
              )}
            </tbody>
          </table>
        </div>
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
