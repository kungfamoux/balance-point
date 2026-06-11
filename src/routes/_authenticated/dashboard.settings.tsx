import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/DashboardShell";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/_authenticated/dashboard/settings")({
  component: Settings,
});

function Settings() {
  return (
    <>
      <PageHeader title="Settings" description="Adjust the way the platform works for you." />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border">
          <CardContent className="space-y-5 p-6">
            <h3 className="font-display text-lg font-bold">Preferences</h3>
            <Row label="Display currency">
              <Select defaultValue="USD">
                <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["USD", "EUR", "GBP", "AUD", "CAD"].map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Row>
            <Row label="Language">
              <Select defaultValue="en">
                <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                </SelectContent>
              </Select>
            </Row>
            <Row label="Theme">
              <Select defaultValue="light">
                <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </Row>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="space-y-5 p-6">
            <h3 className="font-display text-lg font-bold">Notifications</h3>
            <Row label="Email — deposits & withdrawals"><Switch defaultChecked /></Row>
            <Row label="Email — market alerts"><Switch /></Row>
            <Row label="Email — copytrade activity"><Switch defaultChecked /></Row>
            <Row label="Push notifications"><Switch defaultChecked /></Row>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-border p-3">
      <Label className="text-sm">{label}</Label>
      {children}
    </div>
  );
}
