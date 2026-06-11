import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { Facebook, Twitter, Linkedin, Youtube } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-sidebar-border bg-sidebar text-sidebar-foreground">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo light />
            <p className="mt-4 max-w-sm text-sm text-sidebar-foreground/70">
              Balancepoint Capital provides professional market infrastructure across FX,
              stocks, crypto, commodities and real estate — all from one account.
            </p>
            <div className="mt-6 flex gap-3">
              {[Facebook, Twitter, Linkedin, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-sidebar-border text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <FooterCol title="Markets" links={[
            ["/markets/forex", "Forex"],
            ["/markets/stocks", "Stocks"],
            ["/markets/crypto", "Crypto"],
            ["/markets/commodities", "Commodities"],
            ["/markets/indices", "Indices"],
            ["/markets/real-estate", "Real Estate"],
          ]} />

          <FooterCol title="Company" links={[
            ["/company/about", "About"],
            ["/company/contact", "Contact"],
            ["/company/careers", "Careers"],
            ["/company/legal", "Legal"],
          ]} />

          <FooterCol title="Account" links={[
            ["/auth", "Login"],
            ["/auth", "Register"],
            ["/copytrading", "Copytrading"],
            ["/dashboard", "Dashboard"],
          ]} />
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-sidebar-border pt-6 text-xs text-sidebar-foreground/60 md:flex-row">
          <p>© {new Date().getFullYear()} Balancepoint Capital. All rights reserved.</p>
          <p className="max-w-2xl text-center md:text-right">
            Trading derivatives carries risk. Past performance is not indicative of future results.
            This site is a demo and does not provide real financial services.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-sidebar-foreground">{title}</h4>
      <ul className="mt-4 space-y-2 text-sm">
        {links.map(([to, label]) => (
          <li key={to + label}>
            <Link to={to} className="text-sidebar-foreground/70 hover:text-sidebar-foreground">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
