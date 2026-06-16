import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/DashboardShell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Radio, Calendar, Clock, Users, Play, Lock,
  TrendingUp, Globe, Video, Bell, BellOff,
} from "lucide-react";

export const Route = createFileRoute("/_authenticated/dashboard/live-sessions")({
  component: LiveSessions,
});

type SessionStatus = "live" | "upcoming" | "completed";

interface Session {
  id: number;
  title: string;
  host: string;
  role: string;
  avatar: string;
  status: SessionStatus;
  date: string;
  time: string;
  duration: string;
  viewers?: number;
  topic: string;
  tags: string[];
  premium: boolean;
}

const SESSIONS: Session[] = [
  {
    id: 1,
    title: "BTC/USD Weekly Market Outlook",
    host: "James Whitfield",
    role: "Senior Analyst",
    avatar: "JW",
    status: "live",
    date: "Today",
    time: "Now",
    duration: "60 min",
    viewers: 312,
    topic: "We break down this week's Bitcoin price action, key support/resistance levels and where BTC is likely headed next.",
    tags: ["BTC", "Crypto", "Technical Analysis"],
    premium: false,
  },
  {
    id: 2,
    title: "Forex Scalping Masterclass",
    host: "Amara Osei",
    role: "FX Trader",
    avatar: "AO",
    status: "live",
    date: "Today",
    time: "Now",
    duration: "45 min",
    viewers: 187,
    topic: "Learn how to scalp EUR/USD and GBP/USD with precision entries using M5 & M15 charts.",
    tags: ["EUR/USD", "GBP/USD", "Forex", "Scalping"],
    premium: false,
  },
  {
    id: 3,
    title: "Institutional Order Flow: Gold & Oil",
    host: "Victor Mensah",
    role: "Commodities Lead",
    avatar: "VM",
    status: "upcoming",
    date: "Today",
    time: "3:00 PM UTC",
    duration: "75 min",
    topic: "Deep dive into how institutional players drive commodity prices and how to trade alongside them.",
    tags: ["GOLD", "OIL", "Order Flow", "Commodities"],
    premium: false,
  },
  {
    id: 4,
    title: "Premium: S&P 500 Swing Trade Setup",
    host: "Sarah Chen",
    role: "Equity Strategist",
    avatar: "SC",
    status: "upcoming",
    date: "Tomorrow",
    time: "10:00 AM UTC",
    duration: "90 min",
    topic: "Exclusive premium session covering our high-probability swing trade setups for the S&P 500 and NASDAQ.",
    tags: ["S&P500", "NASDAQ", "Stocks", "Swing Trading"],
    premium: true,
  },
  {
    id: 5,
    title: "Risk Management & Position Sizing",
    host: "James Whitfield",
    role: "Senior Analyst",
    avatar: "JW",
    status: "upcoming",
    date: "Wed, Jun 18",
    time: "2:00 PM UTC",
    duration: "60 min",
    topic: "Master the art of managing risk, calculating position sizes and protecting your capital during volatile markets.",
    tags: ["Risk Management", "Education"],
    premium: false,
  },
  {
    id: 6,
    title: "Altcoin Season: Top 5 Picks",
    host: "Amara Osei",
    role: "FX Trader",
    avatar: "AO",
    status: "completed",
    date: "Yesterday",
    time: "1:00 PM UTC",
    duration: "55 min",
    topic: "A recap of the five altcoins our analysts identified with strong upside potential heading into this cycle.",
    tags: ["Altcoins", "Crypto", "Analysis"],
    premium: false,
  },
  {
    id: 7,
    title: "Psychology of Trading",
    host: "Victor Mensah",
    role: "Commodities Lead",
    avatar: "VM",
    status: "completed",
    date: "Jun 14",
    time: "11:00 AM UTC",
    duration: "50 min",
    topic: "Overcoming FOMO, revenge trading and emotional biases that cost traders money.",
    tags: ["Psychology", "Education"],
    premium: false,
  },
];

