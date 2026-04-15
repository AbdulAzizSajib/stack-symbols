import { BarChart3, Eye, MousePointerClick, Palette, Sparkles, TrendingUp } from "lucide-react";

import { PageHero, SectionCard, SideList, StatGrid, LineSparkChart, MiniBarChart } from "@/components/admin/admin-shell";

const analyticsMetrics = [
    { label: "Icon views", value: "1.24M", hint: "+21% from the previous period", icon: Eye, tone: "info" as const },
    { label: "CTR", value: "6.8%", hint: "Browse to detail-page conversion", icon: MousePointerClick, tone: "positive" as const },
    { label: "Top category mix", value: "42/100", hint: "Icons still dominate discovery", icon: Palette, tone: "warning" as const },
    { label: "Growth pace", value: "+18.2%", hint: "7-day average trend", icon: TrendingUp, tone: "default" as const },
];

const trafficSources = [
    { label: "Search", value: 58, accent: "bg-primary" },
    { label: "Browse", value: 41, accent: "bg-sky-500" },
    { label: "Categories", value: 33, accent: "bg-emerald-500" },
    { label: "Tags", value: 27, accent: "bg-amber-500" },
];

const conversionPoints = [
    { label: "Mon", value: 58 },
    { label: "Tue", value: 64 },
    { label: "Wed", value: 72 },
    { label: "Thu", value: 69 },
    { label: "Fri", value: 81 },
    { label: "Sat", value: 87 },
    { label: "Sun", value: 84 },
];

const retention = [
    { label: "Returning creators", value: "71%", hint: "Up 4 points week over week", accent: "text-primary" },
    { label: "One-time visitors", value: "29%", hint: "Mostly social and link shares", accent: "text-foreground" },
    { label: "Avg. session", value: "4m 12s", hint: "Time spent browsing collections", accent: "text-foreground" },
    { label: "Bounce rate", value: "22%", hint: "Healthy for content discovery", accent: "text-foreground" },
];

export default function AnalyticsPage() {
    return (
        <>
            <PageHero
                eyebrow="Analytics"
                title="A clear view of usage, conversion, and discovery"
                description="This screen focuses on the metrics that drive the SVG library: views, click-through, retention, and the traffic mix that feeds the content pipeline."
            />

            <StatGrid items={analyticsMetrics} />

            <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                <LineSparkChart
                    title="Seven-day engagement trend"
                    description="Views have held steady while conversion improved late in the week."
                    points={conversionPoints}
                />
                <SideList
                    title="Retention signals"
                    description="The story behind the chart in a compact summary."
                    items={retention}
                />
            </div>

            <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
                <MiniBarChart
                    title="Traffic source mix"
                    description="Where new visits enter the system before they convert to a download or copy action."
                    data={trafficSources}
                />

                <SectionCard
                    title="What to watch next"
                    description="High-signal notes for the admin team when the numbers move."
                >
                    <div className="grid gap-3">
                        {[
                            ["Template icons", "55% of search traffic", "Most viewed category this week"],
                            ["Brand marks", "22% of saves", "Small audience, strong engagement"],
                            ["Data visual assets", "12% of shares", "Spiking on weekdays"],
                        ].map(([name, stat, note]) => (
                            <div key={name} className="rounded-2xl border border-border/70 bg-muted/25 p-4">
                                <div className="flex items-center justify-between gap-3">
                                    <div>
                                        <p className="font-medium">{name}</p>
                                        <p className="text-sm text-muted-foreground">{note}</p>
                                    </div>
                                    <span className="rounded-full bg-background px-3 py-1 text-xs font-semibold text-primary">{stat}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </SectionCard>
            </div>
        </>
    );
}
