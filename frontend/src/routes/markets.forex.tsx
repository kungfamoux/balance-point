import { createFileRoute } from "@tanstack/react-router";
import { MarketPage } from "@/components/site/MarketPage";

export const Route = createFileRoute("/markets/forex")({
  head: () => ({
    meta: [
      { title: "Forex Trading — Balancepoint Capital" },
      { name: "description", content: "Trade 182 spot pairs and 140 forwards with spreads from 0.2 pip." },
      { property: "og:title", content: "Forex — Balancepoint Capital" },
      { property: "og:description", content: "Tight-spread FX across majors, minors, exotics and metals." },
    ],
  }),
  component: () => (
    <MarketPage
      slug="forex"
      title="Foreign Exchange"
      description="Trade FX across majors, minors and exotics with tight spreads."
      blurb="182 spot pairs and 140 forwards spanning majors, minors, exotics and metals. Ultra-fast execution and pricing direct from top-tier liquidity providers."
      symbols={[
        { s: "FX:EURUSD", d: "EUR/USD" },
        { s: "FX:GBPUSD", d: "GBP/USD" },
        { s: "FX:USDJPY", d: "USD/JPY" },
        { s: "FX:AUDUSD", d: "AUD/USD" },
      ]}
      instruments={[
        { name: "EUR/USD", spread: "0.2 pip", commission: "$3 / lot" },
        { name: "GBP/USD", spread: "0.4 pip", commission: "$3 / lot" },
        { name: "USD/JPY", spread: "0.3 pip", commission: "$3 / lot" },
        { name: "AUD/USD", spread: "0.5 pip", commission: "$3 / lot" },
        { name: "USD/CHF", spread: "0.6 pip", commission: "$3 / lot" },
        { name: "EUR/GBP", spread: "0.7 pip", commission: "$3 / lot" },
      ]}
    />
  ),
});
