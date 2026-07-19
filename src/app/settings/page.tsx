import type { Metadata } from "next";

import { AppPageShell } from "@/components/layout/app-page-shell";
import { SettingsScreen } from "@/components/settings/settings-screen";
import packageMetadata from "../../../package.json";

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage Flownee appearance, privacy, and local data.",
};

export default function SettingsPage() {
  return (
    <AppPageShell
      eyebrow="Settings"
      title="Your preferences"
      description="Adjust Flownee's appearance and review how your local data and AI processing work."
    >
      <SettingsScreen appVersion={packageMetadata.version} />
    </AppPageShell>
  );
}
