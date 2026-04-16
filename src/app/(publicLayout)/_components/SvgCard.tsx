"use client";

import { toast } from "sonner";

import { Card, CardContent } from "@/components/ui/card";
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
        <Card className="group cursor-pointer transition-all hover:shadow-lg hover:scale-105" onClick={handleCopyUrl}>
            <CardContent className="p-4">
                <div className="flex flex-col items-center space-y-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={previewUrl}
                        alt={svg.title ?? svg.slug}
                        className="h-16 w-16 object-contain rounded-lg transition-transform group-hover:scale-110"
                        loading="lazy"
                    />
                    <p className="text-sm font-medium text-center truncate w-full">{svg.title ?? svg.slug}</p>
                </div>
            </CardContent>
        </Card>
    );
}
