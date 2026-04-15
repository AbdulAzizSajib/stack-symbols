import { FolderKanban, Palette, PlusCircle, Shapes, Tag, Tags } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageHero, SectionCard, SideList, StatGrid } from "@/components/admin/admin-shell";

const categoryMetrics = [
    { label: "Categories", value: "38", hint: "Curated collections live", icon: FolderKanban, tone: "info" as const },
    { label: "Empty buckets", value: "3", hint: "Need fresh content", icon: Tag, tone: "warning" as const },
    { label: "Most used", value: "Icons", hint: "4,820 SVGs assigned", icon: Shapes, tone: "positive" as const },
    { label: "Color coded", value: "100%", hint: "Every category gets a brand tint", icon: Palette, tone: "default" as const },
];

const categorySummary = [
    { label: "Public categories", value: "29", hint: "Visible to all visitors", accent: "text-primary" },
    { label: "Private categories", value: "9", hint: "Draft or internal only", accent: "text-foreground" },
    { label: "Need review", value: "2", hint: "Missing icon or color", accent: "text-foreground" },
    { label: "Avg. assets", value: "318", hint: "Per active category", accent: "text-foreground" },
];

const categories = [
    { name: "Icons", slug: "icons", color: "#3B82F6", count: 4820 },
    { name: "Illustrations", slug: "illustrations", color: "#F97316", count: 932 },
    { name: "Brand marks", slug: "brand-marks", color: "#10B981", count: 418 },
    { name: "UI controls", slug: "ui-controls", color: "#8B5CF6", count: 1456 },
];

export default function CategoriesPage() {
    return (
        <>
            <PageHero
                eyebrow="Categories"
                title="Shape the structure of the SVG library"
                description="This area focuses on the collections that organize browsing and search. It keeps the visual hierarchy obvious so admins can see what needs attention at a glance."
                actions={
                    <Button>
                        <PlusCircle className="size-4" />
                        New category
                    </Button>
                }
            />

            <StatGrid items={categoryMetrics} />

            <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
                <SideList title="Category health" description="Structural numbers that help admins keep the catalog tidy." items={categorySummary} />

                <SectionCard title="Category cards" description="Each card shows the collection color, slug, and content depth.">
                    <div className="grid gap-4 md:grid-cols-2">
                        {categories.map((category) => (
                            <div key={category.slug} className="rounded-3xl border border-border/70 bg-muted/25 p-5">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="font-heading text-xl font-semibold">{category.name}</p>
                                        <p className="mt-1 text-sm text-muted-foreground">/{category.slug}</p>
                                    </div>
                                    <span className="size-10 rounded-2xl border border-border/70" style={{ backgroundColor: category.color }} />
                                </div>
                                <div className="mt-6 flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Assigned SVGs</p>
                                        <p className="font-heading text-3xl font-semibold">{category.count}</p>
                                    </div>
                                    <Button variant="outline" size="sm">
                                        Edit
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </SectionCard>
            </div>
        </>
    );
}
