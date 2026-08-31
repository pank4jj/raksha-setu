"use client";

import { useLiveData } from "@/hooks/useLiveData";
import { ShelterPanel } from "../ShelterPanel";
import { useTranslation } from "@/context/LanguageContext";

export function SheltersPage() {
  const { shelters, refresh } = useLiveData();
  const { dict } = useTranslation();

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-4 text-2xl font-bold">{dict.shelters.title}</h1>
      <ShelterPanel shelters={shelters} onUpdated={refresh} />
    </div>
  );
}
