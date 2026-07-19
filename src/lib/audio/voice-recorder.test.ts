import { describe, expect, it } from "vitest";

import { DEFAULT_MAX_RECORDING_DURATION_MS } from "@/lib/audio/voice-recorder";

describe("voice recorder", () => {
  it("stops recordings after the 30-second default", () => {
    expect(DEFAULT_MAX_RECORDING_DURATION_MS).toBe(30_000);
  });
});
