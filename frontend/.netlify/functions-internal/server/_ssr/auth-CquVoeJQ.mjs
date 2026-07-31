import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { e as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { S as SiteLayout } from "./SiteLayout-D6Ut5f2G.mjs";
import { C as Card, a as CardContent } from "./card-tJ_mUcsW.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { L as Label } from "./label-JU3yqRBo.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-D_u1EXWn.mjs";
import { l as login, r as register } from "./auth-BTtvEmdt.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { R as Route$H } from "./router-Brv9oJny.mjs";
import "../_libs/i18next.mjs";
import { E as EyeOff, b as Eye, L as LoaderCircle } from "../_libs/lucide-react.mjs";
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
import "./Logo-Di8D-hFn.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/radix-ui__react-tabs.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/react-i18next.mjs";
import "../_libs/use-sync-external-store.mjs";
import "../_libs/zod.mjs";
function AuthPage() {
  const {
    tab = "login",
    ref
  } = Route$H.useSearch();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SiteLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-secondary/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden lg:block", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl font-bold", children: "Welcome back." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: "Your professional trading account. 40,000+ instruments. One login." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-8 space-y-3 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bullet, { children: "Real-time deposits, withdrawals and balances" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bullet, { children: "TradingView-grade charts and watchlists" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bullet, { children: "Copytrade vetted top performers" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bullet, { children: "24/5 support and secure custody" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-6 sm:p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: tab, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "grid w-full grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "login", children: "Login" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "register", children: "Register" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "login", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoginForm, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "register", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RegisterForm, { defaultRef: ref }) })
    ] }) }) })
  ] }) }) });
}
function Bullet({
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-2 inline-block h-1.5 w-1.5 rounded-full bg-brand" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children })
  ] });
}
const COUNTRIES = [{
  code: "AF",
  name: "Afghanistan",
  dial: "+93"
}, {
  code: "AL",
  name: "Albania",
  dial: "+355"
}, {
  code: "DZ",
  name: "Algeria",
  dial: "+213"
}, {
  code: "AD",
  name: "Andorra",
  dial: "+376"
}, {
  code: "AO",
  name: "Angola",
  dial: "+244"
}, {
  code: "AG",
  name: "Antigua and Barbuda",
  dial: "+1-268"
}, {
  code: "AR",
  name: "Argentina",
  dial: "+54"
}, {
  code: "AM",
  name: "Armenia",
  dial: "+374"
}, {
  code: "AU",
  name: "Australia",
  dial: "+61"
}, {
  code: "AT",
  name: "Austria",
  dial: "+43"
}, {
  code: "AZ",
  name: "Azerbaijan",
  dial: "+994"
}, {
  code: "BS",
  name: "Bahamas",
  dial: "+1-242"
}, {
  code: "BH",
  name: "Bahrain",
  dial: "+973"
}, {
  code: "BD",
  name: "Bangladesh",
  dial: "+880"
}, {
  code: "BB",
  name: "Barbados",
  dial: "+1-246"
}, {
  code: "BY",
  name: "Belarus",
  dial: "+375"
}, {
  code: "BE",
  name: "Belgium",
  dial: "+32"
}, {
  code: "BZ",
  name: "Belize",
  dial: "+501"
}, {
  code: "BJ",
  name: "Benin",
  dial: "+229"
}, {
  code: "BT",
  name: "Bhutan",
  dial: "+975"
}, {
  code: "BO",
  name: "Bolivia",
  dial: "+591"
}, {
  code: "BA",
  name: "Bosnia and Herzegovina",
  dial: "+387"
}, {
  code: "BW",
  name: "Botswana",
  dial: "+267"
}, {
  code: "BR",
  name: "Brazil",
  dial: "+55"
}, {
  code: "BN",
  name: "Brunei",
  dial: "+673"
}, {
  code: "BG",
  name: "Bulgaria",
  dial: "+359"
}, {
  code: "BF",
  name: "Burkina Faso",
  dial: "+226"
}, {
  code: "BI",
  name: "Burundi",
  dial: "+257"
}, {
  code: "CV",
  name: "Cabo Verde",
  dial: "+238"
}, {
  code: "KH",
  name: "Cambodia",
  dial: "+855"
}, {
  code: "CM",
  name: "Cameroon",
  dial: "+237"
}, {
  code: "CA",
  name: "Canada",
  dial: "+1"
}, {
  code: "CF",
  name: "Central African Republic",
  dial: "+236"
}, {
  code: "TD",
  name: "Chad",
  dial: "+235"
}, {
  code: "CL",
  name: "Chile",
  dial: "+56"
}, {
  code: "CN",
  name: "China",
  dial: "+86"
}, {
  code: "CO",
  name: "Colombia",
  dial: "+57"
}, {
  code: "KM",
  name: "Comoros",
  dial: "+269"
}, {
  code: "CG",
  name: "Congo",
  dial: "+242"
}, {
  code: "CR",
  name: "Costa Rica",
  dial: "+506"
}, {
  code: "HR",
  name: "Croatia",
  dial: "+385"
}, {
  code: "CU",
  name: "Cuba",
  dial: "+53"
}, {
  code: "CY",
  name: "Cyprus",
  dial: "+357"
}, {
  code: "CZ",
  name: "Czech Republic",
  dial: "+420"
}, {
  code: "DK",
  name: "Denmark",
  dial: "+45"
}, {
  code: "DJ",
  name: "Djibouti",
  dial: "+253"
}, {
  code: "DM",
  name: "Dominica",
  dial: "+1-767"
}, {
  code: "DO",
  name: "Dominican Republic",
  dial: "+1-809"
}, {
  code: "EC",
  name: "Ecuador",
  dial: "+593"
}, {
  code: "EG",
  name: "Egypt",
  dial: "+20"
}, {
  code: "SV",
  name: "El Salvador",
  dial: "+503"
}, {
  code: "GQ",
  name: "Equatorial Guinea",
  dial: "+240"
}, {
  code: "ER",
  name: "Eritrea",
  dial: "+291"
}, {
  code: "EE",
  name: "Estonia",
  dial: "+372"
}, {
  code: "SZ",
  name: "Eswatini",
  dial: "+268"
}, {
  code: "ET",
  name: "Ethiopia",
  dial: "+251"
}, {
  code: "FJ",
  name: "Fiji",
  dial: "+679"
}, {
  code: "FI",
  name: "Finland",
  dial: "+358"
}, {
  code: "FR",
  name: "France",
  dial: "+33"
}, {
  code: "GA",
  name: "Gabon",
  dial: "+241"
}, {
  code: "GM",
  name: "Gambia",
  dial: "+220"
}, {
  code: "GE",
  name: "Georgia",
  dial: "+995"
}, {
  code: "DE",
  name: "Germany",
  dial: "+49"
}, {
  code: "GH",
  name: "Ghana",
  dial: "+233"
}, {
  code: "GR",
  name: "Greece",
  dial: "+30"
}, {
  code: "GD",
  name: "Grenada",
  dial: "+1-473"
}, {
  code: "GT",
  name: "Guatemala",
  dial: "+502"
}, {
  code: "GN",
  name: "Guinea",
  dial: "+224"
}, {
  code: "GW",
  name: "Guinea-Bissau",
  dial: "+245"
}, {
  code: "GY",
  name: "Guyana",
  dial: "+592"
}, {
  code: "HT",
  name: "Haiti",
  dial: "+509"
}, {
  code: "HN",
  name: "Honduras",
  dial: "+504"
}, {
  code: "HU",
  name: "Hungary",
  dial: "+36"
}, {
  code: "IS",
  name: "Iceland",
  dial: "+354"
}, {
  code: "IN",
  name: "India",
  dial: "+91"
}, {
  code: "ID",
  name: "Indonesia",
  dial: "+62"
}, {
  code: "IR",
  name: "Iran",
  dial: "+98"
}, {
  code: "IQ",
  name: "Iraq",
  dial: "+964"
}, {
  code: "IE",
  name: "Ireland",
  dial: "+353"
}, {
  code: "IL",
  name: "Israel",
  dial: "+972"
}, {
  code: "IT",
  name: "Italy",
  dial: "+39"
}, {
  code: "JM",
  name: "Jamaica",
  dial: "+1-876"
}, {
  code: "JP",
  name: "Japan",
  dial: "+81"
}, {
  code: "JO",
  name: "Jordan",
  dial: "+962"
}, {
  code: "KZ",
  name: "Kazakhstan",
  dial: "+7"
}, {
  code: "KE",
  name: "Kenya",
  dial: "+254"
}, {
  code: "KI",
  name: "Kiribati",
  dial: "+686"
}, {
  code: "KW",
  name: "Kuwait",
  dial: "+965"
}, {
  code: "KG",
  name: "Kyrgyzstan",
  dial: "+996"
}, {
  code: "LA",
  name: "Laos",
  dial: "+856"
}, {
  code: "LV",
  name: "Latvia",
  dial: "+371"
}, {
  code: "LB",
  name: "Lebanon",
  dial: "+961"
}, {
  code: "LS",
  name: "Lesotho",
  dial: "+266"
}, {
  code: "LR",
  name: "Liberia",
  dial: "+231"
}, {
  code: "LY",
  name: "Libya",
  dial: "+218"
}, {
  code: "LI",
  name: "Liechtenstein",
  dial: "+423"
}, {
  code: "LT",
  name: "Lithuania",
  dial: "+370"
}, {
  code: "LU",
  name: "Luxembourg",
  dial: "+352"
}, {
  code: "MG",
  name: "Madagascar",
  dial: "+261"
}, {
  code: "MW",
  name: "Malawi",
  dial: "+265"
}, {
  code: "MY",
  name: "Malaysia",
  dial: "+60"
}, {
  code: "MV",
  name: "Maldives",
  dial: "+960"
}, {
  code: "ML",
  name: "Mali",
  dial: "+223"
}, {
  code: "MT",
  name: "Malta",
  dial: "+356"
}, {
  code: "MH",
  name: "Marshall Islands",
  dial: "+692"
}, {
  code: "MR",
  name: "Mauritania",
  dial: "+222"
}, {
  code: "MU",
  name: "Mauritius",
  dial: "+230"
}, {
  code: "MX",
  name: "Mexico",
  dial: "+52"
}, {
  code: "FM",
  name: "Micronesia",
  dial: "+691"
}, {
  code: "MD",
  name: "Moldova",
  dial: "+373"
}, {
  code: "MC",
  name: "Monaco",
  dial: "+377"
}, {
  code: "MN",
  name: "Mongolia",
  dial: "+976"
}, {
  code: "ME",
  name: "Montenegro",
  dial: "+382"
}, {
  code: "MA",
  name: "Morocco",
  dial: "+212"
}, {
  code: "MZ",
  name: "Mozambique",
  dial: "+258"
}, {
  code: "MM",
  name: "Myanmar",
  dial: "+95"
}, {
  code: "NA",
  name: "Namibia",
  dial: "+264"
}, {
  code: "NR",
  name: "Nauru",
  dial: "+674"
}, {
  code: "NP",
  name: "Nepal",
  dial: "+977"
}, {
  code: "NL",
  name: "Netherlands",
  dial: "+31"
}, {
  code: "NZ",
  name: "New Zealand",
  dial: "+64"
}, {
  code: "NI",
  name: "Nicaragua",
  dial: "+505"
}, {
  code: "NE",
  name: "Niger",
  dial: "+227"
}, {
  code: "NG",
  name: "Nigeria",
  dial: "+234"
}, {
  code: "NO",
  name: "Norway",
  dial: "+47"
}, {
  code: "OM",
  name: "Oman",
  dial: "+968"
}, {
  code: "PK",
  name: "Pakistan",
  dial: "+92"
}, {
  code: "PW",
  name: "Palau",
  dial: "+680"
}, {
  code: "PA",
  name: "Panama",
  dial: "+507"
}, {
  code: "PG",
  name: "Papua New Guinea",
  dial: "+675"
}, {
  code: "PY",
  name: "Paraguay",
  dial: "+595"
}, {
  code: "PE",
  name: "Peru",
  dial: "+51"
}, {
  code: "PH",
  name: "Philippines",
  dial: "+63"
}, {
  code: "PL",
  name: "Poland",
  dial: "+48"
}, {
  code: "PT",
  name: "Portugal",
  dial: "+351"
}, {
  code: "QA",
  name: "Qatar",
  dial: "+974"
}, {
  code: "RO",
  name: "Romania",
  dial: "+40"
}, {
  code: "RU",
  name: "Russia",
  dial: "+7"
}, {
  code: "RW",
  name: "Rwanda",
  dial: "+250"
}, {
  code: "KN",
  name: "Saint Kitts and Nevis",
  dial: "+1-869"
}, {
  code: "LC",
  name: "Saint Lucia",
  dial: "+1-758"
}, {
  code: "VC",
  name: "Saint Vincent and the Grenadines",
  dial: "+1-784"
}, {
  code: "WS",
  name: "Samoa",
  dial: "+685"
}, {
  code: "SM",
  name: "San Marino",
  dial: "+378"
}, {
  code: "ST",
  name: "Sao Tome and Principe",
  dial: "+239"
}, {
  code: "SA",
  name: "Saudi Arabia",
  dial: "+966"
}, {
  code: "SN",
  name: "Senegal",
  dial: "+221"
}, {
  code: "RS",
  name: "Serbia",
  dial: "+381"
}, {
  code: "SC",
  name: "Seychelles",
  dial: "+248"
}, {
  code: "SL",
  name: "Sierra Leone",
  dial: "+232"
}, {
  code: "SG",
  name: "Singapore",
  dial: "+65"
}, {
  code: "SK",
  name: "Slovakia",
  dial: "+421"
}, {
  code: "SI",
  name: "Slovenia",
  dial: "+386"
}, {
  code: "SB",
  name: "Solomon Islands",
  dial: "+677"
}, {
  code: "SO",
  name: "Somalia",
  dial: "+252"
}, {
  code: "ZA",
  name: "South Africa",
  dial: "+27"
}, {
  code: "SS",
  name: "South Sudan",
  dial: "+211"
}, {
  code: "ES",
  name: "Spain",
  dial: "+34"
}, {
  code: "LK",
  name: "Sri Lanka",
  dial: "+94"
}, {
  code: "SD",
  name: "Sudan",
  dial: "+249"
}, {
  code: "SR",
  name: "Suriname",
  dial: "+597"
}, {
  code: "SE",
  name: "Sweden",
  dial: "+46"
}, {
  code: "CH",
  name: "Switzerland",
  dial: "+41"
}, {
  code: "SY",
  name: "Syria",
  dial: "+963"
}, {
  code: "TW",
  name: "Taiwan",
  dial: "+886"
}, {
  code: "TJ",
  name: "Tajikistan",
  dial: "+992"
}, {
  code: "TZ",
  name: "Tanzania",
  dial: "+255"
}, {
  code: "TH",
  name: "Thailand",
  dial: "+66"
}, {
  code: "TL",
  name: "Timor-Leste",
  dial: "+670"
}, {
  code: "TG",
  name: "Togo",
  dial: "+228"
}, {
  code: "TO",
  name: "Tonga",
  dial: "+676"
}, {
  code: "TT",
  name: "Trinidad and Tobago",
  dial: "+1-868"
}, {
  code: "TN",
  name: "Tunisia",
  dial: "+216"
}, {
  code: "TR",
  name: "Turkey",
  dial: "+90"
}, {
  code: "TM",
  name: "Turkmenistan",
  dial: "+993"
}, {
  code: "TV",
  name: "Tuvalu",
  dial: "+688"
}, {
  code: "UG",
  name: "Uganda",
  dial: "+256"
}, {
  code: "UA",
  name: "Ukraine",
  dial: "+380"
}, {
  code: "AE",
  name: "United Arab Emirates",
  dial: "+971"
}, {
  code: "GB",
  name: "United Kingdom",
  dial: "+44"
}, {
  code: "US",
  name: "United States",
  dial: "+1"
}, {
  code: "UY",
  name: "Uruguay",
  dial: "+598"
}, {
  code: "UZ",
  name: "Uzbekistan",
  dial: "+998"
}, {
  code: "VU",
  name: "Vanuatu",
  dial: "+678"
}, {
  code: "VE",
  name: "Venezuela",
  dial: "+58"
}, {
  code: "VN",
  name: "Vietnam",
  dial: "+84"
}, {
  code: "YE",
  name: "Yemen",
  dial: "+967"
}, {
  code: "ZM",
  name: "Zambia",
  dial: "+260"
}, {
  code: "ZW",
  name: "Zimbabwe",
  dial: "+263"
}];
function LoginForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = reactExports.useState(false);
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [showPw, setShowPw] = reactExports.useState(false);
  async function onSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Welcome back!");
      navigate({
        to: "/dashboard"
      });
    } catch (err) {
      toast.error(err?.message ?? "Could not sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "mt-6 space-y-4", onSubmit, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "login-email", children: "Email" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "login-email", type: "email", autoComplete: "email", value: email, onChange: (e) => setEmail(e.target.value), className: "mt-1.5", required: true })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "login-password", children: "Password" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth", className: "text-xs text-brand hover:underline", children: "Forgot?" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "login-password", type: showPw ? "text" : "password", autoComplete: "current-password", value: password, onChange: (e) => setPassword(e.target.value), required: true, className: "pr-10" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShowPw((v) => !v), className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground", children: showPw ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", disabled: loading, className: "w-full", children: [
      loading && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
      "Login"
    ] })
  ] });
}
function RegisterForm({
  defaultRef
}) {
  const navigate = useNavigate();
  const [loading, setLoading] = reactExports.useState(false);
  const [fullName, setFullName] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [country, setCountry] = reactExports.useState("");
  const [dialCode, setDialCode] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [confirmPassword, setConfirmPassword] = reactExports.useState("");
  const [referralCode, setReferralCode] = reactExports.useState(defaultRef ?? "");
  const [showPw, setShowPw] = reactExports.useState(false);
  const [showConfirm, setShowConfirm] = reactExports.useState(false);
  function handleCountryChange(e) {
    const selected = COUNTRIES.find((c) => c.code === e.target.value);
    setCountry(selected?.name ?? "");
    setDialCode(selected?.dial ?? "");
  }
  async function onSubmit(e) {
    e.preventDefault();
    if (!fullName.trim()) {
      toast.error("Full name is required.");
      return;
    }
    if (!country) {
      toast.error("Please select your country.");
      return;
    }
    if (!phone.trim()) {
      toast.error("Phone number is required.");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const fullPhone = `${dialCode}${phone.replace(/^0/, "")}`;
      await register(email, password, fullName, fullPhone, country, referralCode || void 0);
      toast.success("Account created successfully!");
      navigate({
        to: "/dashboard"
      });
    } catch (err) {
      toast.error(err?.message ?? "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "mt-6 space-y-4", onSubmit, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "reg-name", children: [
        "Full Name ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "reg-name", value: fullName, onChange: (e) => setFullName(e.target.value), className: "mt-1.5", placeholder: "John Doe", required: true })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "reg-email", children: [
        "Email ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "reg-email", type: "email", autoComplete: "email", value: email, onChange: (e) => setEmail(e.target.value), className: "mt-1.5", placeholder: "john@example.com", required: true })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "reg-country", children: [
        "Country ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { id: "reg-country", onChange: handleCountryChange, required: true, className: "mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select your country…" }),
        COUNTRIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: c.code, children: [
          c.name,
          " (",
          c.dial,
          ")"
        ] }, c.code))
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "reg-phone", children: [
        "Phone Number ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1.5 flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: dialCode, readOnly: true, className: "bg-muted text-center font-mono text-sm", placeholder: "+1" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "reg-phone", type: "tel", value: phone, onChange: (e) => setPhone(e.target.value), placeholder: "800 000 0000", className: "flex-1", required: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Dial code is filled automatically from country selection." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "reg-password", children: [
        "Password ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "reg-password", type: showPw ? "text" : "password", autoComplete: "new-password", value: password, onChange: (e) => setPassword(e.target.value), required: true, className: "pr-10", placeholder: "Min. 6 characters" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShowPw((v) => !v), className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground", children: showPw ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "reg-confirm", children: [
        "Confirm Password ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "reg-confirm", type: showConfirm ? "text" : "password", autoComplete: "new-password", value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value), required: true, className: "pr-10", placeholder: "Repeat password" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShowConfirm((v) => !v), className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground", children: showConfirm ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }) })
      ] }),
      confirmPassword && password !== confirmPassword && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-red-500", children: "Passwords do not match." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "reg-ref", children: [
        "Referral Code ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "reg-ref", value: referralCode, onChange: (e) => setReferralCode(e.target.value), className: "mt-1.5", placeholder: "e.g. ABC12345" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", disabled: loading, className: "w-full", children: [
      loading && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
      "Create Account"
    ] })
  ] });
}
export {
  AuthPage as component
};
