import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { adminApi } from "@/lib/adminApi";

export const Route = createFileRoute("/admin/investments")({
  component: AdminInvestments,
});

function AdminInvestments() {
  const { data: investments = [], isLoading } = useQuery({
    queryKey: ["admin", "investments"],
    queryFn: adminApi.getInvestments,
  });

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
              </tr>
            </thead>
            <tbody>
              {investments.map((inv: any) => (
                <tr key={inv.id} className="border-b border-gray-800/50 hover:bg-gray-800/20 transition-colors">
                  <td className="px-4 py-3 text-gray-400 font-mono text-xs max-w-[100px] truncate">{inv.userId}</td>
                  <td className="px-4 py-3 text-white">{inv.plan?.name ?? "—"}</td>
                  <td className="px-4 py-3 text-white">${Number(inv.amount).toFixed(2)}</td>
                  <td className="px-4 py-3 text-white">{Number(inv.roiPercent).toFixed(1)}%</td>
                  <td className="px-4 py-3 text-green-400">${Number(inv.profit).toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs text-white ${inv.status === "active" ? "bg-green-600" : "bg-gray-600"}`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-400">{new Date(inv.startAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-gray-400">{new Date(inv.endAt).toLocaleDateString()}</td>
                </tr>
              ))}
              {investments.length === 0 && (
                <tr><td colSpan={8} className="text-center py-12 text-gray-500">No investments found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
