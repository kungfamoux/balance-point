import { useEffect, useRef } from "react";

type Variant = "ticker-tape" | "symbol-overview" | "advanced-chart" | "market-overview" | "mini-symbol";

interface Props {
  variant: Variant;
  config: Record<string, unknown>;
  height?: number | string;
}

const SRC: Record<Variant, string> = {
  "ticker-tape": "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js",
  "symbol-overview": "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js",
  "advanced-chart": "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js",
  "market-overview": "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js",
  "mini-symbol": "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js",
};

export function TradingViewWidget({ variant, config, height = 400 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    ref.current.innerHTML = "";
    const container = document.createElement("div");
    container.className = "tradingview-widget-container__widget";
    container.style.height = "100%";
    container.style.width = "100%";
    const script = document.createElement("script");
    script.src = SRC[variant];
    script.async = true;
    script.type = "text/javascript";
    script.innerHTML = JSON.stringify(config);
    ref.current.appendChild(container);
    ref.current.appendChild(script);
  }, [variant, JSON.stringify(config)]);
  return (
    <div className="tradingview-widget-container" style={{ height, width: "100%" }} ref={ref} />
  );
}

export function TickerTape() {
  return (
    <TradingViewWidget
      variant="ticker-tape"
      height={46}
      config={{
        symbols: [
          { proName: "FOREXCOM:SPXUSD", title: "S&P 500" },
          { proName: "FOREXCOM:NSXUSD", title: "US 100" },
          { proName: "FX_IDC:EURUSD", title: "EUR/USD" },
          { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
          { proName: "BITSTAMP:ETHUSD", title: "Ethereum" },
          { proName: "NASDAQ:AAPL", title: "Apple" },
          { proName: "NASDAQ:TSLA", title: "Tesla" },
        ],
        showSymbolLogo: true,
        colorTheme: "light",
        isTransparent: false,
        displayMode: "adaptive",
        locale: "en",
      }}
    />
  );
}
