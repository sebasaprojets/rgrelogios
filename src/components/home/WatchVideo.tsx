import { useEffect, useRef } from "react";

interface WatchVideoProps {
  readonly src: string;
  readonly label: string;
}

/**
 * Vídeo em loop do relógio desmontando e montando.
 * Com "reduzir movimento" no sistema, fica parado no primeiro quadro.
 */
export function WatchVideo({ src, label }: WatchVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // O React não renderiza o atributo `muted` no HTML do servidor, e o
    // navegador bloqueia autoplay de vídeo com som. Força mudo e dá play.
    video.muted = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    video.play().catch(() => {
      // Autoplay bloqueado (ex.: modo economia de bateria): fica no primeiro quadro.
    });
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      muted
      loop
      playsInline
      preload="auto"
      aria-label={label}
      className="h-full w-full object-cover object-center"
    />
  );
}
