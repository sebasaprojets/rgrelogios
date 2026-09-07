import { useCallback, useRef, useState } from "react";
import { MoveHorizontal } from "lucide-react";

export interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  alt: string;
  className?: string;
}

/**
 * Comparador Antes/Depois com divisor arrastável.
 * Funciona com mouse e toque (pointer events), sem dependências externas.
 */
export function BeforeAfterSlider({ beforeSrc, afterSrc, alt, className }: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

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
      className={`relative overflow-hidden rounded-lg border border-[#C5A059]/20 select-none touch-none cursor-ew-resize ${className ?? "aspect-[4/3]"}`}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        setIsDragging(true);
        updateFromClientX(e.clientX);
      }}
      onPointerMove={(e) => {
        if (isDragging) updateFromClientX(e.clientX);
      }}
      onPointerUp={() => setIsDragging(false)}
      onPointerCancel={() => setIsDragging(false)}
    >
      <img src={afterSrc} alt={`${alt} — depois`} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <img src={beforeSrc} alt={`${alt} — antes`} className="w-full h-full object-cover" />
      </div>


      <span className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-widest bg-[#00050A]/80 text-[#E5D3B3]/80 px-3 py-1.5 rounded border border-[#C5A059]/20">
        Antes
      </span>
      <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-widest bg-[#C5A059] text-[#00050A] px-3 py-1.5 rounded">
        Depois
      </span>

      <div className="absolute top-0 bottom-0 w-[2px] bg-[#C5A059]" style={{ left: `${position}%` }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#00050A] border border-[#C5A059] flex items-center justify-center text-[#C5A059] shadow-2xl">
          <MoveHorizontal size={18} />
        </div>
      </div>

      {!isDragging && (
        <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-widest text-[#E5D3B3]/70 bg-[#00050A]/70 px-3 py-1.5 rounded">
          Arraste para comparar
        </span>
      )}
    </div>
  );
}
