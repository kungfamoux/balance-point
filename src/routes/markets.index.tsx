import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Bitcoin, BarChart3, Building2, TrendingUp, Wheat, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/markets/")({
  component: Overview,
});

const items = [
  { to: "/markets/forex", icon: LineChart, title: "Forex", desc: "182 spot pairs and 140 forwards, spanning majors to exotics." },
  { to: "/markets/stocks", icon: BarChart3, title: "Stocks", desc: "19,000+ equities on 36 global exchanges." },
  { to: "/markets/crypto", icon: Bitcoin, title: "Crypto", desc: "Top digital assets with tight execution and live signals." },
  { to: "/markets/commodities", icon: Wheat, title: "Commodities", desc: "Energy, metals and agriculture markets in real time." },
  { to: "/markets/indices", icon: TrendingUp, title: "Indices", desc: "Track the world's biggest equity benchmarks." },
  { to: "/markets/real-estate", icon: Building2, title: "Real Estate", desc: "Crowdfunded slots from $100. Diversify into property." },
];

function Overview() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((i) => (
            <Card key={i.to} className="group border-border transition-shadow hover:shadow-lg">
              <CardContent className="p-6">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-brand-soft text-brand">
                  <i.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold">{i.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{i.desc}</p>
                <Button asChild variant="ghost" className="mt-4 px-0 text-brand hover:bg-transparent">
                  <Link to={i.to}>
                    Explore <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
