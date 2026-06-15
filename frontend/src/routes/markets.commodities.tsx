import { createFileRoute } from "@tanstack/react-router";
import { MarketPage } from "@/components/site/MarketPage";

export const Route = createFileRoute("/markets/commodities")({
  head: () => ({
    meta: [
      { title: "Commodities Trading — Balancepoint Capital" },
      { name: "description", content: "Trade energy, metals and agricultural commodities." },
      { property: "og:title", content: "Commodities — Balancepoint Capital" },
      { property: "og:description", content: "Energy, metals and agriculture markets." },
    ],
  }),
  component: () => (
    <MarketPage
      slug="commodities"
      title="Commodities"
      description="Energy, metals and agricultural commodities."
      blurb="Diversify your portfolio with gold, silver, oil, natural gas and agricultural commodities. Trade futures and CFDs."
      symbols={[
        { s: "TVC:GOLD", d: "Gold" },
        { s: "TVC:SILVER", d: "Silver" },
        { s: "TVC:USOIL", d: "Crude Oil" },
        { s: "TVC:USOIL", d: "Natural Gas" },
      ]}
      instruments={[
        { name: "Gold (XAU/USD)", spread: "0.20", commission: "Included" },
        { name: "Silver (XAG/USD)", spread: "0.03", commission: "Included" },
        { name: "Crude Oil (WTI)", spread: "0.03", commission: "Included" },
        { name: "Brent Oil", spread: "0.03", commission: "Included" },
        { name: "Natural Gas", spread: "0.005", commission: "Included" },
        { name: "Copper", spread: "0.002", commission: "Included" },
      ]}
    />
  ),
});
