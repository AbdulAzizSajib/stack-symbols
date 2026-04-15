import { Hash, Palette, Sparkles, Tags, TrendingUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageHero, SectionCard, SideList, StatGrid } from "@/components/admin/admin-shell";

const tagMetrics = [
    { label: "Tags", value: "184", hint: "Active and searchable", icon: Tags, tone: "info" as const },
    { label: "Trending tags", value: "12", hint: "Up from last week", icon: TrendingUp, tone: "positive" as const },
    { label: "Tagged assets", value: "10.8k", hint: "Coverage keeps improving", icon: Sparkles, tone: "warning" as const },
    { label: "Taxonomy health", value: "94%", hint: "Search relevance score", icon: Hash, tone: "default" as const },
];

const tagSummary = [
    { label: "High volume", value: "31", hint: "Tags used on 100+ SVGs", accent: "text-primary" },
    { label: "Low volume", value: "27", hint: "Tags used on fewer than 5 SVGs", accent: "text-foreground" },
    { label: "Duplicate risk", value: "4", hint: "Need merge review", accent: "text-foreground" },
    { label: "Missing slugs", value: "0", hint: "All tag URLs resolve", accent: "text-foreground" },
];

const tags = [
    { name: "ui", count: 1190, category: "Interface" },
    { name: "marketing", count: 724, category: "Campaigns" },
    { name: "navigation", count: 562, category: "Structure" },
    { name: "brand", count: 418, category: "Identity" },
];

export default function TagsPage() {
    return (
        <>
            <PageHero
                eyebrow="Tags"
                title="Keep the discovery taxonomy clean and fast"
                description="Tags connect content, browse flows, and search. This screen gives admins a quick way to see where the naming system is healthy and where cleanup is needed."
                actions={<Button>New tag</Button>}
            />

            <StatGrid items={tagMetrics} />

            <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
                <SideList title="Taxonomy signals" description="Useful checks for merge and cleanup decisions." items={tagSummary} />

                <SectionCard title="Trending tags" description="The names that are currently carrying the most traffic.">
                    <div className="grid gap-4 md:grid-cols-2">
                        {tags.map((tag) => (
                            <div key={tag.name} className="rounded-3xl border border-border/70 bg-muted/25 p-5">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="font-heading text-xl font-semibold">#{tag.name}</p>
                                        <p className="mt-1 text-sm text-muted-foreground">{tag.category}</p>
                                    </div>
                                    <span className="rounded-2xl border border-border/70 bg-background px-3 py-1 text-sm font-semibold">{tag.count}</span>
                                </div>
                                <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                                    <Palette className="size-4" />
                                    Search relevance remains strong for this tag.
                                </div>
                            </div>
                        ))}
                    </div>
                </SectionCard>
            </div>
        </>
    );
}
