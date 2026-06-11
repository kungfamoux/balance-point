import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/DashboardShell";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/dashboard/security")({
  component: Security,
});

function Security() {
  const [pw, setPw] = useState("");
  const [tfa, setTfa] = useState(false);
  const [saving, setSaving] = useState(false);

  async function change(e: React.FormEvent) {
    e.preventDefault();
    if (pw.length < 6) return toast.error("Password must be at least 6 characters");
    setSaving(true);
    const { error } = await supabase.auth.updateUser({ password: pw });
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Password updated");
    setPw("");
  }

  return (
    <>
      <PageHeader title="Security" description="Protect your account with a strong password and 2FA." />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border">
          <CardContent className="p-6">
            <h3 className="font-display text-lg font-bold">Change password</h3>
            <form className="mt-4 space-y-4" onSubmit={change}>
              <div>
                <Label>New password</Label>
                <Input type="password" value={pw} onChange={(e) => setPw(e.target.value)} className="mt-2" />
              </div>
              <Button type="submit" disabled={saving} className="w-full">
                {saving ? "Updating..." : "Update password"}
              </Button>
            </form>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-6">
            <h3 className="font-display text-lg font-bold">Two-factor authentication</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Add an extra layer of security to your account with an authenticator app.
            </p>
            <div className="mt-4 flex items-center justify-between rounded-lg border border-border p-4">
              <div>
                <p className="font-medium">Authenticator app</p>
                <p className="text-xs text-muted-foreground">Use TOTP codes from your authenticator</p>
              </div>
              <Switch checked={tfa} onCheckedChange={setTfa} />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border lg:col-span-2">
          <CardContent className="p-6">
            <h3 className="font-display text-lg font-bold">Active sessions</h3>
            <ul className="mt-4 divide-y divide-border">
              {[
                ["This device", "Active now", true],
                ["Chrome on macOS", "2 days ago", false],
                ["Mobile · iOS", "1 week ago", false],
              ].map(([name, when, current]) => (
                <li key={name as string} className="flex items-center justify-between gap-3 py-3">
                  <div>
                    <p className="font-medium">{name}</p>
                    <p className="text-xs text-muted-foreground">{when}</p>
                  </div>
                  {current ? <Badge>Current</Badge> : <Button variant="outline" size="sm">Revoke</Button>}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
