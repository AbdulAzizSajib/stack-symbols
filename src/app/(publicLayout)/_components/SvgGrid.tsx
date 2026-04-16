import type { ISvg } from "@/types/svg.types";

import { SvgCard } from "./SvgCard";
import { SvgCardSkeleton } from "./SvgCardSkeleton";

export function SvgGrid({
    items,
    loading,
    fetching,
}: {
    items: ISvg[];
    loading?: boolean;
    fetching?: boolean;
}) {
    if (loading) {
        return (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                    <SvgCardSkeleton key={i} />
                ))}
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="rounded-2xl border border-dashed border-border/70 bg-muted/30 p-10 text-center">
                <p className="text-sm text-muted-foreground">No SVGs match your filters.</p>
            </div>
        );
    }

    return (
        <div
            className="grid gap-4  sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-12"
            data-fetching={fetching ? "true" : undefined}
        >
            {items.map((svg) => (
                <SvgCard key={svg.id} svg={svg} />
            ))}
        </div>
    );
}
