import { createFileRoute } from "@tanstack/react-router";
import { MarketPage } from "@/components/site/MarketPage";

export const Route = createFileRoute("/markets/stocks")({
  head: () => ({
    meta: [
      { title: "Stocks Trading — Balancepoint Capital" },
      { name: "description", content: "19,000+ equities across 36 global exchanges with commissions from $3." },
      { property: "og:title", content: "Stocks — Balancepoint Capital" },
      { property: "og:description", content: "Global equities from a single account." },
    ],
  }),
  component: () => (
    <MarketPage
      slug="stocks"
      title="Stocks"
      description="19,000+ equities on 36 global exchanges."
      blurb="Access core and emerging markets from a single account. Trade global blue chips, ETFs and IPOs with commissions starting from $3 on US stocks."
      symbols={[
        { s: "NASDAQ:AAPL", d: "Apple" },
        { s: "NASDAQ:MSFT", d: "Microsoft" },
        { s: "NASDAQ:TSLA", d: "Tesla" },
        { s: "NASDAQ:NVDA", d: "Nvidia" },
      ]}
      instruments={[
        { name: "Apple (AAPL)", spread: "$0.01", commission: "$3 / trade" },
        { name: "Microsoft (MSFT)", spread: "$0.01", commission: "$3 / trade" },
        { name: "Tesla (TSLA)", spread: "$0.02", commission: "$3 / trade" },
        { name: "Nvidia (NVDA)", spread: "$0.02", commission: "$3 / trade" },
        { name: "Amazon (AMZN)", spread: "$0.02", commission: "$3 / trade" },
        { name: "Meta (META)", spread: "$0.02", commission: "$3 / trade" },
      ]}
    />
  ),
});
