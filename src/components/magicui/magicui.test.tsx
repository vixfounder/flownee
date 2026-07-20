import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { Confetti } from "@/components/magicui/confetti";
import { HyperText } from "@/components/magicui/hyper-text";
import { ShineBorder } from "@/components/magicui/shine-border";

describe("staged Magic UI primitives", () => {
  it("renders Hyper Text with stable accessible copy", () => {
    const markup = renderToStaticMarkup(
      <HyperText
        animateOnHover={false}
        as="h1"
        className="text-lg font-medium text-primary"
      >
        YOUR FLOW. WHAT MAKES SENSE NEXT
      </HyperText>,
    );

    expect(markup).toContain("<h1");
    expect(markup).toContain(
      'aria-label="YOUR FLOW. WHAT MAKES SENSE NEXT"',
    );
    expect(markup).toContain('aria-hidden="true"');
    expect(markup).toContain("text-lg font-medium text-primary");
  });

  it("renders a non-interactive, reduced-motion-safe shine border", () => {
    const markup = renderToStaticMarkup(
      <ShineBorder
        borderWidth={2}
        duration={8}
        shineColor={["#525AFF", "#4AB5B5"]}
      />,
    );

    expect(markup).toContain('aria-hidden="true"');
    expect(markup).toContain("pointer-events-none");
    expect(markup).toContain("motion-safe:animate-shine");
    expect(markup).toContain("motion-reduce:hidden");
    expect(markup).toContain("--border-width:2px");
    expect(markup).toContain("--duration:8s");
  });

  it("supports a reduced-motion-safe single shine pass", () => {
    const markup = renderToStaticMarkup(
      <ShineBorder animation="once" duration={2.5} />,
    );

    expect(markup).toContain("animate-flownee-shine-once");
    expect(markup).not.toContain("motion-safe:animate-shine");
    expect(markup).toContain("motion-reduce:hidden");
    expect(markup).toContain("--duration:2.5s");
  });

  it("supports a reduced-motion-safe repeating shine cycle", () => {
    const markup = renderToStaticMarkup(
      <ShineBorder animation="repeat" duration={5} />,
    );

    expect(markup).toContain("animate-flownee-shine-repeat");
    expect(markup).not.toContain("motion-safe:animate-shine");
    expect(markup).toContain("motion-reduce:hidden");
    expect(markup).toContain("--duration:5s");
  });

  it("renders a manual confetti canvas without starting during render", () => {
    const markup = renderToStaticMarkup(
      <Confetti
        aria-hidden="true"
        className="pointer-events-none"
        manualstart
      />,
    );

    expect(markup).toContain("<canvas");
    expect(markup).toContain('aria-hidden="true"');
    expect(markup).toContain("pointer-events-none");
  });
});
