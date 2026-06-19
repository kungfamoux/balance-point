import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { adminApi } from "@/lib/adminApi";
import { Users, ArrowDownCircle, ArrowUpCircle, Clock, TrendingUp, ChevronRight, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function StatCard({ icon: Icon, label, value, color, to, search }: {
  icon: any; label: string; value: string | number; color: string; to: string; search?: Record<string, string>;
}) {
  return (
    <Link
      to={to}
      search={search}
      className="group bg-gray-900 border border-gray-800 rounded-xl p-5 flex items-center gap-4 hover:border-gray-700 hover:bg-gray-800/50 transition-all duration-200 cursor-pointer"
    >
      <div className={`p-3 rounded-lg ${color} group-hover:scale-110 transition-transform duration-200`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div className="flex-1">
        <p className="text-gray-400 text-xs group-hover:text-gray-300 transition-colors">{label}</p>
        <p className="text-white font-bold text-xl mt-0.5">{value}</p>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-gray-400 group-hover:translate-x-1 transition-all duration-200" />
    </Link>
  );
}

function AdminDashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["admin", "stats"],
    queryFn: adminApi.getStats,
    refetchInterval: 30_000,
  });

  if (isLoading) return (
    <div className="flex items-center justify-center h-full">
      <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const fmt = (n: number) =>
    "$" + Number(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">Platform overview</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <StatCard icon={Users} label="Total Users" value={stats?.totalUsers ?? 0} color="bg-blue-600" to="/admin/users" />
        <StatCard icon={TrendingUp} label="Total Investments" value={stats?.totalInvestments ?? 0} color="bg-violet-600" to="/admin/investments" />
        <StatCard icon={ArrowDownCircle} label="Total Deposited" value={fmt(stats?.totalDeposited ?? 0)} color="bg-green-600" to="/admin/transactions" search={{ type: "deposit" }} />
        <StatCard icon={ArrowUpCircle} label="Total Withdrawn" value={fmt(stats?.totalWithdrawn ?? 0)} color="bg-orange-600" to="/admin/transactions" search={{ type: "withdrawal" }} />
        <StatCard icon={Clock} label="Pending Deposits" value={stats?.pendingDeposits ?? 0} color="bg-yellow-600" to="/admin/transactions" search={{ type: "deposit", status: "pending" }} />
        <StatCard icon={ShieldCheck} label="Pending KYC" value={stats?.pendingKyc ?? 0} color="bg-purple-600" to="/admin/kyc" />
      </div>

      {(stats?.pendingDeposits > 0 || stats?.pendingWithdrawals > 0) && (
        <div className="bg-yellow-900/30 border border-yellow-700/40 rounded-xl p-4 text-yellow-300 text-sm">
          ⚠ You have {stats.pendingDeposits} pending deposit(s) and {stats.pendingWithdrawals} pending withdrawal(s) awaiting approval.
        </div>
      )}
    </div>
  );
}
