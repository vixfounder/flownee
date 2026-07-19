import { describe, expect, it } from "vitest";

import {
  FLOWNEE_INTENTION_IMAGES,
  FLOWNEE_INTENTION_INTERVAL_MS,
  nextFlowneeIntentionIndex,
  shouldShowFlowneeImageMock,
  type CaptureState,
} from "@/components/voice/voice-capture";

describe("voice capture layout", () => {
  it("shows the Flownee image placeholder only during initial capture", () => {
    const visibleStates: CaptureState[] = ["checking", "requesting", "recording"];
    const hiddenStates: CaptureState[] = [
      "idle",
      "transcribing",
      "review",
      "planning",
      "interpretation",
      "committing",
      "saved",
      "error",
      "planning-error",
      "unavailable",
    ];

    visibleStates.forEach((state) => {
      expect(shouldShowFlowneeImageMock(state)).toBe(true);
    });
    hiddenStates.forEach((state) => {
      expect(shouldShowFlowneeImageMock(state)).toBe(false);
    });
  });

  it("cycles through all four intention layers in order", () => {
    expect(FLOWNEE_INTENTION_INTERVAL_MS).toBe(2000);
    expect(FLOWNEE_INTENTION_IMAGES).toEqual([
      "/images/flownee/intention 1.webp",
      "/images/flownee/intention 2.webp",
      "/images/flownee/intention 3.webp",
      "/images/flownee/intention 4.webp",
    ]);
    expect(nextFlowneeIntentionIndex(0)).toBe(1);
    expect(nextFlowneeIntentionIndex(1)).toBe(2);
    expect(nextFlowneeIntentionIndex(2)).toBe(3);
    expect(nextFlowneeIntentionIndex(3)).toBe(0);
  });
});
