import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import {
  clampSlideOffset,
  shouldConfirmSlide,
  SlideToConfirm,
  SLIDE_CONFIRM_THRESHOLD,
} from "@/components/ui/slide-to-confirm";

describe("SlideToConfirm", () => {
  it("renders as an accessible native button with keyboard guidance", () => {
    const markup = renderToStaticMarkup(
      <SlideToConfirm
        confirmedLabel="Marked done"
        handleIcon={<span>✓</span>}
        label="Slide to mark done"
        onConfirm={() => undefined}
        tone="done"
      />,
    );

    expect(markup).toContain("<button");
    expect(markup).toContain('aria-label="Slide to mark done"');
    expect(markup).toContain('aria-pressed="false"');
    expect(markup).toContain("press Enter or Space");
    expect(markup).toContain("touch-pan-y");
    expect(markup).toContain("rounded-full");
    expect(markup).toContain('data-slot="slide-progress"');
  });

  it("clamps drag movement to the available track", () => {
    expect(clampSlideOffset(-20, 200)).toBe(0);
    expect(clampSlideOffset(80, 200)).toBe(80);
    expect(clampSlideOffset(260, 200)).toBe(200);
  });

  it("confirms only after the drag reaches the threshold", () => {
    expect(SLIDE_CONFIRM_THRESHOLD).toBe(0.75);
    expect(shouldConfirmSlide(149, 200)).toBe(false);
    expect(shouldConfirmSlide(150, 200)).toBe(true);
  });

  it("never confirms when the track has no travel", () => {
    expect(shouldConfirmSlide(0, 0)).toBe(false);
  });
});
