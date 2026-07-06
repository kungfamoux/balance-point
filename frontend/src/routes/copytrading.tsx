import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { TrendingUp, Users, Copy, Award } from "lucide-react";

export const Route = createFileRoute("/copytrading")({
  head: () => ({
    meta: [
      { title: "Copytrading — Balancepoint Capital" },
      { name: "description", content: "Follow top-performing traders and mirror their strategies automatically." },
      { property: "og:title", content: "Copytrading — Balancepoint Capital" },
      { property: "og:description", content: "Mirror strategies from top performers, automatically." },
    ],
  }),
  component: Copytrading,
});

const traders = [
  { handle: "@alex_volatility", name: "Alex Reyes", roi: "+182%", followers: 14380, risk: "Medium", strategy: "FX swing" },
  { handle: "@crypto_mira", name: "Mira Kapoor", roi: "+241%", followers: 21750, risk: "High", strategy: "Crypto trend" },
  { handle: "@steady_lin", name: "Linus Park", roi: "+96%", followers: 8120, risk: "Low", strategy: "Index DCA" },
  { handle: "@gold_hunter", name: "Diana Vega", roi: "+134%", followers: 11240, risk: "Medium", strategy: "Commodities" },
  { handle: "@bluechip_tom", name: "Tomás Oliveira", roi: "+78%", followers: 6310, risk: "Low", strategy: "US stocks" },
  { handle: "@scalper_yui", name: "Yui Hayashi", roi: "+312%", followers: 18900, risk: "High", strategy: "FX scalping" },
  { handle: "@vulturetrades", name: "Vulture trades 🦅", roi: null, followers: 186900, risk: "Medium", strategy: "Options trading - here to share knowledge and show the ups and downs of a full time trader. NO PAID SERVICES EVER!" },
  { handle: "@StockOptions888", name: "SniperAlert", roi: "+$6,302,393.49", followers: 121300, risk: "High", strategy: "Multi-millionaire day trader sharing the ins & outs of trading along the way to long term success. NO PAID SERVICE! (03/08/2018 - 12/02/2024)" },
];

function Copytrading() {
  return (
    <SiteLayout>
      <section className="border-b border-border bg-sidebar text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">Copytrading</p>
          <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">Mirror top traders, automatically.</h1>
          <p className="mt-4 max-w-2xl text-white/70">
            Browse a marketplace of vetted traders, follow the strategies that match your goals, and copy every trade
            into your own account in real time.
          </p>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: Users, title: "Browse traders", desc: "Filter by ROI, risk and asset class." },
              { icon: Copy, title: "Allocate capital", desc: "Set how much of your balance to mirror." },
              { icon: TrendingUp, title: "Track performance", desc: "Real-time PnL and trader analytics." },
            ].map((s) => (
              <Card key={s.title} className="border-border">
                <CardContent className="p-6">
                  <s.icon className="h-7 w-7 text-brand" />
                  <h3 className="mt-4 font-display text-lg font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16">
            <div className="flex items-end justify-between">
              <h2 className="font-display text-2xl font-bold sm:text-3xl">Top performers this month</h2>
              <Button asChild variant="ghost"><Link to="/auth" search={{ tab: "register" }}>See all</Link></Button>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {traders.map((t) => (
                <Card key={t.handle} className="border-border">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-brand text-white">{t.name.split(" ").map(n=>n[0]).join("")}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold">{t.name}</p>
                          <Award className="h-4 w-4 text-warning" />
                        </div>
                        <p className="text-xs text-muted-foreground">{t.handle}</p>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="rounded-md bg-secondary p-2"><p className="text-muted-foreground">ROI</p><p className="font-bold text-success">{t.roi ?? "—"}</p></div>
                      <div className="rounded-md bg-secondary p-2"><p className="text-muted-foreground">Risk</p><p className="font-bold">{t.risk}</p></div>
                      <div className="rounded-md bg-secondary p-2"><p className="text-muted-foreground">Followers</p><p className="font-bold">{t.followers.toLocaleString()}</p></div>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">Strategy: <span className="font-medium text-foreground">{t.strategy.length > 60 ? t.strategy.slice(0, 60) + "..." : t.strategy}</span></p>
                    <Button asChild className="mt-4 w-full">
                      <Link to="/auth" search={{ tab: "register" }}>Follow trader</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
