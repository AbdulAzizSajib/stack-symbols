import { Card, CardContent } from "@/components/ui/card";

export function SvgCardSkeleton() {
    return (
        <Card className="overflow-hidden border-border/70">
            <div className="aspect-square animate-pulse bg-muted/60" />
            <CardContent className="space-y-2 p-4">
                <div className="h-4 w-3/4 animate-pulse rounded bg-muted/60" />
                <div className="h-3 w-1/2 animate-pulse rounded bg-muted/40" />
            </CardContent>
        </Card>
    );
}
