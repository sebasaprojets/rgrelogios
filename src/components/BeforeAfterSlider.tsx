import { useCallback, useRef, useState } from "react";
import { MoveHorizontal } from "lucide-react";

export interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  alt: string;
  className?: string;
  /** `object-position` de cada foto, para enquadrar a peça quando as proporções diferem. */
  beforePosition?: string;
  afterPosition?: string;
}

/**
 * Comparador Antes/Depois com divisor arrastável.
 * Funciona com mouse, toque (pointer events) e teclado (setas), sem dependências externas.
 */
export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  alt,
  className,
  beforePosition = "center",
  afterPosition = "center",
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [touched, setTouched] = useState(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0) return;
    const ratio = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, ratio)));
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
      className={`relative cursor-ew-resize touch-none overflow-hidden bg-[#FAF7F0] outline-none select-none focus-visible:ring-2 focus-visible:ring-[#C5A059] ${className ?? "aspect-[4/3] rounded-2xl"}`}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        setIsDragging(true);
        setTouched(true);
        updateFromClientX(e.clientX);
      }}
      onPointerMove={(e) => {
        if (isDragging) updateFromClientX(e.clientX);
      }}
      onPointerUp={() => setIsDragging(false)}
      onPointerCancel={() => setIsDragging(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") setPosition((p) => Math.max(0, p - 5));
        if (e.key === "ArrowRight") setPosition((p) => Math.min(100, p + 5));
      }}
    >
      <img
        src={afterSrc}
        alt={`${alt} — depois`}
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: afterPosition }}
      />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <img
          src={beforeSrc}
          alt={`${alt} — antes`}
          draggable={false}
          className="h-full w-full object-cover"
          style={{ objectPosition: beforePosition }}
        />
      </div>

      <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-[#1C1917]/80 backdrop-blur">
        Antes
      </span>
      <span className="absolute top-4 right-4 rounded-full bg-[#C5A059] px-3 py-1 text-xs font-medium text-[#14110D]">
        Depois
      </span>

      <div
        className="absolute top-0 bottom-0 w-px bg-white shadow-[0_0_0_1px_rgba(197,160,89,0.6)]"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#C5A059] bg-white text-[#8A6624] shadow-[0_8px_24px_-8px_rgba(28,25,23,0.4)]">
          <MoveHorizontal size={18} />
        </div>
      </div>

      {!touched && (
        <span className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/90 px-3 py-1 text-xs text-[#1C1917]/70 backdrop-blur">
          Arraste para comparar
        </span>
      )}
    </div>
  );
}
