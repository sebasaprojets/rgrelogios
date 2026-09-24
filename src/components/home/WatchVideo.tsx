import { useState } from "react";
import { useReducedMotion } from "framer-motion";

interface WatchVideoProps {
  readonly videoSrc: string;
  readonly posterSrc: string;
  readonly alt: string;
}

/**
 * Vídeo em loop (relógio desmontando e montando) com a foto como capa.
 * Mostra só a foto se o vídeo ainda não existir, falhar ao carregar
 * ou se o visitante pediu "reduzir movimento" no sistema.
 */
export function WatchVideo({ videoSrc, posterSrc, alt }: WatchVideoProps) {
  const reduceMotion = useReducedMotion();
  const [videoFailed, setVideoFailed] = useState(false);

  const imageClassName =
    "h-full w-full object-cover object-[center_62%] transition-transform duration-[1.2s] ease-out group-hover:scale-105";

  if (reduceMotion || videoFailed) {
    return <img src={posterSrc} alt={alt} loading="lazy" className={imageClassName} />;
  }

  return (
    <video
      src={videoSrc}
      poster={posterSrc}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={alt}
      onError={() => setVideoFailed(true)}
      className="h-full w-full object-cover object-[center_62%]"
    />
  );
}
