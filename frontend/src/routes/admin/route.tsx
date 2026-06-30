import { createFileRoute, Outlet, redirect, Link, useRouter } from "@tanstack/react-router";
import { getAdminToken, clearAdminToken, adminApi } from "@/lib/adminApi";
import {
  LayoutDashboard, Users, ArrowLeftRight, TrendingUp, Ticket,
  BookOpen, BarChart3, LogOut, ChevronRight, Video, AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/admin")({
  ssr: false,
  beforeLoad: ({ location }) => {
    if (location.pathname === "/admin/login") return;
    const token = getAdminToken();
    if (!token) throw redirect({ to: "/admin/login" });
  },
  component: AdminLayout,
});

const NAV = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/users", label: "Users", icon: Users },
  { to: "/admin/transactions", label: "Transactions", icon: ArrowLeftRight },
  { to: "/admin/investments", label: "Investments", icon: TrendingUp },
  { to: "/admin/plans", label: "Plans", icon: BarChart3 },
  { to: "/admin/tickets", label: "Tickets", icon: Ticket },
  { to: "/admin/sessions", label: "Live Sessions", icon: Video },
  { to: "/admin/ledger", label: "Ledger", icon: BookOpen },
];

function AdminLayout() {
  const router = useRouter();
  const pathname = router.state.location.pathname;
  const [paymentSuspended, setPaymentSuspended] = useState(false);

  useEffect(() => {
    if (pathname === "/admin/login") return;
    adminApi.getPaymentStatus()
      .then(data => setPaymentSuspended(data.suspended))
      .catch(() => {});
  }, [pathname]);

  // Render login page without shell
  if (pathname === "/admin/login") return <Outlet />;

  function logout() {
    clearAdminToken();
    router.navigate({ to: "/admin/login" });
  }

  return (
    <div className="flex h-screen bg-gray-950 text-white overflow-hidden">
      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0 bg-gray-900 border-r border-gray-800 flex flex-col">
        <div className="px-5 py-5 border-b border-gray-800">
          <p className="font-bold text-sm text-blue-400 uppercase tracking-widest">BP Admin</p>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {NAV.map((item) => {
            const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  active
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                )}
              >
                <item.icon className="w-4 h-4 flex-shrink-0" />
                {item.label}
                {active && <ChevronRight className="w-3 h-3 ml-auto" />}
              </Link>
            );
          })}
        </nav>
        <div className="px-3 py-4 border-t border-gray-800">
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        {paymentSuspended && (
          <div className="bg-red-900/20 border-b border-red-800 px-6 py-4">
            <div className="flex items-center gap-3 text-red-400">
              <AlertTriangle className="w-5 h-5" />
              <p className="font-medium">Payment Suspended - Please contact developer</p>
            </div>
          </div>
        )}
        <Outlet />
      </main>
    </div>
  );
}
