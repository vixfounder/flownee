import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export type BottomNavigationItem = {
  id: string;
  label: string;
  icon: LucideIcon;
};

type BottomNavigationProps = {
  items: BottomNavigationItem[];
  activeId: string;
  onChange?: (id: string) => void;
  className?: string;
};

export function BottomNavigation({
  items,
  activeId,
  onChange,
  className,
}: BottomNavigationProps) {
  return (
    <nav
      aria-label="Example app navigation"
      className={cn(
        "grid border-t border-border bg-surface shadow-[0_-8px_24px_-18px_rgb(23_33_63_/_0.28)]",
        className,
      )}
      style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
    >
      {items.map((item) => {
        const active = item.id === activeId;
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            type="button"
            aria-current={active ? "page" : undefined}
            onClick={() => onChange?.(item.id)}
            className={cn(
              "relative flex min-h-16 flex-col items-center justify-center gap-1 px-2 text-xs font-medium outline-none transition-colors",
              "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
              active ? "text-primary" : "text-scheduled-foreground",
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                "absolute top-0 h-0.5 w-8 rounded-full bg-primary transition-opacity",
                active ? "opacity-100" : "opacity-0",
              )}
            />
            <Icon aria-hidden="true" className="size-5" />
            {item.label}
          </button>
        );
      })}
    </nav>
  );
}
