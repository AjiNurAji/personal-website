import React, { useState, useEffect } from 'react';
import { Skeleton } from "@/Components/UI/skeleton";
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
    }
  };

  return (
    <div className={cn("relative overflow-hidden w-full h-full", containerClassName)}>
      {isLoading && !error && (
        <Skeleton className="absolute inset-0 z-10 w-full h-full" />
      )}

      {error && !fallback ? (
        <div className={cn(
          "flex flex-col items-center justify-center w-full rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 text-zinc-500 dark:text-zinc-400 overflow-hidden",
          className
        )}>
          <div className="p-3 sm:p-4 mb-2 sm:mb-3  rounded-full bg-white dark:bg-zinc-800 shadow-sm border border-zinc-100 dark:border-zinc-700 transition-transform duration-300 hover:scale-105">
             <ImageOff className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-400 dark:text-zinc-500" strokeWidth={1.5} />
          </div>
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500/80">Image Unavailable</span>
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
