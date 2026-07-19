import type { Metadata } from "next";

import { ColorSystemDemo } from "@/components/design-system/color-system-demo";
import { AppHeader } from "@/components/layout/app-header";

export const metadata: Metadata = {
  title: "Color system",
  robots: { index: false, follow: false },
};

export default function DesignSystemPage() {
  return (
    <>
      <AppHeader contentClassName="max-w-5xl" />
      <ColorSystemDemo />
    </>
  );
}