const TABS: { label: string; value: SessionStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Live Now", value: "live" },
  { label: "Upcoming", value: "upcoming" },
  { label: "Completed", value: "completed" },
];

function LiveSessions() {
  const [tab, setTab] = useState<SessionStatus | "all">("all");
  const [reminded, setReminded] = useState<Set<number>>(new Set());

  const filtered = tab === "all" ? SESSIONS : SESSIONS.filter((s) => s.status === tab);
  const liveCount = SESSIONS.filter((s) => s.status === "live").length;

  function toggleReminder(id: number) {
    setReminded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <>
      <PageHeader
        title="Live Sessions"
        description="Join live trading sessions and webinars hosted by our expert analysts."
      />

      {/* Live indicator banner */}
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
              tab === t.value
                ? "bg-brand text-white"
                : "bg-secondary text-muted-foreground hover:bg-secondary/80"
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

      {/* Sessions */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((session) => (
          <SessionCard
            key={session.id}
            session={session}
            reminded={reminded.has(session.id)}
            onToggleReminder={() => toggleReminder(session.id)}
          />
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full text-center py-16 text-muted-foreground">No sessions in this category.</p>
        )}
      </div>
    </>
  );
}

function SessionCard({ session, reminded, onToggleReminder }: {
  session: Session; reminded: boolean; onToggleReminder: () => void;
}) {
  const statusConfig = {
    live: { label: "LIVE", color: "bg-red-600", dot: true },
    upcoming: { label: "Upcoming", color: "bg-blue-600", dot: false },
    completed: { label: "Completed", color: "bg-gray-500", dot: false },
  }[session.status];

  return (
    <Card className={`border-border hover:shadow-md transition-shadow ${session.status === "live" ? "ring-1 ring-red-500/30" : ""}`}>
      <CardContent className="p-5 flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <Badge className={`${statusConfig.color} text-white text-xs gap-1.5 shrink-0`}>
            {statusConfig.dot && (
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
              </span>
            )}
            {session.status === "live" ? <Radio className="h-3 w-3" /> : session.status === "upcoming" ? <Calendar className="h-3 w-3" /> : <Video className="h-3 w-3" />}
            {statusConfig.label}
          </Badge>
          {session.premium && (
            <Badge className="bg-yellow-500 text-white text-xs gap-1">
              <Lock className="h-3 w-3" /> Premium
            </Badge>
          )}
        </div>

        {/* Title */}
        <div>
          <h3 className="font-semibold text-base leading-snug">{session.title}</h3>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{session.topic}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {session.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-muted-foreground">{tag}</span>
          ))}
        </div>

        {/* Host */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-white text-xs font-bold shrink-0">
            {session.avatar}
          </div>
          <div>
            <p className="text-sm font-medium">{session.host}</p>
            <p className="text-xs text-muted-foreground">{session.role}</p>
          </div>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {session.date}</span>
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {session.time}</span>
          {session.viewers != null && (
            <span className="flex items-center gap-1 text-red-500 font-medium">
              <Users className="h-3.5 w-3.5" /> {session.viewers.toLocaleString()} watching
            </span>
          )}
        </div>

        {/* CTA */}
        <div className="mt-auto pt-1">
          {session.status === "live" && (
            <Button className="w-full gap-2 bg-red-600 hover:bg-red-700 text-white">
              <Play className="h-4 w-4" /> Join Live Session
            </Button>
          )}
          {session.status === "upcoming" && (
            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={onToggleReminder}
            >
              {reminded
                ? <><BellOff className="h-4 w-4" /> Remove Reminder</>
                : <><Bell className="h-4 w-4" /> Set Reminder</>
              }
            </Button>
          )}
          {session.status === "completed" && (
            <Button variant="outline" className="w-full gap-2" disabled>
              <Video className="h-4 w-4" /> Recording Coming Soon
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
