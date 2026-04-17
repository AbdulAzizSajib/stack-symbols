"use client";

import Image from "next/image";
import { toast } from "sonner";

import type { ISvg } from "@/types/svg.types";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export function SvgCard({ svg }: { svg: ISvg }) {
    const previewUrl = svg.rawUrl ?? `${BASE_API_URL}/svg/icons/${svg.slug}`;
    const copyUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/svg/icons/${svg.slug}?w=64&h=64`;

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
        <div className="flex flex-col items-center space-y-3 rounded-lg transition-all hover:scale-105" onClick={handleCopyUrl}>
            <Image
                src={previewUrl}
                alt={svg.title ?? svg.slug}
                width={64}
                height={64}
                className="h-16 w-16 rounded-lg object-contain transition-transform group-hover:scale-110"
                unoptimized
            />
        </div>
    );
}
