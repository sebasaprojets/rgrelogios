import { useCallback, useEffect, useRef, useState } from "react";

export interface WatchClip {
  readonly src: string;
  /** Primeiro quadro do vídeo; aparece enquanto carrega. */
  readonly poster: string;
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
 * Tocam sozinhos: se o navegador interromper o play, tenta de novo quando o
 * vídeo estiver pronto; se o aparelho proibir autoplay (ex.: economia de
 * bateria do iPhone), começa no primeiro toque em qualquer lugar da página.
 */
export function WatchVideo({ clips }: WatchVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  const playActive = useCallback(() => {
    const video = videoRefs.current[activeRef.current];
    if (!video || !video.paused) return;
    video.muted = true;
    video.play().catch(() => {
      // Play interrompido enquanto carregava: tenta de novo quando der para tocar.
      video.addEventListener("canplay", () => void video.play().catch(() => {}), { once: true });
    });
  }, []);

  useEffect(() => {
    // O React não renderiza o atributo `muted` no HTML do servidor, e o
    // navegador bloqueia autoplay de vídeo com som. Força mudo em todos.
    videoRefs.current.forEach((video) => {
      if (video) video.muted = true;
    });

    // Aparelhos que só liberam vídeo após uma interação: qualquer toque, clique
    // ou tecla na página dá o play. Também retoma ao voltar para a aba.
    const events = ["pointerdown", "touchend", "click", "keydown"] as const;
    events.forEach((event) => window.addEventListener(event, playActive, { passive: true }));
    const onVisibility = () => {
      if (document.visibilityState === "visible") playActive();
    };
    document.addEventListener("visibilitychange", onVisibility);

    // Alguns navegadores pausam vídeos fora da tela; retoma quando o quadro aparece.
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) playActive();
    });
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      events.forEach((event) => window.removeEventListener(event, playActive));
      document.removeEventListener("visibilitychange", onVisibility);
      observer.disconnect();
    };
  }, [playActive]);

  useEffect(() => {
    activeRef.current = active;
    const video = videoRefs.current[active];
    if (!video) return;
    setProgress(0);
    video.currentTime = 0;
    playActive();
  }, [active, playActive]);

  const handleTimeUpdate = (index: number) => {
    const video = videoRefs.current[index];
    if (index !== active || !video?.duration) return;
    setProgress(video.currentTime / video.duration);
  };

  const handleEnded = () => {
    setActive((current) => (current + 1) % clips.length);
  };

  return (
    <div ref={containerRef} className="relative h-full w-full">
      {clips.map((clip, index) => (
        <video
          key={clip.src}
          ref={(element) => {
            videoRefs.current[index] = element;
          }}
          src={clip.src}
          poster={clip.poster}
          autoPlay={index === 0}
          muted
          loop={clips.length === 1}
          playsInline
          disablePictureInPicture
          preload={index === 0 ? "auto" : "metadata"}
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
