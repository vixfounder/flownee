import { describe, expect, it } from "vitest";

import { createCapturePlanningRequest } from "@/lib/ai/planning-request";
import type { FlowneeSnapshot, Task, TaskStatus } from "@/lib/storage/schema";

function task(id: string, title: string, status: TaskStatus, contexts: string[]): Task {
  return {
    id,
    title,
    notes: null,
    sourceTranscriptId: "transcript:earlier",
    status,
    statedDeadline: null,
    estimatedEffortMinutes: 10,
    effortSource: "ai-estimate",
    contexts,
    dependencies: [],
    assumptions: [],
    createdAt: "2026-07-19T09:00:00.000Z",
    updatedAt: "2026-07-19T09:00:00.000Z",
  };
}

describe("createCapturePlanningRequest", () => {
  it("sends every active task with each new capture", () => {
    const snapshot: FlowneeSnapshot = {
      taskRevision: 4,
      transcripts: [],
      tasks: [
        task(
          "task:coffee",
          "Buy coffee beans for the coffee machine",
          "active",
          ["grocery shopping"],
        ),
        task("task:call", "Call Maria", "active", ["phone"]),
        task("task:done", "Pay the bill", "completed", ["computer"]),
        task("task:later", "Clean the shed", "postponed", ["home"]),
      ],
      currentPlan: null,
    };

    const request = createCapturePlanningRequest(snapshot, {
      id: "transcript:new",
      text: "Later, buy milk, fish, and green beans.",
    });

    expect(request.activeTasks.map(({ id }) => id)).toEqual([
      "task:coffee",
      "task:call",
    ]);
    expect(request.activeTasks[0]).toMatchObject({
      title: "Buy coffee beans for the coffee machine",
      contexts: ["grocery shopping"],
    });
    expect(request.transcript?.text).toContain("milk, fish, and green beans");
  });
});
