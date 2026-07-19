import { describe, expect, it } from "vitest";

import {
  EFFORT_OPTIONS,
  effortLabel,
  isEffortOption,
} from "@/lib/effort-options";

describe("effort options", () => {
  it("exposes exactly the six approved values", () => {
    expect(EFFORT_OPTIONS.map((option) => option.minutes)).toEqual([
      5, 10, 15, 30, 60, 120,
    ]);
  });

  it("formats hour categories and preserves legacy values", () => {
    expect(effortLabel(60)).toBe("60′");
    expect(effortLabel(120)).toBe("120′+");
    expect(effortLabel(25)).toBe("25′");
    expect(isEffortOption(30)).toBe(true);
    expect(isEffortOption(25)).toBe(false);
  });
});
