import { Link, useRouterState, useNavigate, Outlet } from "@tanstack/react-router";
import {
  LayoutDashboard, ArrowDownCircle, ArrowUpCircle, PiggyBank, Briefcase,
  Receipt, Users, Copy, CandlestickChart, ShieldCheck, LifeBuoy, UserCircle,
  Lock, Settings, LogOut, Bell, Wallet, Link2, Sun, Moon, Languages,
} from "lucide-react";
import { useTheme, useLang, LANGUAGES } from "@/lib/theme";
import { useTranslation } from "react-i18next";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger,
  SidebarHeader, useSidebar,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/site/Logo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { signOut } from "@/lib/auth";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

const MAIN_ITEMS = [
  { to: "/dashboard", key: "dashboard.sidebar.overview", icon: LayoutDashboard, exact: true },
  { to: "/dashboard/deposit", key: "dashboard.sidebar.deposit", icon: ArrowDownCircle },
  { to: "/dashboard/link-wallet", key: "dashboard.sidebar.linkWallet", icon: Link2 },
  { to: "/dashboard/withdraw", key: "dashboard.sidebar.withdraw", icon: ArrowUpCircle },
  { to: "/dashboard/invest", key: "dashboard.sidebar.plans", icon: PiggyBank },
  { to: "/dashboard/my-investments", key: "dashboard.sidebar.myInvestments", icon: Briefcase },
  { to: "/dashboard/transactions", key: "dashboard.sidebar.transactions", icon: Receipt },
  { to: "/dashboard/trade", key: "dashboard.sidebar.trade", icon: CandlestickChart },
];
const TRADE_ITEMS = [
  { to: "/dashboard/copytrade", key: "dashboard.sidebar.copytrade", icon: Copy },
  { to: "/dashboard/referrals", key: "dashboard.sidebar.referrals", icon: Users },
];
const ACCOUNT_ITEMS = [
  { to: "/dashboard/profile", key: "dashboard.sidebar.profile", icon: UserCircle },
  { to: "/dashboard/kyc", key: "dashboard.sidebar.kyc", icon: ShieldCheck },
  { to: "/dashboard/security", key: "dashboard.sidebar.security", icon: Lock },
  { to: "/dashboard/settings", key: "dashboard.sidebar.settings", icon: Settings },
  { to: "/dashboard/support", key: "dashboard.sidebar.support", icon: LifeBuoy },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-secondary/40">
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          <Topbar />
          <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export function DashboardOutlet() {
  return (
    <DashboardShell>
      <Outlet />
    </DashboardShell>
  );
}

function AppSidebar() {
  const { t } = useTranslation();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const isActive = (to: string, exact?: boolean) =>
    exact ? path === to : path === to || path.startsWith(to + "/");
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className={`flex h-14 items-center ${collapsed ? "justify-center" : "px-2"}`}>
          {collapsed ? (
            <Link to="/" className="flex items-center"><span className="text-lg font-bold text-sidebar-primary">BP</span></Link>
          ) : (
            <Logo light />
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <Group label={t("dashboard.sidebar.main")} items={MAIN_ITEMS} isActive={isActive} />
        <Group label={t("dashboard.sidebar.trading")} items={TRADE_ITEMS} isActive={isActive} />
        <Group label={t("dashboard.sidebar.account")} items={ACCOUNT_ITEMS} isActive={isActive} />
      </SidebarContent>
    </Sidebar>
  );
}

function Group({ label, items, isActive }: any) {
  const { t } = useTranslation();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((i: any) => (
            <SidebarMenuItem key={i.to}>
              <SidebarMenuButton asChild isActive={isActive(i.to, i.exact)}>
                <Link to={i.to} className="flex items-center gap-2">
                  <i.icon className="h-4 w-4" />
                  <span>{t(i.key)}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

function Topbar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { theme, toggle } = useTheme();
  const { lang, setLang } = useLang();
  const currentLang = LANGUAGES.find((l) => l.id === lang)!;

  const { data: profile } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const [p, w] = await Promise.all([api.getProfile(), api.getWallet()]) as any[];
      return { email: p?.email, profile: p, wallet: w };
    },
  });
  const initials = (profile?.profile?.full_name ?? profile?.email ?? "?")
    .split(/[@\s]/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s: string) => s[0]?.toUpperCase())
    .join("");

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-2 border-b border-border bg-background px-4 sm:px-6">
      <SidebarTrigger />
      <div className="ml-auto flex items-center gap-2">
        {/* Balance */}
        <div className="hidden items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1.5 text-sm sm:flex">
          <Wallet className="h-4 w-4 text-brand" />
          <span className="font-semibold">${Number(profile?.wallet?.balance ?? 0).toLocaleString()}</span>
          <span className="text-muted-foreground">{t("dashboard.topbar.balance")}</span>
        </div>

        {/* Dark / Light toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggle}
          title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          className="rounded-full"
        >
          {theme === "dark"
            ? <Sun className="h-4 w-4 text-yellow-400" />
            : <Moon className="h-4 w-4" />}
        </Button>

        {/* Language switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full" title="Change language">
              <span className="text-base leading-none">{currentLang.flag}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuLabel className="flex items-center gap-2 text-xs">
              <Languages className="h-3.5 w-3.5" /> Language
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {LANGUAGES.map((l) => (
              <DropdownMenuItem
                key={l.id}
                onClick={() => setLang(l.id)}
                className={`flex items-center gap-2 ${lang === l.id ? "font-semibold text-brand" : ""}`}
              >
                <span className="text-base">{l.flag}</span>
                {l.label}
                {lang === l.id && <span className="ml-auto text-brand">✓</span>}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-4 w-4" />
        </Button>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-full p-1 hover:bg-accent">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-brand text-xs text-white">{initials || "U"}</AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <p className="font-medium">{profile?.profile?.full_name ?? "Account"}</p>
              <p className="text-xs font-normal text-muted-foreground">{profile?.email}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild><Link to="/dashboard/profile">Profile</Link></DropdownMenuItem>
            <DropdownMenuItem asChild><Link to="/dashboard/settings">Settings</Link></DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () => {
                await signOut();
                navigate({ to: "/" });
              }}
            >
              <LogOut className="mr-2 h-4 w-4" /> {t("dashboard.topbar.signOut")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export function PageHeader({ title, description, children }: { title: string; description?: string; children?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
      <div>
        <h1 className="font-display text-2xl font-bold sm:text-3xl">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      {children}
    </div>
  );
}
