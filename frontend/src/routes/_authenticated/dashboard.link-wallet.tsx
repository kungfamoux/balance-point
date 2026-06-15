import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/DashboardShell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/_authenticated/dashboard/link-wallet")({
  component: LinkWallet,
});

const wallets = [
  {
    id: "metamask",
    name: "Metamask",
    icon: "https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg",
  },
  {
    id: "trust",
    name: "Trust Wallet",
    icon: "https://trustwallet.com/assets/images/media/assets/TWT.png",
  },
  {
    id: "phantom",
    name: "Phantom",
    icon: "https://www.phantom.com/img/phantom-icon.png",
  },
  {
    id: "binance",
    name: "Binance",
    icon: "https://cryptologos.cc/logos/binance-coin-bnb-logo.svg",
  },
  {
    id: "okx",
    name: "OKX",
    icon: "https://upload.wikimedia.org/wikipedia/commons/3/37/OKX_logo.svg",
  },
  {
    id: "coinbase",
    name: "Coinbase",
    icon: "https://upload.wikimedia.org/wikipedia/commons/1/1a/24x7tnQN_400x400.jpg",
  },
  {
    id: "rabby",
    name: "Rabby",
    icon: "https://rabby.io/assets/images/rabby-logo.svg",
  },
  {
    id: "safepal",
    name: "Safepal",
    icon: "https://cryptologos.cc/logos/safepal-sfp-logo.svg",
  },
  {
    id: "keplr",
    name: "Keplr",
    icon: "https://www.keplr.app/favicon.ico",
  },
  {
    id: "tokenpocket",
    name: "TokenPocket",
    icon: "https://www.tokenpocket.pro/icon.png",
  },
  {
    id: "exodus",
    name: "Exodus",
    icon: "https://www.exodus.com/img/exodus-logo-icon.svg",
  },
  {
    id: "ledger",
    name: "Ledger Live",
    icon: "https://upload.wikimedia.org/wikipedia/commons/8/83/Ledger_logo.svg",
  },
];

function LinkWallet() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<string | null>(null);
  const [phrase, setPhrase] = useState("");
  const [connecting, setConnecting] = useState(false);

  const selectedWallet = wallets.find((w) => w.id === selected);

  function handleConnect() {
    if (!phrase.trim()) {
      toast.error(t("dashboard.linkWallet.phraseLabel"));
      return;
    }
    setConnecting(true);
    setTimeout(() => {
      setConnecting(false);
      setSelected(null);
      setPhrase("");
      toast.error("Connection failed. Please check your phrase and try again.");
    }, 3000);
  }

  return (
    <>
      <PageHeader
        title={t("dashboard.linkWallet.title")}
        description={t("dashboard.linkWallet.desc")}
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {wallets.map((w) => (
          <Card
            key={w.id}
            className="cursor-pointer border-border transition-all hover:border-brand hover:shadow-md"
            onClick={() => setSelected(w.id)}
          >
            <CardContent className="flex flex-col items-center gap-3 p-5">
              <img
                src={w.icon}
                alt={w.name}
                className="h-14 w-14 rounded-xl object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(w.name)}&background=random&size=56`;
                }}
              />
              <p className="text-center text-sm font-semibold">{w.name}</p>
              <Button variant="outline" size="sm" className="w-full text-xs">
                {t("dashboard.linkWallet.connect")}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selected} onOpenChange={(o) => { if (!o) { setSelected(null); setPhrase(""); } }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              {selectedWallet && (
                <img
                  src={selectedWallet.icon}
                  alt={selectedWallet.name}
                  className="h-8 w-8 rounded-lg object-contain"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedWallet.name)}&background=random&size=32`;
                  }}
                />
              )}
              {t("dashboard.linkWallet.connect")} {selectedWallet?.name}
            </DialogTitle>
            <DialogDescription>{t("dashboard.linkWallet.dialogDesc")}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div>
              <Label htmlFor="phrase">{t("dashboard.linkWallet.phraseLabel")}</Label>
              <textarea
                id="phrase"
                value={phrase}
                onChange={(e) => setPhrase(e.target.value)}
                placeholder={t("dashboard.linkWallet.phrasePlaceholder")}
                rows={4}
                className="mt-2 w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus:border-brand focus:ring-1 focus:ring-brand"
              />
            </div>
            <Button onClick={handleConnect} disabled={connecting} className="w-full">
              {connecting ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> {t("dashboard.linkWallet.connecting")}</>
              ) : (
                t("dashboard.linkWallet.connectWallet")
              )}
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              🔒 {t("dashboard.linkWallet.security")}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
