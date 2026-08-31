"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { useTranslation } from "@/context/LanguageContext";

interface IncidentItem {
  incident_number: string;
  severity: string;
  type: string;
  status: string;
  description: string;
  location_text: string | null;
  reported_at: string;
}

export function DashboardOverviewView({
  incidents,
  activeCount,
  criticalCount,
  availableTeams,
  totalTeams,
  utilization,
}: {
  incidents: IncidentItem[];
  activeCount: number;
  criticalCount: number;
  availableTeams: number;
  totalTeams: number;
  utilization: number;
}) {
  const { dict } = useTranslation();

  const stats = [
    {
      label: dict.overview.activeIncidents,
      value: activeCount,
      tone: criticalCount > 0 ? "text-[var(--color-critical)]" : "",
    },
    {
      label: dict.overview.critical,
      value: criticalCount,
      tone: "text-[var(--color-critical)]",
    },
    {
      label: dict.overview.teamsAvailable,
      value: `${availableTeams}/${totalTeams}`,
      tone: "",
    },
    {
      label: dict.overview.shelterUtilization,
      value: `${utilization}%`,
      tone: utilization > 80 ? "text-[var(--color-high)]" : "",
    },
  ];

  const getSeverityLabel = (sev: string) => {
    return (dict.incidents.severities as Record<string, string>)[sev] ?? sev;
  };

  const getCategoryLabel = (cat: string) => {
    return (dict.incidents.categories as Record<string, string>)[cat] ?? cat.replace(/_/g, " ");
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{dict.overview.title}</h1>
        <Link
          href="/dashboard/map"
          className="inline-flex h-10 items-center rounded-lg bg-[var(--color-accent)] px-4 text-sm font-medium text-white hover:bg-blue-800 transition shadow-sm"
        >
          {dict.overview.openMap}
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-[var(--color-border)] bg-white p-4 shadow-sm"
          >
            <div className="text-xs font-medium uppercase tracking-wide text-muted">
              {s.label}
            </div>
            <div className={`mt-1 text-3xl font-bold ${s.tone}`}>{s.value}</div>
          </div>
        ))}
      </div>

      <h2 className="mb-3 mt-8 text-lg font-semibold">{dict.overview.recentIncidents}</h2>
      <div className="space-y-2">
        {incidents.map((i) => (
          <div
            key={i.incident_number}
            className="flex items-center justify-between rounded-xl border border-[var(--color-border)] bg-white p-4 shadow-sm"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-muted">{i.incident_number}</span>
                <Badge label={getSeverityLabel(i.severity)} color={i.severity} />
                <span className="text-sm">{getCategoryLabel(i.type)}</span>
              </div>
              <p className="mt-1 truncate text-sm text-muted">
                {i.description}
                {i.location_text ? ` · ${i.location_text}` : ""}
              </p>
            </div>
            <Badge label={i.status} color={i.status === "REPORTED" ? "MEDIUM" : i.status} />
          </div>
        ))}
        {!incidents.length && (
          <p className="rounded-xl border border-dashed border-[var(--color-border)] p-8 text-center text-sm text-muted">
            {dict.overview.noIncidents}
          </p>
        )}
      </div>
    </div>
  );
}
