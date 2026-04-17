"use client";

import Image from "next/image";
import { useState } from "react";

import { useSelectedIcons } from "@/context/SelectedIconsContext";
import type { ISvg } from "@/types/svg.types";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export function SvgCard({ svg }: { svg: ISvg }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { toggle, isSelected } = useSelectedIcons();

  const previewUrl = svg.rawUrl ?? `${BASE_API_URL}/svg/${svg.slug}`;
  const selected = isSelected(svg.slug);

  return (
    <div
      onClick={() => toggle(svg)}
      className={`flex flex-col items-center transition-all hover:scale-105 cursor-pointer rounded-xl p-1 ${
        selected ? "ring-2 ring-primary bg-primary/10" : ""
      }`}
    >
      <div className="relative size-14 overflow-hidden rounded-lg bg-muted/30">
        <Image
          src={previewUrl}
          alt={svg.title ?? svg.slug}
          width={56}
          height={56}
          onLoad={() => setImageLoaded(true)}
          className={`h-14 w-14 object-contain transition-all duration-500 ease-out ${
            imageLoaded ? "scale-100 blur-0 opacity-100" : "scale-105 blur-md opacity-0"
          }`}
          unoptimized
        />
      </div>
    </div>
  );
}