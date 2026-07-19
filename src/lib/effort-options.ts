export const EFFORT_OPTIONS = [
  { minutes: 5, label: "5 minutes", shortLabel: "5′" },
  { minutes: 10, label: "10 minutes", shortLabel: "10′" },
  { minutes: 15, label: "15 minutes", shortLabel: "15′" },
  { minutes: 30, label: "30 minutes", shortLabel: "30′" },
  { minutes: 60, label: "60 minutes", shortLabel: "60′" },
  { minutes: 120, label: "120 minutes or more", shortLabel: "120′+" },
] as const;

export type EffortMinutes = (typeof EFFORT_OPTIONS)[number]["minutes"];

export function isEffortOption(value: unknown): value is EffortMinutes {
  return EFFORT_OPTIONS.some((option) => option.minutes === value);
}

export function effortLabel(minutes: number): string {
  return (
    EFFORT_OPTIONS.find((option) => option.minutes === minutes)?.shortLabel ??
    `${minutes}′`
  );
}
