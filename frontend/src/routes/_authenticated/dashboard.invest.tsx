import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/DashboardShell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CircleCheck } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export const Route = createFileRoute("/_authenticated/dashboard/invest")({
  component: Invest,
});

// Static plan definitions matching the image
const STATIC_PLANS = [
  {
    id: "bronze",
    name: "Bronze",
    price: 1000,
    period: "Month",
    featured: false,
    features: [
      "200+ Pairs",
      "Leverage Up To 1:500",
      "Spreads From 1.2 Pips",
    ],
  },
  {
    id: "silver",
    name: "Silver",
    price: 20000,
    period: "Month",
    featured: false,
    features: [
      "300+ Pairs",
      "Leverage Up To 1:500",
      "Spreads From 0.8 Pips",
    ],
  },
  {
    id: "gold",
    name: "Gold",
    price: 50000,
    period: "Month",
    featured: true,
    features: [
      "400+ Pairs",
      "No Swap Fees",
      "Leverage Up To 1:500",
      "Spreads From 1.2 Pips",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: 100000,
    period: "Month",
    featured: false,
    features: [
      "500+ Pairs",
      "No Swap Fees",
      "Leverage Up To 1:500",
      "Spreads From 0.3 Pips",
    ],
  },
];

function Invest() {
  // Still fetch backend plans for ROI / duration info to enrich cards
  const { data: backendPlans } = useQuery({
    queryKey: ["plans"],
    queryFn: () => api.getPlans() as any,
  });

  const enrich = (staticPlan: (typeof STATIC_PLANS)[0]) => {
    const match = (backendPlans as any[])?.find(
      (p: any) => p.name?.toLowerCase() === staticPlan.name.toLowerCase()
    );
    return {
      ...staticPlan,
      roi: match ? Number(match.roiPercent ?? match.roi_percent) : null,
      duration: match ? (match.durationDays ?? match.duration_days) : null,
      referral: match ? Number(match.referralPercent ?? match.referral_percent) : null,
      backendId: match?.id ?? null,
    };
  };

  const plans = STATIC_PLANS.map(enrich);

  return (
    <>
      <PageHeader
        title="Pricing"
        description="Choose the plan that matches your trading goals and start growing your portfolio."
      />
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>
    </>
  );
}

type EnrichedPlan = (typeof STATIC_PLANS)[0] & { roi: number | null; duration: number | null; referral: number | null; backendId: string | null };

function PlanCard({ plan }: { plan: EnrichedPlan }) {
  const navigate = useNavigate();

  function handleFundTrading() {
    navigate({
      to: "/dashboard/deposit",
      search: { amount: plan.price, plan: plan.name },
    });
  }

  return (
    <Card
      className={`relative overflow-hidden border transition-shadow hover:shadow-lg ${
        plan.featured ? "border-brand shadow-md" : "border-border"
      }`}
    >
      {plan.featured && (
        <div className="absolute right-0 top-0">
          <Badge className="rounded-none rounded-bl-lg bg-brand px-3 py-1 text-xs text-white">
            Popular
          </Badge>
        </div>
      )}
      <CardContent className="p-6">
        {/* Price */}
        <div className="flex items-baseline gap-1">
          <span className="text-xs font-semibold text-muted-foreground align-top mt-1">$</span>
          <span className="font-display text-2xl font-bold">
            {plan.price.toLocaleString()}
          </span>
          <span className="text-sm text-muted-foreground">/{plan.period}</span>
        </div>

        {/* Name */}
        <h3 className="mt-2 font-display text-xl font-semibold">{plan.name}</h3>

        {/* ROI badge if available */}
        {plan.roi && (
          <p className="mt-1 text-sm font-semibold text-brand">{plan.roi}% ROI · {plan.duration} days</p>
        )}

        <hr className="my-4 border-border" />

        {/* Features */}
        <ul className="space-y-2.5">
          {plan.features.map((f: string) => (
            <li key={f} className="flex items-center gap-2 text-sm text-foreground/80">
              <CircleCheck className="h-4 w-4 shrink-0 text-brand" />
              {f}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Button
          className="mt-6 w-full gap-2"
          variant={plan.featured ? "default" : "default"}
          onClick={handleFundTrading}
        >
          Fund Trading <ArrowRight className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
