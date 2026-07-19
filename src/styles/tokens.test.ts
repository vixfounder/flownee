import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const tokens = readFileSync(new URL("./tokens.css", import.meta.url), "utf8");
const globals = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");

function luminance(hex: string): number {
  const channels = [1, 3, 5].map((index) =>
    Number.parseInt(hex.slice(index, index + 2), 16) / 255,
  );
  const linear = channels.map((channel) =>
    channel <= 0.04045
      ? channel / 12.92
      : ((channel + 0.055) / 1.055) ** 2.4,
  );
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

function contrast(first: string, second: string): number {
  const firstLuminance = luminance(first);
  const secondLuminance = luminance(second);
  return (
    (Math.max(firstLuminance, secondLuminance) + 0.05) /
    (Math.min(firstLuminance, secondLuminance) + 0.05)
  );
}

describe("Flownee design tokens", () => {
  it("contains the approved brand and neutral palette", () => {
    [
      "#525aff",
      "#4ab5b5",
      "#6d8bc0",
      "#8fd9fb",
      "#f8fafc",
      "#ffffff",
      "#17213f",
      "#667085",
      "#e5eaf2",
    ].forEach((color) => expect(tokens).toContain(color));
  });

  it("defines dark mode, semantic states, and the restricted gradient", () => {
    expect(tokens).toContain(".dark");
    expect(tokens).toContain("prefers-color-scheme: dark");
    expect(tokens).toContain("--success: #4ab5b5");
    expect(tokens).toContain("--warning: #e9a23b");
    expect(tokens).toContain("--error: #d6455d");
    expect(tokens).toContain("--flownee-gradient: linear-gradient(");
    expect(globals).toContain("prefers-reduced-motion: reduce");
  });

  it("keeps approved normal-size text combinations at WCAG AA contrast", () => {
    expect(contrast("#ffffff", "#525aff")).toBeGreaterThanOrEqual(4.5);
    expect(contrast("#17213f", "#4ab5b5")).toBeGreaterThanOrEqual(4.5);
    expect(contrast("#17213f", "#8fd9fb")).toBeGreaterThanOrEqual(4.5);
    expect(contrast("#17213f", "#f8fafc")).toBeGreaterThanOrEqual(4.5);
    expect(contrast("#667085", "#ffffff")).toBeGreaterThanOrEqual(4.5);
    expect(contrast("#ffffff", "#c7354f")).toBeGreaterThanOrEqual(4.5);
    expect(contrast("#737bff", "#181f38")).toBeGreaterThanOrEqual(4.5);
  });
});
