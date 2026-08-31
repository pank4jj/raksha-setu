import { createClient } from "@/lib/supabase/server";
import { DashboardOverviewView } from "@/components/dashboard/pages/DashboardOverviewView";

export default async function DashboardPage() {
  const supabase = await createClient();

  const [incidents, teams, shelters] = await Promise.all([
    supabase
      .from("incidents")
      .select("incident_number, severity, type, status, description, location_text, reported_at")
      .order("reported_at", { ascending: false })
      .limit(10),
    supabase.from("resource_teams").select("status"),
    supabase.from("shelters").select("total_capacity, current_occupancy"),
  ]);

  const rawIncidents = incidents.data ?? [];
  const activeIncidents = rawIncidents.filter(
    (i) => !["RESOLVED", "CANCELLED"].includes(i.status)
  );
  const critical = activeIncidents.filter((i) => i.severity === "CRITICAL").length;
  const availableTeams = (teams.data ?? []).filter((t) => t.status === "AVAILABLE").length;
  const totalTeams = (teams.data ?? []).length;
  const shelterData = shelters.data ?? [];
  const occupancy = shelterData.reduce((s, x) => s + x.current_occupancy, 0);
  const capacity = shelterData.reduce((s, x) => s + x.total_capacity, 0);
  const utilization = capacity > 0 ? Math.round((occupancy / capacity) * 100) : 0;

  return (
    <DashboardOverviewView
      incidents={rawIncidents}
      activeCount={activeIncidents.length}
      criticalCount={critical}
      availableTeams={availableTeams}
      totalTeams={totalTeams}
      utilization={utilization}
    />
  );
}
