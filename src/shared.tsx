import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "./utils/cn";

export type CartItem = {
  id: string;
  name: string;
  detail?: string;
  price: number;
  qty: number;
};

export type AddToCart = (item: Omit<CartItem, "qty">, qty?: number) => void;

export function useNow(intervalMs = 1000) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), intervalMs);
    return () => clearInterval(t);
  }, [intervalMs]);
  return now;
}

export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "figure";
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={cn("reveal", visible && "is-visible", className)}
      style={{ ["--reveal-delay" as never]: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

export function SectionHeading({
  kicker,
  title,
  desc,
  light,
}: {
  kicker: string;
  title: ReactNode;
  desc?: string;
  light?: boolean;
}) {
  return (
    <Reveal className="max-w-2xl">
      <p
        className={cn(
          "mb-3 inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-bold tracking-[0.18em] uppercase",
          light
            ? "border-butter-400/40 bg-butter-400/10 text-butter-300"
            : "border-cocoa-900/15 bg-white/60 text-cocoa-700"
        )}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-papaya-500" />
        {kicker}
      </p>
      <h2
        className={cn(
          "font-display text-4xl font-extrabold tracking-tight text-balance sm:text-5xl",
          light ? "text-cocoa-50" : "text-cocoa-900"
        )}
      >
        {title}
      </h2>
      {desc && (
        <p className={cn("mt-4 text-base leading-relaxed sm:text-lg", light ? "text-cocoa-100/80" : "text-cocoa-700/80")}>
          {desc}
        </p>
      )}
    </Reveal>
  );
}