import { renderToStaticMarkup } from "react-dom/server";
import { CalendarDays, Home } from "lucide-react";
import { describe, expect, it } from "vitest";

import { Badge } from "@/components/ui/badge";
import { BottomNavigation } from "@/components/ui/bottom-navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

describe("Flownee component color variants", () => {
  it("renders primary and secondary action roles", () => {
    const primary = renderToStaticMarkup(<Button>Continue</Button>);
    const secondary = renderToStaticMarkup(
      <Button variant="secondary">Support</Button>,
    );

    expect(primary).toContain("bg-action");
    expect(primary).toContain("text-action-foreground");
    expect(secondary).toContain("border-flow/45");
    expect(secondary).toContain("text-secondary-foreground");
  });

  it("renders task and badge status roles", () => {
    expect(renderToStaticMarkup(<Card tone="next">Next</Card>)).toContain(
      'data-tone="next"',
    );
    expect(
      renderToStaticMarkup(<Badge variant="completed">Done</Badge>),
    ).toContain("bg-completed");
    expect(
      renderToStaticMarkup(<Badge variant="scheduled">Later</Badge>),
    ).toContain("bg-scheduled");
    expect(
      renderToStaticMarkup(<Badge variant="suggested">Idea</Badge>),
    ).toContain("bg-suggested");
  });

  it("renders shared form controls and active navigation", () => {
    expect(renderToStaticMarkup(<Input aria-label="Title" />)).toContain(
      'data-slot="input"',
    );
    expect(renderToStaticMarkup(<Textarea aria-label="Notes" />)).toContain(
      'data-slot="textarea"',
    );
    const navigation = renderToStaticMarkup(
      <BottomNavigation
        activeId="today"
        items={[
          { id: "today", label: "Today", icon: Home },
          { id: "later", label: "Later", icon: CalendarDays },
        ]}
      />,
    );
    expect(navigation).toContain('aria-current="page"');
    expect(navigation).toContain("text-primary");
  });
});
