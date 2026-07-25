import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { ImageOff } from "lucide-react";

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
  className?: string;
  containerClassName?: string;
}

export const SafeImage = ({
  src,
  alt,
  fallback,
  className,
  containerClassName,
  ...props
}: SafeImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imgSrc, setImgSrc] = useState<string | undefined>(src);

  useEffect(() => {
    setImgSrc(src);
    setIsLoading(true);
    setError(false);
  }, [src]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setError(true);
    if (fallback) {
      setImgSrc(fallback);
      setError(false);
    }
  };

  return (
    <div className={cn("relative overflow-hidden w-full h-full", containerClassName)}>
      {/* Skeleton shimmer — shown while loading */}
      {isLoading && (
        <div className="absolute inset-0 z-10 w-full h-full overflow-hidden rounded-[inherit]">
          <div className="w-full h-full bg-muted relative">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
        </div>
      )}

      {/* Error state — no image and no fallback */}
      {error && !fallback ? (
        <div className={cn(
          "flex flex-col items-center justify-center w-full h-full rounded-[inherit] border border-dashed border-border bg-muted/30 text-muted-foreground",
          className
        )}>
          <ImageOff className="w-4 h-4 mb-1 opacity-40" strokeWidth={1.5} />
          <span className="text-[9px] font-medium uppercase tracking-wider opacity-40">No Image</span>
        </div>
      ) : (
        <img
          src={imgSrc}
          alt={alt}
          className={cn(
            "transition-opacity duration-300",
            isLoading ? "opacity-0" : "opacity-100",
            className
          )}
          onLoad={handleLoad}
          onError={handleError}
          {...props}
        />
      )}
    </div>
  );
};
