import { createFileRoute } from "@tanstack/react-router";
import { DashboardOutlet } from "@/components/dashboard/DashboardShell";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: DashboardOutlet,
});
