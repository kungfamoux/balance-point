import { Clock, ShieldCheck, Wrench } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { MAINTENANCE_RELEASE_AT } from "@/lib/maintenance";

function getTimeLeft(target: number) {
  const total = Math.max(0, target - Date.now());
  const days = Math.floor(total / 86_400_000);
  const hours = Math.floor((total % 86_400_000) / 3_600_000);
  const minutes = Math.floor((total % 3_600_000) / 60_000);
  const seconds = Math.floor((total % 60_000) / 1_000);

  return { total, days, hours, minutes, seconds };
}

function CountdownUnit({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-white/15 bg-white/10 px-4 py-3 text-center shadow-sm backdrop-blur">
      <p className="font-display text-3xl font-bold text-white sm:text-4xl">{String(value).padStart(2, "0")}</p>
      <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-white/60">{label}</p>
    </div>
  );
}

export function MaintenancePage() {
  const releaseAt = useMemo(() => new Date(MAINTENANCE_RELEASE_AT).getTime(), []);
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(releaseAt));

  useEffect(() => {
    const timer = window.setInterval(() => {
      const next = getTimeLeft(releaseAt);
      setTimeLeft(next);
      if (next.total <= 0) {
        window.clearInterval(timer);
        window.location.reload();
      }
    }, 1_000);

    return () => window.clearInterval(timer);
  }, [releaseAt]);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center px-5 py-12">
        <div className="mb-10 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-400 text-slate-950">
            <Wrench className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">Balancepoint Capital</p>
            <p className="text-sm text-white/55">Scheduled maintenance</p>
          </div>
        </div>

        <section className="max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1 text-sm text-emerald-200">
            <ShieldCheck className="h-4 w-4" />
            Platform upgrade in progress
          </div>
          <h1 className="font-display text-4xl font-bold leading-tight sm:text-6xl">
            We are improving the trading experience.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/68 sm:text-lg">
            The user dashboard and admin area are temporarily unavailable while maintenance is completed. Access will
            resume automatically when the countdown reaches zero.
          </p>
        </section>

        <section className="mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
          <CountdownUnit label="Days" value={timeLeft.days} />
          <CountdownUnit label="Hours" value={timeLeft.hours} />
          <CountdownUnit label="Minutes" value={timeLeft.minutes} />
          <CountdownUnit label="Seconds" value={timeLeft.seconds} />
        </section>

        <div className="mt-10 flex flex-wrap items-center gap-3 text-sm text-white/60">
          <Clock className="h-4 w-4 text-emerald-300" />
          <span>Expected reopening: {new Date(MAINTENANCE_RELEASE_AT).toLocaleString()}</span>
        </div>
      </div>
    </main>
  );
}
