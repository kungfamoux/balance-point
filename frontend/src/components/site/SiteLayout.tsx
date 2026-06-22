import type { ReactNode } from "react";
import { useEffect } from "react";
import { SiteHeader } from "./Header";
import { SiteFooter } from "./Footer";

export function SiteLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Tawk.to Script
    var Tawk_API = (window as any).Tawk_API || {},
      Tawk_LoadStart = new Date();
    (function () {
      var s1 = document.createElement("script"),
        s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = "https://embed.tawk.to/6a33b762d0dd3e1d406c62f2/1jrd08n69";
      s1.charset = "UTF-8";
      s1.setAttribute("crossorigin", "*");
      s0.parentNode!.insertBefore(s1, s0);
    })();
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
