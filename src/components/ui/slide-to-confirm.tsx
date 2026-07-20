"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

const HANDLE_SIZE = 48;
const TRACK_INSET = 4;
export const SLIDE_CONFIRM_THRESHOLD = 0.75;

export function clampSlideOffset(offset: number, maxTravel: number): number {
  return Math.min(Math.max(offset, 0), Math.max(maxTravel, 0));
}

export function shouldConfirmSlide(
  offset: number,
  maxTravel: number,
): boolean {
  return maxTravel > 0 && offset / maxTravel >= SLIDE_CONFIRM_THRESHOLD;
}

type SlideToConfirmTone = "done" | "later";

type SlideToConfirmProps = {
  label: string;
  confirmedLabel?: string;
  tone: SlideToConfirmTone;
  onConfirm: () => void;
  disabled?: boolean;
  className?: string;
  handleIcon: React.ReactNode;
  decoration?: React.ReactNode;
};

const toneClasses: Record<
  SlideToConfirmTone,
  { track: string; handle: string; progress: string }
> = {
  done: {
    track:
      "border-flow/55 bg-secondary text-secondary-foreground hover:border-flow/75",
    handle: "bg-flow text-[#17213f] ring-flow/20",
    progress: "bg-flow/25",
  },
  later: {
    track:
      "border-support/55 bg-scheduled text-scheduled-foreground hover:border-support/75",
    handle: "bg-support text-[#17213f] ring-support/20",
    progress: "bg-support/25",
  },
};

export function SlideToConfirm({
  label,
  confirmedLabel = label,
  tone,
  onConfirm,
  disabled = false,
  className,
  handleIcon,
  decoration,
}: SlideToConfirmProps) {
  const descriptionId = React.useId();
  const trackRef = React.useRef<HTMLButtonElement>(null);
  const activePointerId = React.useRef<number | null>(null);
  const dragStartX = React.useRef(0);
  const dragStartOffset = React.useRef(0);
  const offsetRef = React.useRef(0);
  const [offset, setOffset] = React.useState(0);
  const [dragging, setDragging] = React.useState(false);
  const [confirmed, setConfirmed] = React.useState(false);

  function maxTravel(): number {
    return Math.max(
      (trackRef.current?.clientWidth ?? 0) - HANDLE_SIZE - TRACK_INSET * 2,
      0,
    );
  }

  function applyOffset(nextOffset: number) {
    offsetRef.current = nextOffset;
    setOffset(nextOffset);
  }

  function confirm(travel: number) {
    if (confirmed || disabled) return;
    applyOffset(travel);
    setConfirmed(true);
    setDragging(false);
    onConfirm();
  }

  function handlePointerDown(event: React.PointerEvent<HTMLButtonElement>) {
    const target = event.target as HTMLElement;
    if (
      disabled ||
      confirmed ||
      event.button !== 0 ||
      !target.closest('[data-slot="slide-handle"]')
    ) {
      return;
    }

    activePointerId.current = event.pointerId;
    dragStartX.current = event.clientX;
    dragStartOffset.current = offsetRef.current;
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLButtonElement>) {
    if (activePointerId.current !== event.pointerId || !dragging) return;
    applyOffset(
      clampSlideOffset(
        dragStartOffset.current + event.clientX - dragStartX.current,
        maxTravel(),
      ),
    );
  }

  function finishPointer(event: React.PointerEvent<HTMLButtonElement>) {
    if (activePointerId.current !== event.pointerId) return;
    const travel = maxTravel();
    activePointerId.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (shouldConfirmSlide(offsetRef.current, travel)) {
      confirm(travel);
    } else {
      applyOffset(0);
      setDragging(false);
    }
  }

  function cancelPointer(event: React.PointerEvent<HTMLButtonElement>) {
    if (activePointerId.current !== event.pointerId) return;
    activePointerId.current = null;
    applyOffset(0);
    setDragging(false);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    confirm(maxTravel());
  }

  const colors = toneClasses[tone];

  return (
    <div className={cn("w-full", className)}>
      <button
        ref={trackRef}
        aria-describedby={descriptionId}
        aria-label={confirmed ? confirmedLabel : label}
        aria-pressed={confirmed}
        className={cn(
          "relative h-14 w-full touch-pan-y overflow-hidden rounded-full border text-center text-sm font-semibold shadow-xs outline-none transition-[border-color,box-shadow,opacity] focus-visible:ring-[3px] focus-visible:ring-ring/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
          colors.track,
        )}
        disabled={disabled}
        data-slot="slide-to-confirm"
        data-tone={tone}
        onKeyDown={handleKeyDown}
        onPointerCancel={cancelPointer}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishPointer}
        type="button"
      >
        {decoration}
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-y-0 left-0 motion-safe:transition-[width] motion-safe:duration-200 motion-safe:ease-out motion-reduce:transition-none",
            dragging && "motion-safe:transition-none",
            colors.progress,
          )}
          data-slot="slide-progress"
          style={{ width: `${offset + TRACK_INSET + HANDLE_SIZE / 2}px` }}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-14 right-2 z-10 flex select-none items-center justify-center text-xs sm:text-sm"
        >
          {confirmed ? confirmedLabel : label}
        </span>
        <span
          aria-hidden="true"
          className={cn(
            "absolute left-1 top-1 z-20 flex size-12 items-center justify-center rounded-full shadow-md ring-2 ring-inset motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-out motion-reduce:transition-none",
            dragging && "motion-safe:transition-none",
            colors.handle,
          )}
          data-slot="slide-handle"
          style={{ transform: `translate3d(${offset}px, 0, 0)` }}
        >
          {handleIcon}
        </span>
      </button>
      <span className="sr-only" id={descriptionId}>
        Drag the handle to the right to confirm. You can also press Enter or
        Space.
      </span>
    </div>
  );
}
