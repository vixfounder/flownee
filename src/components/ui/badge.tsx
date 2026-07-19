import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap transition-colors [&>svg]:pointer-events-none [&>svg]:size-3 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-important text-important-foreground [a&]:hover:bg-important/80",
        secondary:
          "border-transparent bg-completed text-completed-foreground [a&]:hover:bg-completed/80",
        destructive:
          "border-destructive/25 bg-destructive/10 text-error-foreground [a&]:hover:bg-destructive/15",
        outline: "text-foreground [a&]:hover:bg-accent",
        important:
          "border-primary/20 bg-important text-important-foreground [a&]:hover:bg-important/80",
        completed:
          "border-flow/25 bg-completed text-completed-foreground [a&]:hover:bg-completed/80",
        scheduled:
          "border-support/30 bg-scheduled text-scheduled-foreground [a&]:hover:bg-scheduled/80",
        suggested:
          "border-highlight/40 bg-suggested text-suggested-foreground [a&]:hover:bg-suggested/80",
        warning:
          "border-warning/35 bg-warning/12 text-warning-foreground [a&]:hover:bg-warning/18",
        error:
          "border-error/30 bg-error/10 text-error-foreground [a&]:hover:bg-error/15",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean;
  }) {
  const Component = asChild ? Slot : "span";

  return (
    <Component
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
