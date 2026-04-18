// src/app/(publicLayout)/_components/SelectedIconsBar.tsx
"use client";

import Image from "next/image";
import { X, Copy, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { useSelectedIcons } from "@/context/SelectedIconsContext";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export function SelectedIconsBar() {
  const { selected, toggle, clear } = useSelectedIcons();

  if (selected.length === 0) return null;

  const combinedUrl = `${BASE_API_URL}/svg/${selected.map((s) => s.slug).join(",")}?w=64&h=64`;

  const handleCopy = () => {
    navigator.clipboard.writeText(combinedUrl).then(() => {
      toast.success("URL copied!", { description: combinedUrl });
    });
  };

//   fixed top-6 left-1/2 -translate-x-1/2 z-50 shadow-xl
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-background/95 backdrop-blur px-4 py-2 shadow-md">
      
      {/* Selected icons preview */}
      <div className="flex items-center  flex-wrap gap-2">
        {selected.map((svg) => (
          <div key={svg.slug} className="relative group">
            <Image
              src={svg.rawUrl ?? `${BASE_API_URL}/svg/${svg.slug}`}
              alt={svg.title ?? svg.slug}
              width={32}
              height={32}
              className="size-8 object-contain rounded"
              unoptimized
            />
            {/* Remove single icon */}
            <button
              onClick={() => toggle(svg)}
              className="absolute -top-1.5 -right-1.5 hidden group-hover:flex size-4 items-center justify-center rounded-full bg-destructive text-white"
            >
              <X size={10} />
            </button>
          </div>
        ))}
      </div>

      <div className="h-8 w-px bg-border" />

      {/* Count */}
      <span className="text-sm text-muted-foreground whitespace-nowrap">
        {selected.length} selected
      </span>

      {/* Copy URL */}
      <button
        onClick={handleCopy}
        className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
      >
        <Copy size={14} />
        Copy URL
      </button>

      {/* Clear all */}
      <button
        onClick={clear}
        className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-muted transition"
      >
        <Trash2 size={14} />
        Clear
      </button>
    </div>
  );
}