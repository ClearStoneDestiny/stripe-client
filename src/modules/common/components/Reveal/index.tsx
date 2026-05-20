import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "src/lib/utils";

type RevealTag = "article" | "div" | "h1" | "h2" | "p" | "section";

interface IRevealProps extends HTMLAttributes<HTMLElement> {
  animation?: string;
  as?: RevealTag;
  children: ReactNode;
  delayMs?: number;
  once?: boolean;
  rootMargin?: string;
  threshold?: number;
}

export const Reveal = ({
  animation = "animate__fadeInUp",
  as: Component = "div",
  children,
  className,
  delayMs = 0,
  once = true,
  rootMargin = "0px 0px -12% 0px",
  style,
  threshold = 0.18,
  ...props
}: IRevealProps) => {
  const elementRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) {
      return;
    }

    const reveal = () => setIsVisible(true);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reduceMotion.matches || !("IntersectionObserver" in window)) {
      const frame = window.requestAnimationFrame(reveal);

      return () => window.cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();

          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        rootMargin,
        threshold,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [once, rootMargin, threshold]);

  const revealStyle: CSSProperties = isVisible
    ? {
        ...style,
        animationDelay: `${delayMs}ms`,
      }
    : style ?? {};

  return (
    <Component
      className={cn(
        "opacity-0",
        isVisible && "animate__animated opacity-100",
        isVisible && animation,
        className,
      )}
      ref={(node) => {
        elementRef.current = node;
      }}
      style={revealStyle}
      {...props}
    >
      {children}
    </Component>
  );
};
