"use client";

import {
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type RefAttributes,
} from "react";
import {
  motion,
  useReducedMotion,
  type DOMMotionComponents,
  type HTMLMotionProps,
  type MotionProps,
} from "motion/react";

import { cn } from "@/lib/utils";

// Adapted from the MIT-licensed Magic UI Hyper Text component.
// Source: https://magicui.design/docs/components/hyper-text

type CharacterSet = string[] | readonly string[];

const motionElements = {
  article: motion.article,
  div: motion.div,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  h5: motion.h5,
  h6: motion.h6,
  li: motion.li,
  p: motion.p,
  section: motion.section,
  span: motion.span,
} as const;

type MotionElementType = Extract<
  keyof DOMMotionComponents,
  keyof typeof motionElements
>;

type HyperTextMotionComponent = ComponentType<
  Omit<HTMLMotionProps<"div">, "ref"> & RefAttributes<HTMLElement>
>;

interface HyperTextProps extends Omit<MotionProps, "children"> {
  children: string;
  className?: string;
  duration?: number;
  delay?: number;
  as?: MotionElementType;
  startOnView?: boolean;
  animateOnHover?: boolean;
  characterSet?: CharacterSet;
}

const DEFAULT_CHARACTER_SET = Object.freeze(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
) as readonly string[];

function randomCharacter(characterSet: CharacterSet): string {
  return characterSet[Math.floor(Math.random() * characterSet.length)] ?? "";
}

export function HyperText({
  children,
  className,
  duration = 800,
  delay = 0,
  as: Component = "div",
  startOnView = false,
  animateOnHover = true,
  characterSet = DEFAULT_CHARACTER_SET,
  ...props
}: HyperTextProps) {
  const MotionComponent = motionElements[Component] as HyperTextMotionComponent;
  const prefersReducedMotion = useReducedMotion();
  const [displayText, setDisplayText] = useState(() => children.split(""));
  const [isAnimating, setIsAnimating] = useState(false);
  const iterationCount = useRef(0);
  const elementRef = useRef<HTMLElement | null>(null);

  function startAnimation() {
    if (prefersReducedMotion || isAnimating) return;
    iterationCount.current = 0;
    setIsAnimating(true);
  }

  useEffect(() => {
    if (prefersReducedMotion) return;

    let startTimeout: ReturnType<typeof setTimeout> | undefined;
    const beginAfterDelay = () => {
      startTimeout = setTimeout(() => {
        iterationCount.current = 0;
        setIsAnimating(true);
      }, delay);
    };

    if (!startOnView) {
      beginAfterDelay();
      return () => clearTimeout(startTimeout);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        beginAfterDelay();
        observer.disconnect();
      },
      { threshold: 0.1 },
    );

    if (elementRef.current) observer.observe(elementRef.current);

    return () => {
      clearTimeout(startTimeout);
      observer.disconnect();
    };
  }, [children, delay, prefersReducedMotion, startOnView]);

  useEffect(() => {
    if (!isAnimating || prefersReducedMotion) return;

    let animationFrameId: number | null = null;
    const maxIterations = children.length;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      iterationCount.current = progress * maxIterations;
      setDisplayText(
        children.split("").map((letter, index) =>
          letter === " " || index <= iterationCount.current
            ? letter
            : randomCharacter(characterSet),
        ),
      );

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setDisplayText(children.split(""));
        setIsAnimating(false);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => {
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
    };
  }, [characterSet, children, duration, isAnimating, prefersReducedMotion]);

  const visibleText = prefersReducedMotion ? children.split("") : displayText;

  return (
    <MotionComponent
      ref={elementRef}
      aria-label={children}
      className={cn(className)}
      onMouseEnter={() => {
        if (animateOnHover) startAnimation();
      }}
      {...props}
    >
      <span aria-hidden="true">
        {visibleText.map((letter, index) => (
          <span key={index}>{letter}</span>
        ))}
      </span>
    </MotionComponent>
  );
}
