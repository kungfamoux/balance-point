import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, MapPin, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/markets/real-estate")({
  head: () => ({
    meta: [
      { title: "Real Estate Investing — Balancepoint Capital" },
      { name: "description", content: "Crowdfunded real estate slots from $100." },
      { property: "og:title", content: "Real Estate — Balancepoint Capital" },
      { property: "og:description", content: "Diversify into property with small ticket sizes." },
    ],
  }),
  component: RealEstate,
});

const properties = [
  { name: "Mercury Tower", city: "London, UK", price: 100, yield: "8.4%", available: "63%" },
  { name: "Atlas Residences", city: "Berlin, DE", price: 150, yield: "7.1%", available: "41%" },
  { name: "Coral Heights", city: "Miami, US", price: 200, yield: "9.2%", available: "28%" },
  { name: "Aurora Lofts", city: "Toronto, CA", price: 120, yield: "6.8%", available: "52%" },
  { name: "Solstice Plaza", city: "Dubai, AE", price: 250, yield: "10.5%", available: "19%" },
  { name: "Harbour One", city: "Sydney, AU", price: 180, yield: "7.6%", available: "37%" },
];

function RealEstate() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl space-y-12 px-4 py-16 sm:px-6">
        <div className="max-w-3xl">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Real Estate</h2>
          <p className="mt-3 text-muted-foreground">
            Our crowdfunding model makes it simple to participate in property markets for small amounts. Procure slots
            from as little as $100 and earn yield from rent and appreciation.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {properties.map((p) => (
            <Card key={p.name} className="overflow-hidden border-border">
              <div className="brand-gradient flex h-32 items-center justify-center text-white">
                <Building2 className="h-12 w-12 opacity-70" />
              </div>
              <CardContent className="p-5">
                <h3 className="font-display text-lg font-bold">{p.name}</h3>
                <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" /> {p.city}
                </p>
                <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="rounded-md bg-secondary p-2">
                    <p className="text-muted-foreground">From</p>
                    <p className="font-bold text-foreground">${p.price}</p>
                  </div>
                  <div className="rounded-md bg-secondary p-2">
                    <p className="text-muted-foreground">Yield</p>
                    <p className="flex items-center justify-center gap-1 font-bold text-success">
                      <TrendingUp className="h-3 w-3" />{p.yield}
                    </p>
                  </div>
                  <div className="rounded-md bg-secondary p-2">
                    <p className="text-muted-foreground">Avail.</p>
                    <p className="font-bold text-brand">{p.available}</p>
                  </div>
                </div>
                <Button asChild className="mt-4 w-full">
                  <Link to="/auth" search={{ tab: "register" }}>Invest now</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
