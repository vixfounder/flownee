"use client";

import { useState } from "react";
import { Database, Mic, ShieldCheck, Sparkles, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FlowneeRepository } from "@/lib/storage/database";

export function PrivacyDataSection() {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [busy, setBusy] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function deleteAllLocalData() {
    setBusy(true);
    setErrorMessage("");
    setSuccessMessage("");
    let repository: FlowneeRepository | null = null;

    try {
      repository = await FlowneeRepository.open();
      await repository.clearAll();
      setConfirmDelete(false);
      setSuccessMessage("All Flownee data stored in this browser was deleted.");
    } catch {
      setErrorMessage(
        "Local data could not be deleted. Nothing was partially removed; please try again.",
      );
    } finally {
      repository?.close();
      setBusy(false);
    }
  }

  return (
    <section id="privacy-data" className="scroll-mt-20" aria-labelledby="privacy-data-title">
      <Card tone="scheduled">
        <CardHeader>
          <ShieldCheck aria-hidden="true" className="size-5 text-primary" />
          <CardTitle id="privacy-data-title">Privacy &amp; data</CardTitle>
        </CardHeader>
        <CardContent>
          <h2 className="text-xl font-semibold tracking-[-0.03em]">
            You stay in control.
          </h2>

          <div className="mt-5 space-y-3 text-sm leading-6">
            <div className="flex gap-3 rounded-xl border bg-card p-4">
              <Database aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Stored in this browser</h3>
                <p className="mt-1 text-muted-foreground">
                  Confirmed transcripts, tasks, statuses, and execution plans are kept in this browser&apos;s IndexedDB. Flownee has no user account or cloud task database.
                </p>
              </div>
            </div>

            <div className="flex gap-3 rounded-xl border bg-card p-4">
              <Mic aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Sent for voice processing</h3>
                <p className="mt-1 text-muted-foreground">
                  Audio is sent to OpenAI only after you stop recording. Flownee keeps it temporarily for retry, then releases it after successful transcription or when you discard or close the capture.
                </p>
              </div>
            </div>

            <div className="flex gap-3 rounded-xl border bg-card p-4">
              <Sparkles aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Sent for planning</h3>
                <p className="mt-1 text-muted-foreground">
                  After confirmation, the transcript and compact active-task list are sent for interpretation and planning. Later replans send active tasks only—not audio or completed history.
                </p>
              </div>
            </div>

            <div className="flex gap-3 rounded-xl border bg-secondary/45 p-4">
              <ShieldCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
              <p className="text-muted-foreground">
                Repeated AI requests may be paused briefly to protect the public demo and its budget. Your locally saved flow remains available.
              </p>
            </div>
          </div>

          <div className="mt-6 border-t pt-5">
            <h3 className="font-semibold">Delete all local Flownee data</h3>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              This removes transcripts, tasks, plans, and revision metadata from this browser. It cannot retract requests already processed by OpenAI.
            </p>

            {errorMessage && (
              <p className="mt-3 text-sm text-error-foreground" role="alert">
                {errorMessage}
              </p>
            )}
            {successMessage && (
              <p className="mt-3 text-sm text-completed-foreground" role="status">
                {successMessage}
              </p>
            )}

            <div className="mt-4 flex flex-wrap gap-2">
              {!confirmDelete ? (
                <Button
                  variant="outline"
                  onClick={() => {
                    setConfirmDelete(true);
                    setErrorMessage("");
                    setSuccessMessage("");
                  }}
                  disabled={busy}
                >
                  <Trash2 aria-hidden="true" />
                  Delete local data
                </Button>
              ) : (
                <>
                  <Button
                    variant="destructive"
                    onClick={() => void deleteAllLocalData()}
                    disabled={busy}
                  >
                    {busy ? "Deleting…" : "Yes, delete everything"}
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => setConfirmDelete(false)}
                    disabled={busy}
                  >
                    Keep my data
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
