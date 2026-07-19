import { describe, expect, it } from "vitest";

import {
  isFlowneeTheme,
  oppositeFlowneeTheme,
  resolveFlowneeTheme,
} from "@/lib/theme";

describe("Flownee theme preference", () => {
  it("accepts only supported persisted values", () => {
    expect(isFlowneeTheme("light")).toBe(true);
    expect(isFlowneeTheme("dark")).toBe(true);
    expect(isFlowneeTheme("system")).toBe(false);
    expect(isFlowneeTheme(null)).toBe(false);
  });

  it("uses a saved preference before the device preference", () => {
    expect(resolveFlowneeTheme("light", true)).toBe("light");
    expect(resolveFlowneeTheme("dark", false)).toBe("dark");
  });

  it("falls back to the device preference and toggles deterministically", () => {
    expect(resolveFlowneeTheme(null, true)).toBe("dark");
    expect(resolveFlowneeTheme(null, false)).toBe("light");
    expect(oppositeFlowneeTheme("light")).toBe("dark");
    expect(oppositeFlowneeTheme("dark")).toBe("light");
  });
});
