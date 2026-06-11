import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";

const links = [
  { to: "/company/about", label: "About" },
  { to: "/company/contact", label: "Contact" },
  { to: "/company/careers", label: "Careers" },
  { to: "/company/legal", label: "Legal" },
] as const;

export const Route = createFileRoute("/company")({
  component: Layout,
});

function Layout() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <SiteLayout>
      <section className="border-b border-border bg-sidebar text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">Company</p>
          <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">Built for the next generation of investors.</h1>
        </div>
      </section>
      <div className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 sm:px-6">
          {links.map((l) => {
            const active = path === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                  active ? "border-brand text-brand" : "border-transparent text-foreground/70 hover:text-foreground"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </div>
      </div>
      <Outlet />
    </SiteLayout>
  );
}
