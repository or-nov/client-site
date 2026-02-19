"use client";

import Image from "next/image";
import { useState } from "react";

type MediaProps = {
  src: string;
  alt?: string;
  /** e.g. "video" (16/9), "square" (1/1), "4/3" */
  ratio?: "video" | "square" | "4/3";
  className?: string;
  sizes?: string;
};

const ratioClasses = {
  video: "aspect-video",
  square: "aspect-square",
  "4/3": "aspect-[4/3]",
};

export function Media({
  src,
  alt = "",
  ratio = "video",
  className = "",
  sizes = "(max-width: 640px) 100vw, 50vw",
}: MediaProps) {
  const [loading, setLoading] = useState(true);

  return (
    <div
      className={`relative overflow-hidden rounded-[var(--radius-lg)] bg-white/5 ${ratioClasses[ratio]} ${className}`}
    >
      {loading && (
        <div
          className="absolute inset-0 animate-pulse bg-white/10"
          aria-hidden
        />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes={sizes}
        onLoad={() => setLoading(false)}
      />
    </div>
  );
}
