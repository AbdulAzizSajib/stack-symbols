import { Card } from "@/components/ui/card";
import type { ISvg } from "@/types/svg.types";

import { SvgCopyActions } from "./SvgCopyActions";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export function SvgDetailHero({ svg }: { svg: ISvg }) {
    const previewUrl = svg.rawUrl ?? `${BASE_API_URL}/svg/icons/${svg.slug}`;

    return (
        <header className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <Card className="flex aspect-square items-center justify-center overflow-hidden border-border/70 bg-gradient-to-br from-background to-muted/40 p-12">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={previewUrl}
                    alt={svg.title ?? svg.slug}
                    className="h-full max-h-72 w-full max-w-72 object-contain"
                />
            </Card>

            <div className="flex flex-col gap-5">
                <div className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                        {svg.category?.name ?? "Uncategorized"}
                    </p>
                    <h1 className="font-heading text-3xl font-semibold tracking-tight">
                        {svg.title ?? svg.slug}
                    </h1>
                </div>

                <SvgCopyActions slug={svg.slug} rawUrl={previewUrl} />
            </div>
        </header>
    );
}
