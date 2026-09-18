import { useCallback, useRef, useState } from "react";
import { MoveHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  alt: string;
  className?: string;
}

export function BeforeAfterSlider({ beforeSrc, afterSrc, alt, className }: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const element = containerRef.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    if (rect.width === 0) return;
    setPosition(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
  }, []);

  return (
    <div
      ref={containerRef}
      role="slider"
      tabIndex={0}
      aria-label={`Comparar antes e depois: ${alt}`}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(position)}
      className={cn("relative aspect-[4/3] cursor-ew-resize touch-none select-none overflow-hidden rounded-md border border-border bg-muted", className)}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") setPosition((value) => Math.max(0, value - 5));
        if (event.key === "ArrowRight") setPosition((value) => Math.min(100, value + 5));
      }}
      onPointerDown={(event) => {
        event.currentTarget.setPointerCapture(event.pointerId);
        setIsDragging(true);
        updateFromClientX(event.clientX);
      }}
      onPointerMove={(event) => isDragging && updateFromClientX(event.clientX)}
      onPointerUp={() => setIsDragging(false)}
      onPointerCancel={() => setIsDragging(false)}
    >
      <img src={afterSrc} alt={`${alt} — depois`} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <img src={beforeSrc} alt={`${alt} — antes`} loading="lazy" className="h-full w-full object-cover" />
      </div>
      <span className="absolute left-3 top-3 rounded-sm bg-background/90 px-2 py-1 text-xs font-bold uppercase text-foreground">Antes</span>
      <span className="absolute right-3 top-3 rounded-sm bg-primary px-2 py-1 text-xs font-bold uppercase text-primary-foreground">Depois</span>
      <div className="absolute inset-y-0 w-px bg-primary" style={{ left: `${position}%` }}>
        <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary bg-background text-primary editorial-shadow">
          <MoveHorizontal className="h-4 w-4" />
        </span>
      </div>
    </div>
  );
}