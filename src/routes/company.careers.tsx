import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/company/careers")({
  head: () => ({
    meta: [
      { title: "Careers — Balancepoint Capital" },
      { name: "description", content: "Open roles at Balancepoint Capital." },
      { property: "og:title", content: "Careers — Balancepoint Capital" },
      { property: "og:description", content: "Join the team building the future of trading." },
    ],
  }),
  component: Careers,
});

const roles = [
  { title: "Senior Backend Engineer", team: "Platform", location: "London / Remote", type: "Full-time" },
  { title: "Quant Researcher", team: "Markets", location: "London", type: "Full-time" },
  { title: "Product Designer", team: "Design", location: "Remote (EU)", type: "Full-time" },
  { title: "Compliance Officer", team: "Risk", location: "London", type: "Full-time" },
  { title: "Customer Operations Lead", team: "Support", location: "Singapore", type: "Full-time" },
  { title: "Growth Marketing Manager", team: "Marketing", location: "Remote", type: "Full-time" },
];

function Careers() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Join the team</h2>
          <p className="mt-3 text-muted-foreground">
            We're building the platform that powers the next generation of investors. If that sounds interesting,
            we'd love to hear from you.
          </p>
        </div>
        <div className="mt-10 grid gap-4">
          {roles.map((r) => (
            <Card key={r.title} className="border-border">
              <CardContent className="flex flex-col items-start justify-between gap-3 p-5 sm:flex-row sm:items-center">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-display text-lg font-semibold">{r.title}</p>
                    <Badge variant="secondary">{r.team}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{r.location} · {r.type}</p>
                </div>
                <Button variant="outline">Apply</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
