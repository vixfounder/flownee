import type { ReactNode } from "react";

import { AppHeader } from "@/components/layout/app-header";

type AppPageShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

export function AppPageShell({
  eyebrow,
  title,
  description,
  children,
}: AppPageShellProps) {
  return (
    <div className="mx-auto min-h-svh max-w-[430px] border-x border-border/70 bg-background text-foreground shadow-[0_0_45px_-28px_rgb(82_90_255_/_0.3)]">
      <AppHeader />
      <main className="px-4 pb-12 pt-7 sm:px-6 sm:pt-10">
        <div className="mb-7">
          <p className="text-sm font-medium text-primary">{eyebrow}</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-[-0.04em]">
            {title}
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        </div>
        <div className="space-y-4">{children}</div>
      </main>
    </div>
  );
}
