"use client";

import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

import type { ISvg } from "@/types/svg.types";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export function SvgCard({ svg }: { svg: ISvg }) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const previewUrl = svg.rawUrl ?? `${BASE_API_URL}/svg/${svg.slug}`;
    const copyUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/svg/${svg.slug}?w=64&h=64`;

    const handleCopyUrl = () => {
        navigator.clipboard.writeText(copyUrl).then(() => {
            toast.success("URL copied to clipboard!", {
                description: copyUrl,
            });
        }).catch(() => {
            toast.error("Failed to copy URL");
        });
    };

    return (
        <div className="flex flex-col items-center transition-all hover:scale-105" onClick={handleCopyUrl}>
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
