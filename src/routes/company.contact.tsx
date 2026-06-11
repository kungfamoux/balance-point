import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/company/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Balancepoint Capital" },
      { name: "description", content: "Get in touch with our support and sales teams." },
      { property: "og:title", content: "Contact — Balancepoint Capital" },
      { property: "og:description", content: "Reach our team 24/5." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sending, setSending] = useState(false);
  return (
    <section className="bg-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-1">
          <h2 className="font-display text-3xl font-bold">Get in touch</h2>
          <p className="text-muted-foreground">Our team is online 24 hours a day, five days a week.</p>
          <InfoRow icon={Mail} label="Email" value="support@balancepoint.example" />
          <InfoRow icon={Phone} label="Phone" value="+44 20 4577 0000" />
          <InfoRow icon={MapPin} label="Office" value="Canary Wharf, London, UK" />
        </div>
        <Card className="border-border lg:col-span-2">
          <CardContent className="p-6">
            <form
              className="grid gap-4 sm:grid-cols-2"
              onSubmit={(e) => {
                e.preventDefault();
                setSending(true);
                setTimeout(() => {
                  setSending(false);
                  toast.success("Message sent. We'll be in touch shortly.");
                  (e.target as HTMLFormElement).reset();
                }, 700);
              }}
            >
              <Field label="Full name" name="name" required />
              <Field label="Email" name="email" type="email" required />
              <Field label="Subject" name="subject" required className="sm:col-span-2" />
              <div className="sm:col-span-2">
                <Label>Message</Label>
                <Textarea name="message" rows={5} required className="mt-2" />
              </div>
              <Button type="submit" disabled={sending} className="sm:col-span-2">
                {sending ? "Sending..." : "Send message"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function Field({ label, className, ...rest }: any) {
  return (
    <div className={className}>
      <Label>{label}</Label>
      <Input {...rest} className="mt-2" />
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
      <Icon className="mt-0.5 h-5 w-5 text-brand" />
      <div>
        <p className="text-xs uppercase text-muted-foreground">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}
