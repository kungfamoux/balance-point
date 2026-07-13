import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "@/lib/adminApi";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, DollarSign, TreeDeciduous, ChevronRight, Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/referrals")({
  component: AdminReferrals,
});

function AdminReferrals() {
  const queryClient = useQueryClient();
  const [searchUserId, setSearchUserId] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const { data: referrals, isLoading: referralsLoading } = useQuery({
    queryKey: ["admin", "referrals"],
    queryFn: adminApi.getReferrals,
  });

  const { data: referralTree, isLoading: treeLoading } = useQuery({
    queryKey: ["admin", "referralTree", selectedUserId],
    queryFn: () => selectedUserId ? adminApi.getReferralTree(selectedUserId) : null,
    enabled: !!selectedUserId,
  });

  const earningsMutation = useMutation({
    mutationFn: ({ id, bonusAmount }: { id: string; bonusAmount: number }) =>
      adminApi.updateReferralEarnings(id, bonusAmount),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "referrals"] });
      if (selectedUserId) {
        queryClient.invalidateQueries({ queryKey: ["admin", "referralTree", selectedUserId] });
      }
      toast.success("Earnings updated");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update earnings");
    },
  });

  const handleViewTree = (userId: string) => {
    setSelectedUserId(userId);
  };

  const handleUpdateEarnings = (referralId: string, currentEarnings: number) => {
    const newEarnings = prompt("Enter new earnings amount:", currentEarnings.toString());
    if (newEarnings !== null) {
      const amount = parseFloat(newEarnings);
      if (!isNaN(amount)) {
        earningsMutation.mutate({ id: referralId, bonusAmount: amount });
      }
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  if (referralsLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Referral Management" description="View and manage referral system" />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* All Referrals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              All Referrals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {referrals && referrals.length > 0 ? (
                referrals.map((referral: any) => (
                  <div
                    key={referral.id}
                    className="p-4 bg-gray-900 border border-gray-700 rounded-lg hover:border-gray-600 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-gray-400 shrink-0">Referrer:</span>
                          <span className="font-medium truncate">{referral.referrer?.email || "N/A"}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm mt-1">
                          <span className="text-gray-400 shrink-0">Referred:</span>
                          <span className="font-medium truncate">{referral.referred?.email || "N/A"}</span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-sm font-medium text-green-400">
                          {formatCurrency(Number(referral.bonusAmount))}
                        </div>
                        <div className="text-xs text-gray-400">
                          {new Date(referral.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 mt-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewTree(referral.referrerId)}
                        className="w-full sm:w-auto"
                      >
                        <TreeDeciduous className="w-4 h-4 mr-1" />
                        View Tree
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleUpdateEarnings(referral.id, Number(referral.bonusAmount))}
                        className="w-full sm:w-auto"
                      >
                        <DollarSign className="w-4 h-4 mr-1" />
                        Adjust Earnings
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-400 py-8">No referrals yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Referral Tree */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TreeDeciduous className="w-5 h-5" />
              Referral Tree
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!selectedUserId ? (
              <div className="text-center py-8 text-gray-400">
                <TreeDeciduous className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Select a referrer to view their referral tree</p>
              </div>
            ) : treeLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : referralTree ? (
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-700/50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-white">Referrer Stats</h3>
                      <p className="text-sm text-gray-400">User ID: {referralTree.userId.slice(0, 8)}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-400">
                        {referralTree.referralCount}
                      </div>
                      <div className="text-xs text-gray-400">Direct Referrals</div>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-700">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Total Earnings</span>
                      <span className="text-lg font-semibold text-green-400">
                        {formatCurrency(Number(referralTree.totalEarnings))}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-300">Direct Referrals</h4>
                  {referralTree.directReferrals && referralTree.directReferrals.length > 0 ? (
                    referralTree.directReferrals.map((ref: any) => (
                      <div
                        key={ref.id}
                        className="p-3 bg-gray-900 border border-gray-700 rounded-lg"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{ref.referred?.fullName || ref.referred?.email}</div>
                            <div className="text-xs text-gray-400">
                              {ref.referred?.email}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-green-400">
                              {formatCurrency(Number(ref.bonusAmount))}
                            </div>
                            <div className="text-xs text-gray-400">
                              {new Date(ref.referred.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-400 py-4 text-sm">No direct referrals</p>
                  )}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedUserId(null)}
                  className="w-full"
                >
                  Clear Selection
                </Button>
              </div>
            ) : (
              <p className="text-center text-gray-400 py-8">Failed to load referral tree</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
