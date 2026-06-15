import { createFileRoute } from "@tanstack/react-router";
import { MarketPage } from "@/components/site/MarketPage";

export const Route = createFileRoute("/markets/indices")({
  head: () => ({
    meta: [
      { title: "Indices Trading — Balancepoint Capital" },
      { name: "description", content: "Trade the world's largest equity benchmarks." },
      { property: "og:title", content: "Indices — Balancepoint Capital" },
      { property: "og:description", content: "S&P 500, Nasdaq, FTSE, DAX and more." },
    ],
  }),
  component: () => (
    <MarketPage
      slug="indices"
      title="Indices"
      description="The world's largest equity benchmarks."
      blurb="Get broad market exposure with index CFDs. Trade the S&P 500, Nasdaq, FTSE, DAX, Nikkei and more from one account."
      symbols={[
        { s: "FOREXCOM:SPXUSD", d: "S&P 500" },
        { s: "FOREXCOM:NSXUSD", d: "US 100" },
        { s: "FOREXCOM:DJI", d: "Dow 30" },
        { s: "FOREXCOM:UKXGBP", d: "FTSE 100" },
      ]}
      instruments={[
        { name: "S&P 500", spread: "0.3", commission: "Included" },
        { name: "Nasdaq 100", spread: "0.5", commission: "Included" },
        { name: "Dow Jones 30", spread: "1.0", commission: "Included" },
        { name: "FTSE 100", spread: "0.5", commission: "Included" },
        { name: "DAX 40", spread: "0.8", commission: "Included" },
        { name: "Nikkei 225", spread: "5.0", commission: "Included" },
      ]}
    />
  ),
});
