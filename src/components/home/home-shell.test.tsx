import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import { PlanRecommendation } from "@/components/home/home-shell";
import { sampleHomeState } from "@/lib/home-state";

describe("home recommendation actions", () => {
  it("uses matching primary buttons and a clock for Do later", () => {
    const markup = renderToStaticMarkup(
      <PlanRecommendation
        state={sampleHomeState}
        actionsDisabled={false}
        onComplete={vi.fn()}
        onPostpone={vi.fn()}
        onManage={vi.fn()}
      />,
    );
    const buttons = [...markup.matchAll(/<button\b[^>]*>[\s\S]*?<\/button>/g)].map(
      ([button]) => button,
    );
    const doneButton = buttons.find((button) => button.includes("Done"));
    const laterButton = buttons.find((button) => button.includes("Do later"));

    expect(doneButton).toContain('data-variant="default"');
    expect(laterButton).toContain('data-variant="default"');
    expect(laterButton).toContain("lucide-clock-3");
  });
});
