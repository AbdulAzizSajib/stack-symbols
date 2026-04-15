import { Card } from "@/components/ui/card";

export function SvgDetailSkeleton() {
    return (
        <div className="space-y-8">
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                <Card className="aspect-square animate-pulse border-border/70 bg-muted/40" />
                <div className="flex flex-col gap-4">
                    <div className="h-3 w-24 animate-pulse rounded bg-muted/50" />
                    <div className="h-8 w-3/4 animate-pulse rounded bg-muted/60" />
                    <div className="mt-4 flex gap-3">
                        <div className="h-10 w-32 animate-pulse rounded bg-muted/50" />
                        <div className="h-10 w-32 animate-pulse rounded bg-muted/50" />
                    </div>
                </div>
            </div>
            <Card className="h-48 animate-pulse border-border/70 bg-muted/30" />
        </div>
    );
}
