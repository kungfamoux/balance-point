import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/DashboardShell";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { getSession } from "@/lib/auth";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/dashboard/profile")({
  component: Profile,
});

function Profile() {
  const { data, refetch } = useQuery({
    queryKey: ["profile-page"],
    queryFn: async () => {
      const session = getSession();
      const profile = await api.getProfile() as any;
      return { email: session?.user?.email, profile };
    },
  });
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data?.profile) {
      setName((data.profile as any).fullName ?? (data.profile as any).full_name ?? "");
      setCountry((data.profile as any).country ?? "");
      setPhone((data.profile as any).phone ?? "");
    }
  }, [data]);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await api.updateProfile({ fullName: name, country, phone });
      toast.success("Profile saved");
      refetch();
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to save profile");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <PageHeader title="Profile" description="Manage how you appear on the platform." />
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-border">
          <CardContent className="flex flex-col items-center p-6 text-center">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="bg-brand text-2xl text-white">
                {(name || data?.email || "U").slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <p className="mt-4 font-display text-lg font-bold">{name || "Your name"}</p>
            <p className="text-sm text-muted-foreground">{data?.email}</p>
          </CardContent>
        </Card>
        <Card className="border-border lg:col-span-2">
          <CardContent className="p-6">
            <form className="grid gap-4 sm:grid-cols-2" onSubmit={save}>
              <div className="sm:col-span-2">
                <Label>Full name</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} className="mt-2" />
              </div>
              <div>
                <Label>Country</Label>
                <Input value={country} onChange={(e) => setCountry(e.target.value)} className="mt-2" />
              </div>
              <div>
                <Label>Phone</Label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-2" />
              </div>
              <div className="sm:col-span-2">
                <Label>Email</Label>
                <Input value={data?.email ?? ""} readOnly className="mt-2" />
              </div>
              <Button type="submit" disabled={saving} className="sm:col-span-2">
                {saving ? "Saving..." : "Save changes"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
