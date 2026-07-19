"use client";

import { Brain, Database, Info, Moon, Sun } from "lucide-react";
import Link from "next/link";

import {
  setFlowneeTheme,
  useFlowneeTheme,
} from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type SettingsScreenProps = {
  appVersion: string;
};

export function SettingsScreen({ appVersion }: SettingsScreenProps) {
  const theme = useFlowneeTheme();

  return (
    <>
      <Card>
        <CardHeader>
          <Sun aria-hidden="true" className="size-5 text-primary" />
          <CardTitle>Appearance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2" role="group" aria-label="Color theme">
            <Button
              variant={theme === "light" ? "secondary" : "outline"}
              aria-pressed={theme === "light"}
              onClick={() => setFlowneeTheme("light")}
            >
              <Sun aria-hidden="true" />
              Light
            </Button>
            <Button
              variant={theme === "dark" ? "secondary" : "outline"}
              aria-pressed={theme === "dark"}
              onClick={() => setFlowneeTheme("dark")}
            >
              <Moon aria-hidden="true" />
              Dark
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <Database aria-hidden="true" className="size-5 text-primary" />
          <CardTitle>Privacy and local data</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-6 text-muted-foreground">
            Confirmed transcripts, tasks, and plans are stored in this browser. Open the existing controls to review the data boundaries or delete everything locally.
          </p>
          <Button asChild variant="outline" className="mt-4">
            <Link href="/help#privacy-data">Open privacy and data controls</Link>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <Brain aria-hidden="true" className="size-5 text-primary" />
          <CardTitle>AI processing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm leading-6 text-muted-foreground">
          <p>Audio is sent to OpenAI only after you stop recording.</p>
          <p>The confirmed transcript and active tasks are used to interpret intentions and update the execution plan.</p>
          <p>Flownee does not keep your audio after successful transcription.</p>
        </CardContent>
      </Card>

      <Card tone="suggested">
        <CardHeader>
          <Info aria-hidden="true" className="size-5 text-primary" />
          <CardTitle>About Flownee</CardTitle>
        </CardHeader>
        <CardContent className="text-sm leading-6 text-muted-foreground">
          <p>
            Flownee is a voice-first, local-first productivity assistant that turns everyday intentions into a practical answer to what makes sense next.
          </p>
          <p className="mt-4 border-t border-border pt-4">
            <span className="font-semibold text-foreground">App version</span>{" "}
            {appVersion}
          </p>
        </CardContent>
      </Card>
    </>
  );
}
