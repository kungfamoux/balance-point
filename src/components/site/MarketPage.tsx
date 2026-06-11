import { Link } from "@tanstack/react-router";
import { TradingViewWidget } from "@/components/site/TradingViewWidget";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export interface MarketPageProps {
  slug: string;
  title: string;
  description: string;
  blurb: string;
  symbols: { s: string; d: string }[];
  instruments: { name: string; spread: string; commission: string }[];
}

export function MarketPage({ title, blurb, symbols, instruments }: MarketPageProps) {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl space-y-12 px-4 py-16 sm:px-6">
        <div className="max-w-3xl">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">{title}</h2>
          <p className="mt-3 text-muted-foreground">{blurb}</p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <TradingViewWidget
            variant="symbol-overview"
            height={480}
            config={{
              symbols: symbols.map((s) => [s.d, s.s + "|12M"]),
              chartOnly: false,
              width: "100%",
              height: "100%",
              locale: "en",
              colorTheme: "light",
              autosize: true,
              showVolume: false,
              showMA: false,
              hideDateRanges: false,
              hideMarketStatus: false,
              hideSymbolLogo: false,
              scalePosition: "right",
              scaleMode: "Normal",
              fontFamily: "Inter, sans-serif",
              fontSize: "10",
              noTimeScale: false,
              valuesTracking: "1",
              changeMode: "price-and-percent",
              chartType: "area",
              maLineColor: "#2962FF",
              maLineWidth: 1,
              maLength: 9,
              backgroundColor: "rgba(255,255,255,1)",
              lineColor: "rgba(33,150,243,1)",
              topColor: "rgba(33,150,243,0.18)",
              bottomColor: "rgba(33,150,243,0)",
              lineWidth: 2,
              lineType: 0,
            }}
          />
        </div>

        <div>
          <h3 className="font-display text-2xl font-bold">Top instruments</h3>
          <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">
            <table className="w-full text-sm">
              <thead className="bg-secondary/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-5 py-3">Instrument</th>
                  <th className="px-5 py-3">Spread from</th>
                  <th className="px-5 py-3">Commission</th>
                  <th className="px-5 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {instruments.map((i) => (
                  <tr key={i.name}>
                    <td className="px-5 py-3 font-medium">{i.name}</td>
                    <td className="px-5 py-3 text-brand">{i.spread}</td>
                    <td className="px-5 py-3">{i.commission}</td>
                    <td className="px-5 py-3 text-right">
                      <Button asChild size="sm" variant="outline">
                        <Link to="/auth" search={{ tab: "register" }}>Trade</Link>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <Card className="border-brand bg-brand-soft/40">
          <CardContent className="flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center">
            <div>
              <h3 className="font-display text-xl font-bold">Ready to start?</h3>
              <p className="text-sm text-muted-foreground">Open an account in minutes and trade {title.toLowerCase()} with low fees.</p>
            </div>
            <Button asChild>
              <Link to="/auth" search={{ tab: "register" }}>Open an Account</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export function makeRoute(slug: string, meta: MarketPageProps) {
  return createFileRoute(slug as any)({
    head: () => ({
      meta: [
        { title: `${meta.title} — Balancepoint Capital` },
        { name: "description", content: meta.description },
        { property: "og:title", content: `${meta.title} — Balancepoint Capital` },
        { property: "og:description", content: meta.description },
      ],
    }),
    component: () => <MarketPage {...meta} />,
  });
}
