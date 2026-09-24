import { useEffect, useState } from "react";

/** Hora atual em Curitiba (America/Sao_Paulo), independente do fuso do visitante. */
function nowInCuritiba(): Date {
  return new Date(new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));
}

/** Seg–Sex 09h–18h, Sáb 09h–13h. */
function isStoreOpen(d: Date): boolean {
  const day = d.getDay();
  const minutes = d.getHours() * 60 + d.getMinutes();
  if (day >= 1 && day <= 5) return minutes >= 9 * 60 && minutes < 18 * 60;
  if (day === 6) return minutes >= 9 * 60 && minutes < 13 * 60;
  return false;
}

/** Atualiza a cada segundo; `null` até montar no cliente para evitar divergência de hidratação. */
function useCuritibaTime(): Date | null {
  const [time, setTime] = useState<Date | null>(null);
  useEffect(() => {
    setTime(nowInCuritiba());
    const id = setInterval(() => setTime(nowInCuritiba()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

/** Mostrador analógico minimalista marcando a hora real da loja. */
export function LiveClock() {
  const time = useCuritibaTime();

  // Antes de montar, ponteiros na clássica posição 10:10 das vitrines.
  const h = time ? time.getHours() % 12 : 10;
  const m = time ? time.getMinutes() : 10;
  const s = time ? time.getSeconds() : 0;
  const hourDeg = h * 30 + m * 0.5;
  const minuteDeg = m * 6 + s * 0.1;
  const secondDeg = s * 6;

  return (
    <div className="relative aspect-square w-full max-w-[440px]">
      <svg
        viewBox="0 0 400 400"
        className="h-full w-full"
        role="img"
        aria-label="Relógio marcando a hora atual em Curitiba"
      >
        <circle cx="200" cy="200" r="196" fill="#FFFFFF" stroke="#C5A059" strokeWidth="1.5" />
        <circle cx="200" cy="200" r="180" fill="#FAF7F0" stroke="#1C1917" strokeOpacity="0.08" />
        {Array.from({ length: 60 }, (_, i) => {
          const major = i % 5 === 0;
          return (
            <line
              key={i}
              x1="200"
              y1={major ? 32 : 36}
              x2="200"
              y2={major ? 56 : 44}
              stroke={major ? "#A67C2E" : "#1C1917"}
              strokeOpacity={major ? 1 : 0.25}
              strokeWidth={major ? 3 : 1}
              transform={`rotate(${i * 6} 200 200)`}
            />
          );
        })}
        <text
          x="200"
          y="128"
          textAnchor="middle"
          className="fill-[#1C1917] font-serif"
          fontSize="22"
          letterSpacing="2"
        >
          RG
        </text>
        <text
          x="200"
          y="290"
          textAnchor="middle"
          className="fill-[#1C1917]/50"
          fontSize="10"
          letterSpacing="3"
        >
          CURITIBA · PR
        </text>

        <line
          x1="200"
          y1="200"
          x2="200"
          y2="112"
          stroke="#1C1917"
          strokeWidth="6"
          strokeLinecap="round"
          transform={`rotate(${hourDeg} 200 200)`}
        />
        <line
          x1="200"
          y1="200"
          x2="200"
          y2="70"
          stroke="#1C1917"
          strokeWidth="3.5"
          strokeLinecap="round"
          transform={`rotate(${minuteDeg} 200 200)`}
        />
        {time && (
          <g transform={`rotate(${secondDeg} 200 200)`}>
            <line x1="200" y1="228" x2="200" y2="52" stroke="#C5A059" strokeWidth="1.5" />
          </g>
        )}
        <circle cx="200" cy="200" r="6" fill="#C5A059" />
        <circle cx="200" cy="200" r="2" fill="#1C1917" />
      </svg>
    </div>
  );
}

/** Selo "Aberto agora" / "Fechado" com base no horário de Curitiba. */
export function OpenStatus() {
  const time = useCuritibaTime();
  if (!time) return <span className="inline-block h-8" aria-hidden />;

  const open = isStoreOpen(time);
  const hhmm = time.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[#1C1917]/10 bg-white px-3 py-1.5 text-xs text-[#1C1917]/70">
      <span className="relative flex h-2 w-2">
        {open && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
        )}
        <span
          className={`relative inline-flex h-2 w-2 rounded-full ${open ? "bg-emerald-500" : "bg-[#1C1917]/30"}`}
        />
      </span>
      <span className="whitespace-nowrap">
        {open ? "Aberto agora" : "Fechado agora"} · {hhmm}
        <span className="hidden min-[400px]:inline"> em Curitiba</span>
      </span>
    </span>
  );
}
