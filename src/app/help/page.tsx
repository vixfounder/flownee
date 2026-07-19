import type { Metadata } from "next";
import Link from "next/link";
import {
  CheckCircle2,
  CircleHelp,
  Mic,
  RefreshCcw,
} from "lucide-react";

import { PrivacyDataSection } from "@/components/help/privacy-data-section";
import { AppPageShell } from "@/components/layout/app-page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Help",
  description: "Learn how to capture intentions and use your Flownee plan.",
};

const steps = [
  "Tap Add by voice and speak naturally.",
  "Correct the transcript before Flownee interprets it.",
  "Review each intention and its time effort, then add it to your flow.",
  "Return whenever you want to see what makes sense next.",
];

export default function HelpPage() {
  return (
    <AppPageShell
      eyebrow="Help"
      title="Using Flownee"
      description="Capture what is on your mind and let Flownee turn it into a calm, practical next step."
    >
      <Card tone="suggested">
        <CardHeader>
          <CircleHelp aria-hidden="true" className="size-5 text-primary" />
          <CardTitle>How it works</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3 text-sm leading-6">
            {steps.map((step, index) => (
              <li key={step} className="flex gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-important text-xs font-semibold text-important-foreground">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <Mic aria-hidden="true" className="size-5 text-primary" />
          <CardTitle>Voice tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm leading-6 text-muted-foreground">
          <p>Speak one intention or several. You can also add another thought later.</p>
          <p>Mention a deadline or expected duration when you already know it.</p>
          <p>Review the transcript to correct names or speech-recognition mistakes.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <RefreshCcw aria-hidden="true" className="size-5 text-primary" />
          <CardTitle>Correcting your flow</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm leading-6 text-muted-foreground">
          <p>Use Revise transcript before saving an interpretation.</p>
          <p>Edit the intention title or choose another time-effort option.</p>
          <p>After saving, use the task menu to edit, postpone, complete, or delete it.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CheckCircle2 aria-hidden="true" className="size-5 text-primary" />
          <CardTitle>Recording trouble?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-6 text-muted-foreground">
            Check microphone permission and confirm that this browser can create a supported recording.
          </p>
          <Button asChild variant="outline" className="mt-4">
            <Link href="/diagnostics/recording">Check microphone</Link>
          </Button>
        </CardContent>
      </Card>

      <PrivacyDataSection />
    </AppPageShell>
  );
}
