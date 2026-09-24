import { useEffect, useRef, useState } from "react";

interface WatchVideoProps {
  readonly videoSrc: string;
  readonly posterSrc: string;
  readonly alt: string;
}

/**
 * Vídeo em loop (relógio desmontando e montando) com a foto como capa.
 * Mostra só a foto se o vídeo falhar ao carregar; com "reduzir movimento"
 * o vídeo fica parado na capa.
 */
export function WatchVideo({ videoSrc, posterSrc, alt }: WatchVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // O React não renderiza o atributo `muted` no HTML do servidor, e o
    // navegador bloqueia autoplay de vídeo com som. Força mudo e dá play.
    video.muted = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    video.play().catch(() => {
      // Autoplay bloqueado (ex.: modo economia de bateria): fica a capa.
    });
  }, []);

  if (videoFailed) {
    return (
      <img
        src={posterSrc}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover object-[center_62%]"
      />
    );
  }

  return (
    <video
      ref={videoRef}
      src={videoSrc}
      poster={posterSrc}
      muted
      loop
      playsInline
      preload="auto"
      aria-label={alt}
      onError={() => setVideoFailed(true)}
      className="h-full w-full object-cover object-center"
    />
  );
}
