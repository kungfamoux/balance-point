import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/company/legal")({
  head: () => ({
    meta: [
      { title: "Legal — Balancepoint Capital" },
      { name: "description", content: "Terms, privacy and regulatory disclosures." },
      { property: "og:title", content: "Legal — Balancepoint Capital" },
      { property: "og:description", content: "Terms, privacy and regulatory information." },
    ],
  }),
  component: Legal,
});

const sections = [
  {
    h: "Terms of Service",
    p: "By accessing this platform you agree to the terms set out in this document. We provide trading services subject to applicable regulation in each jurisdiction. Trading derivatives involves significant risk and may not be suitable for all investors.",
  },
  {
    h: "Privacy Policy",
    p: "We collect only the information needed to provide our services. Personal data is stored securely and never sold to third parties. You can request a copy or deletion of your data at any time.",
  },
  {
    h: "Risk Disclosure",
    p: "Past performance is not indicative of future results. Leveraged products can result in losses that exceed your initial deposit. Please ensure you understand the risks before trading.",
  },
  {
    h: "Regulatory",
    p: "Balancepoint Capital is overseen by leading regulators including the Financial Conduct Authority (FCA). Client funds are segregated and held with tier-one banks.",
  },
];

function Legal() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-3xl space-y-10 px-4 py-16 sm:px-6">
        {sections.map((s) => (
          <article key={s.h}>
            <h2 className="font-display text-2xl font-bold">{s.h}</h2>
            <p className="mt-3 text-muted-foreground">{s.p}</p>
          </article>
        ))}
        <p className="text-xs text-muted-foreground">
          This site is a demonstration project and does not provide real financial services. No content here constitutes financial advice.
        </p>
      </div>
    </section>
  );
}
