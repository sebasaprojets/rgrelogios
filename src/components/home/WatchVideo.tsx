import { useEffect, useRef, useState } from "react";

export interface WatchClip {
  readonly src: string;
  /** Nome curto mostrado na barra de progresso (ex.: "Relógio de pulso"). */
  readonly title: string;
  /** Descrição para leitores de tela. */
  readonly label: string;
}

interface WatchVideoProps {
  readonly clips: readonly WatchClip[];
}

/**
 * Vídeos de relógios desmontando e montando, tocados um depois do outro no
 * mesmo quadro, com transição suave e barra de progresso por vídeo.
 * Com "reduzir movimento" no sistema, fica parado no primeiro quadro do primeiro vídeo.
 */
export function WatchVideo({ clips }: WatchVideoProps) {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // O React não renderiza o atributo `muted` no HTML do servidor, e o
    // navegador bloqueia autoplay de vídeo com som. Força mudo em todos.
    videoRefs.current.forEach((video) => {
      if (video) video.muted = true;
    });
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const video = videoRefs.current[active];
    if (!video) return;

    setProgress(0);
    video.currentTime = 0;
    video.play().catch(() => {
      // Autoplay bloqueado (ex.: modo economia de bateria): fica no quadro atual.
    });
  }, [active]);

  const handleTimeUpdate = (index: number) => {
    const video = videoRefs.current[index];
    if (index !== active || !video?.duration) return;
    setProgress(video.currentTime / video.duration);
  };

  const handleEnded = () => {
    setActive((current) => (current + 1) % clips.length);
  };

  return (
    <div className="relative h-full w-full">
      {clips.map((clip, index) => (
        <video
          key={clip.src}
          ref={(element) => {
            videoRefs.current[index] = element;
          }}
          src={clip.src}
          muted
          loop={clips.length === 1}
          playsInline
          preload="auto"
          aria-label={clip.label}
          aria-hidden={index !== active}
          onTimeUpdate={() => handleTimeUpdate(index)}
          onEnded={handleEnded}
          className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ease-out ${
            index === active ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {clips.length > 1 && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/45 to-transparent px-5 pt-10 pb-4 sm:px-6 sm:pb-5">
          <div className="flex gap-3">
            {clips.map((clip, index) => (
              <div key={clip.src} className="flex-1">
                <p
                  className={`mb-2 text-[11px] tracking-wide transition-colors duration-500 sm:text-xs ${
                    index === active ? "text-white" : "text-white/55"
                  }`}
                >
                  {clip.title}
                </p>
                <div className="h-0.5 overflow-hidden rounded-full bg-white/25">
                  <div
                    className="h-full rounded-full bg-[#D4B473]"
                    style={{
                      width: `${index === active ? progress * 100 : index < active ? 100 : 0}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
