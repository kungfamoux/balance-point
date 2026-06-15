import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import i18n from "./i18n";

// ── Theme ──────────────────────────────────────────────────────────────────
type Theme = "light" | "dark";

function applyTheme(t: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", t === "dark");
}

interface ThemeCtx { theme: Theme; toggle: () => void }
const ThemeContext = createContext<ThemeCtx>({ theme: "light", toggle: () => {} });

// ── Language ──────────────────────────────────────────────────────────────
export type Lang = "en" | "fr" | "ja" | "zh";
export const LANGUAGES: { id: Lang; label: string; flag: string }[] = [
  { id: "en", label: "English",  flag: "🇺🇸" },
  { id: "fr", label: "Français", flag: "🇫🇷" },
  { id: "ja", label: "日本語",    flag: "🇯🇵" },
  { id: "zh", label: "中文",      flag: "🇨🇳" },
];

interface LangCtx { lang: Lang; setLang: (l: Lang) => void }
const LangContext = createContext<LangCtx>({ lang: "en", setLang: () => {} });

// ── Combined Provider ──────────────────────────────────────────────────────
export function AppSettingsProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [lang, setLangState] = useState<Lang>("en");

  // Read from localStorage only on the client after mount
  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    const preferred = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    setTheme(stored ?? preferred);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("lang") as Lang | null;
    if (stored) setLangState(stored);
  }, []);

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("lang", l);
    document.documentElement.lang = l;
    i18n.changeLanguage(l);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      <LangContext.Provider value={{ lang, setLang }}>
        {children}
      </LangContext.Provider>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
export const useLang  = () => useContext(LangContext);
