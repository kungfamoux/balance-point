import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { P as PageHeader } from "./DashboardShell-BgoTQ4yP.mjs";
import { C as Card, a as CardContent } from "./card-tJ_mUcsW.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { L as Label } from "./label-JU3yqRBo.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { A as Avatar, a as AvatarFallback } from "./avatar-BJDbbUeP.mjs";
import { B as Badge } from "./badge-DyfXZgLs.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { a as api } from "./api-DONQIbPy.mjs";
import { b as getSession } from "./auth-BTtvEmdt.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/i18next.mjs";
import { S as ShieldCheck, G as Globe, aq as CalendarDays, K as User, P as Phone, x as Mail, a3 as Lock } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "./router-Brv9oJny.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/react-i18next.mjs";
import "../_libs/use-sync-external-store.mjs";
import "../_libs/zod.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-separator.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/radix-ui__react-tooltip.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "./Logo-Di8D-hFn.mjs";
import "../_libs/radix-ui__react-dropdown-menu.mjs";
import "../_libs/radix-ui__react-menu.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-avatar.mjs";
import "../_libs/@radix-ui/react-use-is-hydrated+[...].mjs";
function Profile() {
  const {
    data,
    refetch
  } = useQuery({
    queryKey: ["profile-page"],
    queryFn: async () => {
      const session = getSession();
      const profile2 = await api.getProfile();
      return {
        email: session?.user?.email,
        profile: profile2
      };
    }
  });
  const [name, setName] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  const [saving, setSaving] = reactExports.useState(false);
  const profile = data?.profile;
  reactExports.useEffect(() => {
    if (profile) {
      setName(profile.fullName ?? profile.full_name ?? "");
      setPhone(profile.phone ?? "");
    }
  }, [profile]);
  async function save(e) {
    e.preventDefault();
    setSaving(true);
    try {
      await api.updateProfile({
        fullName: name,
        phone
      });
      toast.success("Profile updated successfully.");
      refetch();
    } catch (err) {
      toast.error(err?.message ?? "Failed to save profile.");
    } finally {
      setSaving(false);
    }
  }
  const initials = (name || data?.email || "U").slice(0, 2).toUpperCase();
  const kycStatus = profile?.kycStatus ?? profile?.kyc_status ?? "unverified";
  const kycColor = {
    verified: "bg-green-600",
    unverified: "bg-yellow-600",
    rejected: "bg-red-600"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "My Profile", description: "View your account details and update your name or phone number." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex flex-col items-center p-8 text-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "h-24 w-24", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-brand text-2xl text-white font-bold", children: initials }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg font-bold", children: name || "Your Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: data?.email })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: `${kycColor[kycStatus] ?? "bg-gray-500"} text-white text-xs`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-3 h-3 mr-1" }),
          "KYC ",
          kycStatus
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 w-full space-y-3 text-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { icon: Globe, label: "Country", value: profile?.country ?? "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { icon: CalendarDays, label: "Member since", value: profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
          }) : "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { icon: User, label: "Referral Code", value: profile?.referralCode ?? profile?.referral_code ?? "—", mono: true })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border lg:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-base mb-5", children: "Edit Information" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "grid gap-5 sm:grid-cols-2", onSubmit: save, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "p-name", className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-3.5 h-3.5" }),
              " Full Name"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "p-name", value: name, onChange: (e) => setName(e.target.value), className: "mt-1.5", placeholder: "Your full name" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "p-phone", className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3.5 h-3.5" }),
              " Phone Number"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "p-phone", type: "tel", value: phone, onChange: (e) => setPhone(e.target.value), className: "mt-1.5", placeholder: "+1 800 000 0000" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "flex items-center gap-1.5 text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-3.5 h-3.5" }),
              " Email",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto text-xs font-normal flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3 h-3" }),
                "Read-only"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data?.email ?? "", readOnly: true, className: "mt-1.5 bg-muted cursor-not-allowed" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "flex items-center gap-1.5 text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-3.5 h-3.5" }),
              " Country",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto text-xs font-normal flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3 h-3" }),
                "Read-only"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: profile?.country ?? "", readOnly: true, className: "mt-1.5 bg-muted cursor-not-allowed" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:col-span-2 flex justify-end pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: saving, className: "px-8", children: saving ? "Saving…" : "Save Changes" }) })
        ] })
      ] }) })
    ] })
  ] });
}
function InfoRow({
  icon: Icon,
  label,
  value,
  mono
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4 text-muted-foreground shrink-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
      label,
      ":"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-medium truncate ${mono ? "font-mono text-xs" : ""}`, children: value })
  ] });
}
export {
  Profile as component
};
