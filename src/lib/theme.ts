export const FLOWNEE_THEME_STORAGE_KEY = "flownee-theme";

export type FlowneeTheme = "light" | "dark";

export function isFlowneeTheme(value: string | null): value is FlowneeTheme {
  return value === "light" || value === "dark";
}
export function resolveFlowneeTheme(
  storedTheme: string | null,
  prefersDark: boolean,
): FlowneeTheme {
  if (isFlowneeTheme(storedTheme)) return storedTheme;
  return prefersDark ? "dark" : "light";
}

export function oppositeFlowneeTheme(theme: FlowneeTheme): FlowneeTheme {
  return theme === "dark" ? "light" : "dark";
}
