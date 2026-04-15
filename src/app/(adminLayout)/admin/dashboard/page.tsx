import { ArrowRight, LayoutDashboard, ShieldCheck, Sparkles, TrendingUp, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageHero, SectionCard, SideList, StatGrid } from "@/components/admin/admin-shell";

const dashboardMetrics = [
    { label: "Total SVGs", value: "12.4k", hint: "+18% vs last month", icon: Sparkles, tone: "info" as const },
    { label: "Active users", value: "3.2k", hint: "1,140 returning creators", icon: Users, tone: "positive" as const },
    { label: "Approval rate", value: "96%", hint: "Moderation queue is healthy", icon: ShieldCheck, tone: "warning" as const },
    { label: "Organic growth", value: "28%", hint: "Search and browse traffic", icon: TrendingUp, tone: "default" as const },
];

const activity = [
    { label: "New uploads", value: "246", hint: "Today so far", accent: "bg-primary" },
    { label: "Pending review", value: "14", hint: "Needs moderation", accent: "bg-amber-500" },
    { label: "Published", value: "98", hint: "Auto-approved", accent: "bg-emerald-500" },
    { label: "Flagged", value: "3", hint: "Manual check", accent: "bg-rose-500" },
];

const quickStats = [
    { label: "Storage used", value: "71%", hint: "3.6 GB of 5 GB", accent: "text-primary" },
    { label: "Top category", value: "Icons", hint: "4,820 assets", accent: "text-foreground" },
    { label: "Top tag", value: "ui", hint: "1,190 hits", accent: "text-foreground" },
    { label: "Response time", value: "182ms", hint: "Median API latency", accent: "text-foreground" },
];

export default function DashboardPage() {
    return (
        <>
            <PageHero
                eyebrow="Admin dashboard"
                title="A command center for the SVG library"
                description="Track uploads, moderation health, and audience growth in one place. The layout is designed to stay readable on wide screens while still collapsing cleanly on mobile."
                actions={
                    <>
                        <Button variant="outline" asChild>
                            <a href="/admin/analytics">
                                View analytics
                                <ArrowRight className="size-4" />
                            </a>
                        </Button>
                        <Button asChild>
                            <a href="/admin/svg">
                                Manage SVGs
                            </a>
                        </Button>
                    </>
                }
            />

            <StatGrid items={dashboardMetrics} />

            <div className="grid gap-6 xl:grid-cols-[1.35fr_0.9fr]">
                <SectionCard
                    title="Publishing activity"
                    description="A quick read on how the content pipeline is moving right now."
                    action={<span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">Live</span>}
                >
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        {activity.map((item) => (
                            <div key={item.label} className="rounded-2xl border border-border/70 bg-muted/25 p-4">
                                <div className={`mb-4 h-2 rounded-full ${item.accent}`} />
                                <p className="text-sm text-muted-foreground">{item.label}</p>
                                <p className="mt-2 font-heading text-3xl font-semibold">{item.value}</p>
                                <p className="mt-1 text-sm text-muted-foreground">{item.hint}</p>
                            </div>
                        ))}
                    </div>
                </SectionCard>

                <SideList
                    title="Workspace snapshot"
                    description="Operational numbers that matter during review and publishing."
                    items={quickStats}
                />
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                <SectionCard title="Recent moderation queue" description="The latest SVG submissions waiting for attention.">
                    <div className="grid gap-3">
                        {[
                            ["Pulse Search", "Private", "Needs alt text"],
                            ["Onboarding Icons", "Public", "Approved 8 min ago"],
                            ["Social Badges", "Unlisted", "Awaiting category assignment"],
                        ].map(([name, visibility, status]) => (
                            <div key={name} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/70 bg-muted/25 px-4 py-4">
                                <div>
                                    <p className="font-medium">{name}</p>
                                    <p className="text-sm text-muted-foreground">{status}</p>
                                </div>
                                <span className="rounded-full border border-border/70 bg-background px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                                    {visibility}
                                </span>
                            </div>
                        ))}
                    </div>
                </SectionCard>

                <SectionCard title="Publishing shortcuts" description="Fast paths for the most common admin actions.">
                    <div className="grid gap-3">
                        {[
                            ["Review new uploads", "/admin/svg"],
                            ["Check user growth", "/admin/users"],
                            ["Audit category health", "/admin/categories"],
                            ["Scan trending tags", "/admin/tags"],
                        ].map(([label, href]) => (
                            <Button key={label} variant="outline" className="justify-between" asChild>
                                <a href={href}>
                                    <span className="flex items-center gap-2">
                                        <LayoutDashboard className="size-4" />
                                        {label}
                                    </span>
                                    <ArrowRight className="size-4" />
                                </a>
                            </Button>
                        ))}
                    </div>
                </SectionCard>
            </div>
        </>
    );
}
