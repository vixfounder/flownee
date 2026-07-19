import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));

import HelpPage from "@/app/help/page";
import SettingsPage from "@/app/settings/page";
import packageMetadata from "../../package.json";

describe("support screens", () => {
  it("renders concise help and recording recovery guidance", () => {
    const markup = renderToStaticMarkup(<HelpPage />);

    expect(markup).toContain("Using Flownee");
    expect(markup).toContain("How it works");
    expect(markup).toContain("Voice tips");
    expect(markup).toContain("Correcting your flow");
    expect(markup).toContain('href="/diagnostics/recording"');
    expect(markup).toContain("Your privacy");
  });

  it("renders appearance, privacy, AI, and product settings", () => {
    const markup = renderToStaticMarkup(<SettingsPage />);

    expect(markup).toContain("Your preferences");
    expect(markup).toContain("Appearance");
    expect(markup).toContain('aria-label="Color theme"');
    expect(markup).toContain("Privacy and local data");
    expect(markup).toContain('href="/?privacy=1"');
    expect(markup).toContain("AI processing");
    expect(markup).toContain("About Flownee");
    expect(markup).toContain("App version");
    expect(markup).toContain(packageMetadata.version);
  });
});
