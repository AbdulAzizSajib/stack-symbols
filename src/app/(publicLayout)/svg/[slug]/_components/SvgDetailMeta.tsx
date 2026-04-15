import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ISvg } from "@/types/svg.types";

function formatBytes(bytes?: number) {
    if (!bytes) return "—";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export function SvgDetailMeta({ svg }: { svg: ISvg }) {
    const rows: Array<[string, React.ReactNode]> = [
        ["Slug", svg.slug],
        ["Visibility", svg.visibility],
        ["Dimensions", svg.width && svg.height ? `${svg.width} × ${svg.height}` : "—"],
        ["Size", formatBytes(svg.sizeBytes)],
        ["Created", svg.createdAt ? new Date(svg.createdAt).toLocaleDateString() : "—"],
    ];

    return (
        <Card className="border-border/70">
            <CardHeader>
                <CardTitle className="text-lg">Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <dl className="grid gap-3 sm:grid-cols-2">
                    {rows.map(([label, value]) => (
                        <div key={label} className="flex flex-col gap-1 rounded-xl border border-border/60 bg-muted/20 p-3">
                            <dt className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</dt>
                            <dd className="font-medium">{value}</dd>
                        </div>
                    ))}
                </dl>

                {svg.tags && svg.tags.length > 0 ? (
                    <div className="space-y-2">
                        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Tags</p>
                        <div className="flex flex-wrap gap-2">
                            {svg.tags.map((tag) => (
                                <Link
                                    key={tag.id}
                                    href={`/tags/${tag.slug}`}
                                    className="rounded-full border border-border/70 bg-muted/40 px-3 py-1 text-xs font-medium hover:border-primary hover:text-primary"
                                >
                                    {tag.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                ) : null}
            </CardContent>
        </Card>
    );
}
