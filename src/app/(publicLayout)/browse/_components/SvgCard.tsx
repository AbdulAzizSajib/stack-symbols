import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import type { ISvg } from "@/types/svg.types";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export function SvgCard({ svg }: { svg: ISvg }) {
    const previewUrl = svg.rawUrl ?? `${BASE_API_URL}/svg/icons/${svg.slug}`;

    return (
        <Link href={`/svg/${svg.slug}`} className="block">
            <Card className="overflow-hidden border-border/70 transition-shadow hover:shadow-md">
                <div className="flex aspect-square items-center justify-center bg-gradient-to-br from-background to-muted/40 p-6">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={previewUrl}
                        alt={svg.title ?? svg.slug}
                        className="h-full max-h-32 w-full max-w-32 object-contain"
                        loading="lazy"
                    />
                </div>
                <CardContent className="space-y-1 p-4">
                    <p className="truncate font-medium">{svg.title ?? svg.slug}</p>
                    <p className="truncate text-xs text-muted-foreground">
                        {svg.category?.name ?? "Uncategorized"}
                    </p>
                </CardContent>
            </Card>
        </Link>
    );
}
