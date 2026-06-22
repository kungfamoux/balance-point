import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/DashboardShell";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, ShieldCheck } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/dashboard/kyc")({
  component: KYC,
});

function KYC() {
  const { data: profile, refetch } = useQuery({
    queryKey: ["kyc"],
    queryFn: () => api.getProfile() as any,
  });

  async function submit() {
    try {
      await api.updateProfile({ kycStatus: "pending" } as any);
      refetch();
      toast.success("KYC submitted. We'll review within 24 hours.");
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to submit KYC");
    }
  }

  const status = (profile as any)?.kycStatus ?? (profile as any)?.kyc_status ?? "unverified";
  return (
    <>
      <PageHeader title="Identity verification (KYC)" description="Verify your identity to unlock higher limits.">
        <Badge variant={status === "verified" ? "default" : status === "pending" ? "secondary" : "outline"} className="capitalize">
          {status}
        </Badge>
      </PageHeader>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-border lg:col-span-2">
          <CardContent className="space-y-6 p-6">
            <UploadField icon={FileText} label="Government-issued ID (front)" />
            <UploadField icon={FileText} label="Government-issued ID (back)" />
            <UploadField icon={FileText} label="Proof of address (utility bill or bank statement)" />
            <Button onClick={submit} disabled={status === "pending" || status === "verified"} className="w-full">
              {status === "verified" ? "Verified" : status === "pending" ? "Pending review" : "Submit for review"}
            </Button>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-6 text-sm">
            <ShieldCheck className="h-7 w-7 text-brand" />
            <h3 className="mt-3 font-display text-lg font-bold">Why we ask</h3>
            <p className="mt-2 text-muted-foreground">
              Identity verification protects your account from fraud and keeps the platform compliant with
              global anti-money-laundering regulations.
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function UploadField({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="mt-2 flex items-center gap-3 rounded-lg border border-dashed border-border bg-secondary/30 p-4">
        <Icon className="h-5 w-5 text-muted-foreground" />
        <Input type="file" accept="image/*,application/pdf" className="border-0 bg-transparent p-0" />
      </div>
    </div>
  );
}
