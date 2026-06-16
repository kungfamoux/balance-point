import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/DashboardShell";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { getSession } from "@/lib/auth";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Lock, User, Phone, Globe, Mail, ShieldCheck, CalendarDays } from "lucide-react";

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
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);

  const profile = data?.profile as any;

  useEffect(() => {
    if (profile) {
      setName(profile.fullName ?? profile.full_name ?? "");
      setPhone(profile.phone ?? "");
    }
  }, [profile]);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await api.updateProfile({ fullName: name, phone });
      toast.success("Profile updated successfully.");
      refetch();
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to save profile.");
    } finally {
      setSaving(false);
    }
  }

  const initials = (name || data?.email || "U").slice(0, 2).toUpperCase();
  const kycStatus = profile?.kycStatus ?? profile?.kyc_status ?? "unverified";
  const kycColor: Record<string, string> = {
    verified: "bg-green-600",
    unverified: "bg-yellow-600",
    rejected: "bg-red-600",
  };

  return (
    <>
      <PageHeader title="My Profile" description="View your account details and update your name or phone number." />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Avatar card */}
        <Card className="border-border">
          <CardContent className="flex flex-col items-center p-8 text-center gap-3">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="bg-brand text-2xl text-white font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-display text-lg font-bold">{name || "Your Name"}</p>
              <p className="text-sm text-muted-foreground mt-0.5">{data?.email}</p>
            </div>
            <Badge className={`${kycColor[kycStatus] ?? "bg-gray-500"} text-white text-xs`}>
              <ShieldCheck className="w-3 h-3 mr-1" />
              KYC {kycStatus}
            </Badge>

            {/* Read-only info rows */}
            <div className="mt-4 w-full space-y-3 text-left">
              <InfoRow icon={Globe} label="Country" value={profile?.country ?? "—"} />
              <InfoRow icon={CalendarDays} label="Member since" value={profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "—"} />
              <InfoRow icon={User} label="Referral Code" value={profile?.referralCode ?? profile?.referral_code ?? "—"} mono />
            </div>
          </CardContent>
        </Card>

        {/* Edit form */}
        <Card className="border-border lg:col-span-2">
          <CardContent className="p-6">
            <h2 className="font-semibold text-base mb-5">Edit Information</h2>
            <form className="grid gap-5 sm:grid-cols-2" onSubmit={save}>
              {/* Full Name — editable */}
              <div className="sm:col-span-2">
                <Label htmlFor="p-name" className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" /> Full Name
                </Label>
                <Input id="p-name" value={name} onChange={(e) => setName(e.target.value)}
                  className="mt-1.5" placeholder="Your full name" />
              </div>

              {/* Phone — editable */}
              <div className="sm:col-span-2">
                <Label htmlFor="p-phone" className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" /> Phone Number
                </Label>
                <Input id="p-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                  className="mt-1.5" placeholder="+1 800 000 0000" />
              </div>

              {/* Email — read-only */}
              <div>
                <Label className="flex items-center gap-1.5 text-muted-foreground">
                  <Mail className="w-3.5 h-3.5" /> Email
                  <span className="ml-auto text-xs font-normal flex items-center gap-1"><Lock className="w-3 h-3" />Read-only</span>
                </Label>
                <Input value={data?.email ?? ""} readOnly className="mt-1.5 bg-muted cursor-not-allowed" />
              </div>

              {/* Country — read-only */}
              <div>
                <Label className="flex items-center gap-1.5 text-muted-foreground">
                  <Globe className="w-3.5 h-3.5" /> Country
                  <span className="ml-auto text-xs font-normal flex items-center gap-1"><Lock className="w-3 h-3" />Read-only</span>
                </Label>
                <Input value={profile?.country ?? ""} readOnly className="mt-1.5 bg-muted cursor-not-allowed" />
              </div>

              <div className="sm:col-span-2 flex justify-end pt-2">
                <Button type="submit" disabled={saving} className="px-8">
                  {saving ? "Saving…" : "Save Changes"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function InfoRow({ icon: Icon, label, value, mono }: { icon: any; label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <Icon className="w-4 h-4 text-muted-foreground shrink-0" />
      <span className="text-muted-foreground">{label}:</span>
      <span className={`font-medium truncate ${mono ? "font-mono text-xs" : ""}`}>{value}</span>
    </div>
  );
}
