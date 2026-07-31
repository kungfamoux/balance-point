import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { L as Logo } from "./Logo-Di8D-hFn.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { b as getSession } from "./auth-BTtvEmdt.mjs";
import { X, M as Menu, F as Facebook, q as Twitter, r as Linkedin, Y as Youtube, s as ChevronDown } from "../_libs/lucide-react.mjs";
const markets = [
  { to: "/markets/forex", label: "Forex" },
  { to: "/markets/stocks", label: "Stocks" },
  { to: "/markets/crypto", label: "Crypto" },
  { to: "/markets/commodities", label: "Commodities" },
  { to: "/markets/indices", label: "Indices" },
  { to: "/markets/real-estate", label: "Real Estate" }
];
const company = [
  { to: "/company/about", label: "About" },
  { to: "/company/contact", label: "Contact" },
  { to: "/company/careers", label: "Careers" },
  { to: "/company/legal", label: "Legal" }
];
function SiteHeader() {
  const [authed, setAuthed] = reactExports.useState(false);
  const [open, setOpen] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setAuthed(!!getSession());
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "hidden items-center gap-1 lg:flex", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(NavLink, { to: "/", children: "Home" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Dropdown, { label: "Markets", items: markets }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(NavLink, { to: "/copytrading", children: "Copytrading" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Dropdown, { label: "Company", items: company })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        authed ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", children: "Dashboard" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "ghost", className: "hidden sm:inline-flex", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth", children: "Login" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth", search: { tab: "register" }, children: "Open Account" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "ml-1 inline-flex h-9 w-9 items-center justify-center rounded-md border border-border lg:hidden",
            onClick: () => setOpen((v) => !v),
            "aria-label": "Menu",
            children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-4 w-4" })
          }
        )
      ] })
    ] }),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border bg-background lg:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl space-y-1 px-4 py-3 sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MobileLink, { to: "/", onClick: () => setOpen(false), children: "Home" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-3 pt-3 text-xs font-semibold uppercase text-muted-foreground", children: "Markets" }),
      markets.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(MobileLink, { to: m.to, onClick: () => setOpen(false), children: m.label }, m.to)),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MobileLink, { to: "/copytrading", onClick: () => setOpen(false), children: "Copytrading" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-3 pt-3 text-xs font-semibold uppercase text-muted-foreground", children: "Company" }),
      company.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(MobileLink, { to: m.to, onClick: () => setOpen(false), children: m.label }, m.to))
    ] }) })
  ] });
}
function NavLink({ to, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link,
    {
      to,
      className: "rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground",
      activeProps: { className: "text-brand" },
      activeOptions: { exact: true },
      children
    }
  );
}
function Dropdown({ label, items }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground", children: [
      label,
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3.5 w-3.5" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "invisible absolute left-0 top-full z-50 w-56 translate-y-1 rounded-lg border border-border bg-popover p-1 opacity-0 shadow-lg transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100", children: items.map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: i.to,
        className: "block rounded-md px-3 py-2 text-sm text-popover-foreground hover:bg-accent",
        children: i.label
      },
      i.to
    )) })
  ] });
}
function MobileLink({ to, children, onClick }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link,
    {
      to,
      onClick,
      className: "block rounded-md px-3 py-2 text-sm font-medium hover:bg-accent",
      children
    }
  );
}
function SiteFooter() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "border-t border-sidebar-border bg-sidebar text-sidebar-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 py-14 sm:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-10 md:grid-cols-2 lg:grid-cols-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, { light: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-sm text-sm text-sidebar-foreground/70", children: "Balancepoint Capital provides professional market infrastructure across FX, stocks, crypto, commodities and real estate — all from one account." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex gap-3", children: [Facebook, Twitter, Linkedin, Youtube].map((Icon, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: "#",
            className: "inline-flex h-9 w-9 items-center justify-center rounded-md border border-sidebar-border text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" })
          },
          i
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FooterCol, { title: "Markets", links: [
        ["/markets/forex", "Forex"],
        ["/markets/stocks", "Stocks"],
        ["/markets/crypto", "Crypto"],
        ["/markets/commodities", "Commodities"],
        ["/markets/indices", "Indices"],
        ["/markets/real-estate", "Real Estate"]
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FooterCol, { title: "Company", links: [
        ["/company/about", "About"],
        ["/company/contact", "Contact"],
        ["/company/careers", "Careers"],
        ["/company/legal", "Legal"]
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FooterCol, { title: "Account", links: [
        ["/auth", "Login"],
        ["/auth", "Register"],
        ["/copytrading", "Copytrading"],
        ["/dashboard", "Dashboard"]
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 flex flex-col items-center justify-between gap-4 border-t border-sidebar-border pt-6 text-xs text-sidebar-foreground/60 md:flex-row", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " Balancepoint Capital. All rights reserved."
    ] }) })
  ] }) });
}
function FooterCol({ title, links }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-sidebar-foreground", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-4 space-y-2 text-sm", children: links.map(([to, label]) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to, className: "text-sidebar-foreground/70 hover:text-sidebar-foreground", children: label }) }, to + label)) })
  ] });
}
function SiteLayout({ children }) {
  reactExports.useEffect(() => {
    (function() {
      var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = "https://embed.tawk.to/6a33b762d0dd3e1d406c62f2/1jrd08n69";
      s1.charset = "UTF-8";
      s1.setAttribute("crossorigin", "*");
      s0.parentNode.insertBefore(s1, s0);
    })();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1", children }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
export {
  SiteLayout as S
};
