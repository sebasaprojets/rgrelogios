import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export interface WatchPhotoStageProps extends ComponentProps<"div"> {
  src: string;
  alt: string;
  imageClassName?: string;
  priority?: boolean;
}

/** Neutral studio presentation that preserves the source photograph. */
export function WatchPhotoStage({
  src,
  alt,
  className,
  imageClassName,
  priority = false,
  ...props
}: WatchPhotoStageProps) {
  return (
    <div className={cn("watch-studio group/studio", className)} {...props}>
      <div className="watch-studio-ring" aria-hidden="true" />
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        className={cn("watch-studio-image", imageClassName)}
      />
      <div className="watch-studio-shadow" aria-hidden="true" />
    </div>
  );
}