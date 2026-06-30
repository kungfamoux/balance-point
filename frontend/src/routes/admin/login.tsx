import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { adminApi, setAdminToken } from "@/lib/adminApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ShieldCheck, AlertTriangle, X } from "lucide-react";

export const Route = createFileRoute("/admin/login")({
  component: AdminLogin,
});

function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentSuspended, setPaymentSuspended] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  useEffect(() => {
    adminApi.getPaymentStatus()
      .then(data => setPaymentSuspended(data.suspended))
      .catch(() => {})
      .finally(() => setCheckingStatus(false));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (paymentSuspended) return;
    setLoading(true);
    try {
      const { token } = await adminApi.login(email, password);
      setAdminToken(token);
      router.navigate({ to: "/admin" });
    } catch (err: any) {
      toast.error(err.message ?? "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <div className="w-full max-w-sm bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-blue-600 rounded-full p-3 mb-3">
            <ShieldCheck className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-xl font-bold text-white">Admin Portal</h1>
          <p className="text-gray-400 text-sm mt-1">Balance Point Capital</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="text-gray-300 text-sm">Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 bg-gray-800 border-gray-700 text-white"
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <Label className="text-gray-300 text-sm">Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 bg-gray-800 border-gray-700 text-white"
              placeholder="••••••••"
            />
          </div>
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading || paymentSuspended || checkingStatus}>
            {checkingStatus ? "Checking…" : paymentSuspended ? "Suspended" : loading ? "Signing in…" : "Sign In"}
          </Button>
        </form>
      </div>

      {/* Payment Suspended Popup */}
      {paymentSuspended && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-red-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="flex items-start gap-4">
              <div className="bg-red-900/30 rounded-full p-2 flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-2">Payment Suspended</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Admin access has been suspended due to payment issues. Please contact the developer to resolve this.
                </p>
              </div>
              <button
                onClick={() => setPaymentSuspended(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
