import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { C as Card, a as CardContent } from "./card-tJ_mUcsW.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { T as Textarea } from "./textarea-DSyJ1nlY.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { L as Label } from "./label-JU3yqRBo.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { x as Mail, P as Phone, w as MapPin } from "../_libs/lucide-react.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
function Contact() {
  const [sending, setSending] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 lg:col-span-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold", children: "Get in touch" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Our team is online 24 hours a day, five days a week." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { icon: Mail, label: "Email", value: "support@balancepoint.example" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { icon: Phone, label: "Phone", value: "+44 20 4577 0000" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { icon: MapPin, label: "Office", value: "Canary Wharf, London, UK" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border lg:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "grid gap-4 sm:grid-cols-2", onSubmit: (e) => {
      e.preventDefault();
      setSending(true);
      setTimeout(() => {
        setSending(false);
        toast.success("Message sent. We'll be in touch shortly.");
        e.target.reset();
      }, 700);
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Full name", name: "name", required: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Email", name: "email", type: "email", required: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Subject", name: "subject", required: true, className: "sm:col-span-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Message" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { name: "message", rows: 5, required: true, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: sending, className: "sm:col-span-2", children: sending ? "Sending..." : "Send message" })
    ] }) }) })
  ] }) });
}
function Field({
  label,
  className,
  ...rest
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ...rest, className: "mt-2" })
  ] });
}
function InfoRow({
  icon: Icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 rounded-lg border border-border bg-card p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "mt-0.5 h-5 w-5 text-brand" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: value })
    ] })
  ] });
}
export {
  Contact as component
};
