"use client";

import { CircleHelp, Settings as SettingsIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

const headerLinks = [
  { href: "/help", label: "Help", icon: CircleHelp },
  { href: "/settings", label: "Settings", icon: SettingsIcon },
];

export function HeaderNavigation() {
  const pathname = usePathname();

  return (
    <nav aria-label="Support and settings" className="flex items-center gap-1">
      {headerLinks.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.href;

        return (
          <Button
            key={item.href}
            asChild
            variant={active ? "secondary" : "ghost"}
            size="icon-sm"
          >
            <Link
              href={item.href}
              aria-label={item.label}
              aria-current={active ? "page" : undefined}
              title={item.label}
            >
              <Icon aria-hidden="true" />
            </Link>
          </Button>
        );
      })}
    </nav>
  );
}
