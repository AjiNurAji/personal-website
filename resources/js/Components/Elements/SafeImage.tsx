import React, { useState, useEffect } from 'react';
import { Skeleton } from "@/Components/UI/skeleton";
import { cn } from "@/lib/utils";

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
  className?: string;
  containerClassName?: string;
}

export const SafeImage = ({ 
  src, 
  alt, 
  fallback = "https://shadcn-portfolio-template.vercel.app/placeholder.svg", 
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
    setImgSrc(fallback);
  };

  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      {isLoading && (
        <Skeleton className="absolute inset-0 z-10 w-full h-full" />
      )}
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
    </div>
  );
};
