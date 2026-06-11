import { createFileRoute } from "@tanstack/react-router";
import { MarketPage } from "@/components/site/MarketPage";

export const Route = createFileRoute("/markets/crypto")({
  head: () => ({
    meta: [
      { title: "Crypto Trading — Balancepoint Capital" },
      { name: "description", content: "Trade top cryptocurrencies with tight execution and timely signals." },
      { property: "og:title", content: "Crypto — Balancepoint Capital" },
      { property: "og:description", content: "Top digital assets with tight execution." },
    ],
  }),
  component: () => (
    <MarketPage
      slug="crypto"
      title="Cryptocurrencies"
      description="Top digital assets with tight execution."
      blurb="Trade and invest in top-performing cryptocurrencies. Hold balances in BTC, ETH and stablecoins. Deposit and withdraw 24/7."
      symbols={[
        { s: "BITSTAMP:BTCUSD", d: "Bitcoin" },
        { s: "BITSTAMP:ETHUSD", d: "Ethereum" },
        { s: "BINANCE:SOLUSDT", d: "Solana" },
        { s: "BINANCE:XRPUSDT", d: "XRP" },
      ]}
      instruments={[
        { name: "BTC/USD", spread: "0.4%", commission: "Included" },
        { name: "ETH/USD", spread: "0.4%", commission: "Included" },
        { name: "SOL/USD", spread: "0.6%", commission: "Included" },
        { name: "XRP/USD", spread: "0.6%", commission: "Included" },
        { name: "ADA/USD", spread: "0.8%", commission: "Included" },
        { name: "DOGE/USD", spread: "0.8%", commission: "Included" },
      ]}
    />
  ),
});
