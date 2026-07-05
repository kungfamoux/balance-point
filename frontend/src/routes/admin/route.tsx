import { createFileRoute, Outlet, redirect, Link, useRouter } from "@tanstack/react-router";
import { getAdminToken, clearAdminToken } from "@/lib/adminApi";
import {
  LayoutDashboard, Users, ArrowLeftRight, TrendingUp, Ticket,
  BookOpen, BarChart3, LogOut, ChevronRight, Video, Menu, X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Render login page without shell
  if (pathname === "/admin/login") return <Outlet />;

  function logout() {
    clearAdminToken();
    router.navigate({ to: "/admin/login" });
  }

  return (
    <div className="flex h-screen bg-gray-950 text-white overflow-hidden">
      {/* Mobile menu button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-900 border border-gray-800 rounded-lg text-white"
      >
        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-40 w-64 bg-gray-900 border-r border-gray-800 flex flex-col transform transition-transform duration-300 ease-in-out",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
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
                onClick={() => setMobileMenuOpen(false)}
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
            onClick={() => { logout(); setMobileMenuOpen(false); }}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
        />
      )}

      {/* Main */}
      <main className="flex-1 overflow-y-auto lg:ml-0">
        <div className="p-4 lg:p-6 pt-16 lg:pt-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
