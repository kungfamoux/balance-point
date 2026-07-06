import { createFileRoute, Link, Outlet, useMatchRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { adminApi } from "@/lib/adminApi";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, ChevronRight } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export const Route = createFileRoute("/admin/users")({
  component: AdminUsers,
});

function AdminUsers() {
  const matchRoute = useMatchRoute();
  const isChildRouteActive = matchRoute({ to: "/admin/users/$id" });
  
  const { data: users = [], isLoading, error } = useQuery({
    queryKey: ["admin", "users"],
    queryFn: adminApi.getUsers,
  });
  const [search, setSearch] = useState("");

  const filtered = users.filter((u: any) =>
    (u.fullName ?? "").toLowerCase().includes(search.toLowerCase()) ||
    (u.email ?? "").toLowerCase().includes(search.toLowerCase()) ||
    (u.id ?? "").includes(search)
  );

  const kycColor: Record<string, string> = {
    verified: "bg-green-600",
    unverified: "bg-yellow-600",
    rejected: "bg-red-600",
  };

  // If child route is active, render the outlet (user detail page)
  if (isChildRouteActive) {
    return <Outlet />;
  }

  return (
    <div className="space-y-4">
      <AdminPageHeader
        title="Users"
        description={`${users.length} registered users`}
        actions={
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or ID…"
              className="pl-9 bg-gray-800 border-gray-700 text-white w-full sm:w-64"
            />
          </div>
        }
      />

      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : error ? (
        <div className="flex justify-center py-20">
          <div className="text-red-400">Failed to load users: {(error as any).message}</div>
        </div>
      ) : (
        <>
          {/* Mobile card view */}
          <div className="lg:hidden space-y-3">
            {filtered.map((u: any) => (
              <div key={u.id} className="bg-gray-900 border border-gray-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">{u.fullName ?? "—"}</p>
                    <p className="text-gray-500 text-xs font-mono mt-0.5">{u.email ?? "—"}</p>
                    <p className="text-gray-600 text-xs font-mono mt-0.5">{u.id.slice(0, 8)}…</p>
                  </div>
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs text-white ${kycColor[u.kycStatus] ?? "bg-gray-600"}`}>
                    {u.kycStatus}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">{u.country ?? "—"}</span>
                  <span className="text-gray-500">{new Date(u.createdAt).toLocaleDateString()}</span>
                </div>
                <Link
                  to="/admin/users/$id"
                  params={{ id: u.id }}
                  className="flex items-center justify-center gap-1 text-blue-400 hover:text-blue-300 text-sm py-2 border border-blue-600/30 rounded-lg"
                >
                  View Details <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="text-center py-12 text-gray-500">No users found</div>
            )}
          </div>

          {/* Desktop table view */}
          <div className="hidden lg:block bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800 text-gray-400">
                  <th className="text-left px-4 py-3">Name</th>
                  <th className="text-left px-4 py-3">Email</th>
                  <th className="text-left px-4 py-3">Country</th>
                  <th className="text-left px-4 py-3">KYC</th>
                  <th className="text-left px-4 py-3">Joined</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((u: any) => (
                  <tr key={u.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                    <td className="px-4 py-3 text-white font-medium">{u.fullName ?? "—"}</td>
                    <td className="px-4 py-3 text-gray-400">{u.email ?? "—"}</td>
                    <td className="px-4 py-3 text-gray-400">{u.country ?? "—"}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs text-white ${kycColor[u.kycStatus] ?? "bg-gray-600"}`}>
                        {u.kycStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-400">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        to="/admin/users/$id"
                        params={{ id: u.id }}
                        className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-xs"
                      >
                        View <ChevronRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-gray-500">No users found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
