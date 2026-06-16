import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/DashboardShell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useState, useEffect } from "react";
import {
  Radio, Calendar, Clock, Users, Play, Lock,
  Video, Bell, BellOff, X, Loader2,
} from "lucide-react";

export const Route = createFileRoute("/_authenticated/dashboard/live-sessions")({
  component: LiveSessions,
});

type SessionStatus = "live" | "upcoming" | "completed";

const TABS: { label: string; value: SessionStatus | "all" }[] = [
  { label: "All",       value: "all" },
  { label: "Live Now",  value: "live" },
  { label: "Upcoming",  value: "upcoming" },
  { label: "Completed", value: "completed" },
];

function LiveSessions() {
  const [tab, setTab] = useState<SessionStatus | "all">("all");
  const [reminded, setReminded] = useState<Set<string>>(new Set());
  const [watching, setWatching] = useState<any | null>(null);

  const { data: sessions = [], isLoading } = useQuery({
    queryKey: ["live-sessions"],
    queryFn: () => api.getSessions() as Promise<any[]>,
    refetchInterval: 60_000,
  });

  const filtered = tab === "all" ? sessions : sessions.filter((s) => s.status === tab);
  const liveCount = sessions.filter((s) => s.status === "live").length;

  function toggleReminder(id: string) {
    setReminded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  return (
    <>
      <PageHeader
        title="Live Sessions"
        description="Join live trading sessions and webinars hosted by our expert analysts."
      />

      {/* Embed modal */}
      {watching && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={() => setWatching(null)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 flex items-center gap-1 text-sm"
            >
              <X className="h-4 w-4" /> Close
            </button>
            <div className="rounded-xl overflow-hidden aspect-video w-full bg-black">
              <iframe
                src={watching.embedUrl}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="text-white text-sm mt-3 font-semibold">{watching.title}</p>
            <p className="text-gray-400 text-xs mt-0.5">{watching.host} · {watching.role}</p>
          </div>
        </div>
      )}

      {/* Live banner */}
      {liveCount > 0 && (
        <div className="mb-5 flex items-center gap-3 rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-3">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 animate-ping" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500" />
          </span>
          <p className="text-sm font-medium text-red-600 dark:text-red-400">
            {liveCount} session{liveCount > 1 ? "s" : ""} happening live right now
          </p>
        </div>
      )}

      {/* Tabs */}
      <div className="mb-5 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.value}
            onClick={() => setTab(t.value)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
              tab === t.value ? "bg-brand text-white" : "bg-secondary text-muted-foreground hover:bg-secondary/80"
            }`}
          >
            {t.label}
            {t.value === "live" && liveCount > 0 && (
              <span className="ml-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                {liveCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground">
          <Video className="h-10 w-10 mb-3 opacity-30" />
          <p className="font-medium">No sessions yet</p>
          <p className="text-sm mt-1">Check back soon for upcoming live sessions.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((session) => (
            <SessionCard
              key={session.id}
              session={session}
              reminded={reminded.has(session.id)}
              onToggleReminder={() => toggleReminder(session.id)}
              onWatch={() => setWatching(session)}
            />
          ))}
        </div>
      )}
    </>
  );
}

function SessionCard({ session, reminded, onToggleReminder, onWatch }: {
  session: any;
  reminded: boolean;
  onToggleReminder: () => void;
  onWatch: () => void;
}) {
  const status: SessionStatus = session.status;
  const scheduledAt = new Date(session.scheduledAt);

  const statusConfig = {
    live:      { label: "LIVE",      color: "bg-red-600",  dot: true },
    upcoming:  { label: "Upcoming",  color: "bg-blue-600", dot: false },
    completed: { label: "Completed", color: "bg-gray-500", dot: false },
  }[status];

  const canWatch = (status === "live" || status === "completed") && session.embedUrl;

  return (
    <Card className={`border-border hover:shadow-md transition-shadow flex flex-col ${status === "live" ? "ring-1 ring-red-500/30" : ""}`}>
      <CardContent className="p-5 flex flex-col gap-4 flex-1">
        {/* Status badges */}
        <div className="flex items-start justify-between gap-2">
          <Badge className={`${statusConfig.color} text-white text-xs gap-1.5 shrink-0`}>
            {statusConfig.dot && (
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
              </span>
            )}
            {status === "live" ? <Radio className="h-3 w-3" /> : status === "upcoming" ? <Calendar className="h-3 w-3" /> : <Video className="h-3 w-3" />}
            {statusConfig.label}
          </Badge>
          {session.premium && (
            <Badge className="bg-yellow-500 text-white text-xs gap-1 shrink-0">
              <Lock className="h-3 w-3" /> Premium
            </Badge>
          )}
        </div>

        {/* Title & topic */}
        <div>
          <h3 className="font-semibold text-base leading-snug">{session.title}</h3>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{session.topic}</p>
        </div>

        {/* Tags */}
        {session.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {session.tags.map((tag: string) => (
              <span key={tag} className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-muted-foreground">{tag}</span>
            ))}
          </div>
        )}

        {/* Host */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-white text-xs font-bold shrink-0">
            {session.avatarLabel}
          </div>
          <div>
            <p className="text-sm font-medium">{session.host}</p>
            <p className="text-xs text-muted-foreground">{session.role}</p>
          </div>
        </div>

        {/* Date / time / viewers */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {scheduledAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {scheduledAt.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })} UTC
          </span>
          {status === "live" && (
            <span className="flex items-center gap-1 text-red-500 font-medium">
              <Users className="h-3.5 w-3.5" /> Live
            </span>
          )}
          {status === "upcoming" && <Countdown target={scheduledAt} />}
        </div>

        {/* CTA */}
        <div className="mt-auto pt-1">
          {status === "live" && (
            <Button
              className="w-full gap-2 bg-red-600 hover:bg-red-700 text-white"
              onClick={canWatch ? onWatch : undefined}
              disabled={!canWatch}
            >
              <Play className="h-4 w-4" />
              {canWatch ? "Join Live Session" : "Starting Soon…"}
            </Button>
          )}
          {status === "upcoming" && (
            <Button variant="outline" className="w-full gap-2" onClick={onToggleReminder}>
              {reminded ? <><BellOff className="h-4 w-4" /> Remove Reminder</> : <><Bell className="h-4 w-4" /> Set Reminder</>}
            </Button>
          )}
          {status === "completed" && (
            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={canWatch ? onWatch : undefined}
              disabled={!canWatch}
            >
              <Video className="h-4 w-4" />
              {canWatch ? "Watch Recording" : "Recording Coming Soon"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function Countdown({ target }: { target: Date }) {
  const [diff, setDiff] = useState(() => Math.max(0, target.getTime() - Date.now()));

  useEffect(() => {
    const id = setInterval(() => setDiff(Math.max(0, target.getTime() - Date.now())), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (diff <= 0) return <span className="text-red-500 font-medium">Starting now</span>;

  const d = Math.floor(diff / 86_400_000);
  const h = Math.floor((diff % 86_400_000) / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  const s = Math.floor((diff % 60_000) / 1_000);

  return (
    <span className="flex items-center gap-1 text-brand font-medium">
      <Clock className="h-3.5 w-3.5" />
      {d > 0 ? `${d}d ` : ""}{String(h).padStart(2, "0")}:{String(m).padStart(2, "0")}:{String(s).padStart(2, "0")}
    </span>
  );
}
