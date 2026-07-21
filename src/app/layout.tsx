import type { Metadata } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";

import { PwaRegister } from "@/components/pwa-register";
import { FLOWNEE_THEME_STORAGE_KEY } from "@/lib/theme";

import "./globals.css";

const plusJakartaSans = localFont({
  display: "swap",
  src: "./fonts/PlusJakartaSans-Variable.woff2",
  style: "normal",
  variable: "--font-plus-jakarta-sans",
  weight: "200 800",
});

export const metadata: Metadata = {
  applicationName: "Flownee",
  title: {
    default: "Flownee",
    template: "%s · Flownee",
  },
  description:
    "A calm, voice-first assistant that helps you decide what to do now.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Flownee",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#10152b" },
  ],
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
};

const themeInitializationScript = `(() => {
  try {
    const stored = window.localStorage.getItem(${JSON.stringify(FLOWNEE_THEME_STORAGE_KEY)});
    const theme = stored === "light" || stored === "dark"
      ? stored
      : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    document.documentElement.style.colorScheme = theme;
  } catch {
    const theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    document.documentElement.classList.add(theme);
    document.documentElement.style.colorScheme = theme;
  }
})();`;

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitializationScript }} />
      </head>
      <body className={plusJakartaSans.variable}>
        {children}
        <PwaRegister />
      </body>
    </html>
  );
}
