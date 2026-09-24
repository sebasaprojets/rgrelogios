import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

export interface WatchClip {
  readonly src: string;
  /** Primeiro quadro do vídeo; aparece enquanto carrega ou se o aparelho bloquear o autoplay. */
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
 * Se o aparelho bloquear o autoplay (economia de bateria/dados) ou pedir
 * "reduzir movimento", fica a capa com um botão para assistir.
 */
export function WatchVideo({ clips }: WatchVideoProps) {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [blocked, setBlocked] = useState(false);

  const playActive = (index: number) => {
    const video = videoRefs.current[index];
    if (!video) return;
    video.muted = true;
    video
      .play()
      .then(() => setBlocked(false))
      .catch(() => setBlocked(true));
  };

  useEffect(() => {
    // O React não renderiza o atributo `muted` no HTML do servidor, e o
    // navegador bloqueia autoplay de vídeo com som. Força mudo em todos.
    videoRefs.current.forEach((video) => {
      if (video) video.muted = true;
    });
  }, []);

  useEffect(() => {
    const video = videoRefs.current[active];
    if (!video) return;
    setProgress(0);
    video.currentTime = 0;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches && active === 0) {
      setBlocked(true);
      return;
    }
    playActive(active);
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
          poster={clip.poster}
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

      {blocked && (
        <button
          type="button"
          onClick={() => playActive(active)}
          aria-label={`Assistir: ${clips[active]?.label ?? "vídeo"}`}
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#14110D]/70 text-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] backdrop-blur-sm transition-transform duration-300 hover:scale-105">
            <Play size={26} className="ml-1" fill="currentColor" />
          </span>
        </button>
      )}

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
