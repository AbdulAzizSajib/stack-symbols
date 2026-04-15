import type { LucideIcon } from "lucide-react";
import { CalendarDays } from "lucide-react";
import type { ReactNode } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export { AdminShell } from "./admin-sidebar";

export function PageHero({
    eyebrow,
    title,
    description,
    actions,
}: {
    eyebrow: string;
    title: string;
    description: string;
    actions?: ReactNode;
}) {
    return (
        <section className="overflow-hidden rounded-[2rem] border border-border/70 bg-background/85 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] backdrop-blur">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl space-y-3">
                    <p className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-muted/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                        <CalendarDays className="size-3.5" />
                        {eyebrow}
                    </p>
                    <div className="space-y-2">
                        <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
                        <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">{description}</p>
                    </div>
                </div>
                {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
            </div>
        </section>
    );
}

export function StatGrid({
    items,
}: {
    items: Array<{
        label: string;
        value: string;
        hint: string;
        icon: LucideIcon;
        tone?: "default" | "positive" | "warning" | "info";
    }>;
}) {
    return (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {items.map((item) => {
                const Icon = item.icon;
                const toneClass =
                    item.tone === "positive"
                        ? "from-emerald-500/15 to-emerald-500/5 text-emerald-600"
                        : item.tone === "warning"
                            ? "from-amber-500/15 to-amber-500/5 text-amber-600"
                            : item.tone === "info"
                                ? "from-sky-500/15 to-sky-500/5 text-sky-600"
                                : "from-foreground/10 to-foreground/5 text-foreground";

                return (
                    <Card key={item.label} className="border-border/70 bg-background/90 shadow-[0_16px_45px_rgba(15,23,42,0.05)]">
                        <CardContent className="flex items-start justify-between gap-4 p-5">
                            <div className="space-y-2">
                                <p className="text-sm text-muted-foreground">{item.label}</p>
                                <p className="font-heading text-3xl font-semibold tracking-tight">{item.value}</p>
                                <p className="text-sm text-muted-foreground">{item.hint}</p>
                            </div>
                            <div className={cn("flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br", toneClass)}>
                                <Icon className="size-5" />
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}

export function SectionCard({
    title,
    description,
    action,
    children,
}: {
    title: string;
    description?: string;
    action?: ReactNode;
    children: ReactNode;
}) {
    return (
        <Card className="border-border/70 bg-background/90 shadow-[0_16px_45px_rgba(15,23,42,0.05)]">
            <CardHeader className="border-b border-border/60 pb-4">
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="space-y-1">
                        <CardTitle className="text-xl">{title}</CardTitle>
                        {description ? <CardDescription>{description}</CardDescription> : null}
                    </div>
                    {action ? <div>{action}</div> : null}
                </div>
            </CardHeader>
            <CardContent className="p-5">{children}</CardContent>
        </Card>
    );
}

export function MiniBarChart({
    title,
    description,
    data,
}: {
    title: string;
    description: string;
    data: Array<{ label: string; value: number; accent?: string }>;
}) {
    const max = Math.max(...data.map((item) => item.value), 1);

    return (
        <SectionCard title={title} description={description}>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {data.map((item) => (
                    <div key={item.label} className="space-y-2 rounded-2xl border border-border/70 bg-muted/30 p-4">
                        <div className="flex items-end gap-2">
                            <div
                                className={cn("w-full rounded-t-xl", item.accent ?? "bg-primary")}
                                style={{ height: `${Math.max((item.value / max) * 180, 24)}px` }}
                            />
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">{item.label}</span>
                            <span className="font-medium">{item.value}</span>
                        </div>
                    </div>
                ))}
            </div>
        </SectionCard>
    );
}

export function LineSparkChart({
    title,
    description,
    points,
}: {
    title: string;
    description: string;
    points: Array<{ label: string; value: number }>;
}) {
    const max = Math.max(...points.map((point) => point.value), 1);
    const min = Math.min(...points.map((point) => point.value), 0);
    const width = 640;
    const height = 220;
    const step = points.length > 1 ? width / (points.length - 1) : width;
    const range = Math.max(max - min, 1);
    const normalized = points.map((point, index) => {
        const x = index * step;
        const y = height - ((point.value - min) / range) * (height - 24) - 12;
        return `${x},${y}`;
    });

    return (
        <SectionCard title={title} description={description}>
            <div className="space-y-4">
                <svg viewBox={`0 0 ${width} ${height}`} className="h-56 w-full overflow-visible">
                    <defs>
                        <linearGradient id="adminLineGradient" x1="0" x2="1" y1="0" y2="0">
                            <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" />
                            <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
                        </linearGradient>
                    </defs>
                    <g className="text-border">
                        {[0, 1, 2, 3].map((row) => (
                            <line key={row} x1="0" x2={width} y1={44 + row * 44} y2={44 + row * 44} stroke="currentColor" strokeDasharray="6 8" />
                        ))}
                    </g>
                    <polyline
                        fill="none"
                        stroke="url(#adminLineGradient)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        points={normalized.join(" ")}
                    />
                    {points.map((point, index) => {
                        const x = index * step;
                        const y = height - ((point.value - min) / range) * (height - 24) - 12;
                        return <circle key={point.label} cx={x} cy={y} r="5.5" className="fill-background stroke-primary stroke-[3]" />;
                    })}
                </svg>

                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    {points.map((point) => (
                        <div key={point.label} className="rounded-2xl border border-border/70 bg-muted/30 px-4 py-3">
                            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{point.label}</p>
                            <p className="mt-1 font-heading text-2xl font-semibold">{point.value}</p>
                        </div>
                    ))}
                </div>
            </div>
        </SectionCard>
    );
}

export function SideList({
    title,
    description,
    items,
}: {
    title: string;
    description: string;
    items: Array<{
        label: string;
        value: string;
        hint: string;
        accent?: string;
    }>;
}) {
    return (
        <SectionCard title={title} description={description}>
            <div className="grid gap-3">
                {items.map((item) => (
                    <div key={item.label} className="flex items-center justify-between rounded-2xl border border-border/70 bg-muted/25 px-4 py-3">
                        <div className="space-y-1">
                            <p className="font-medium">{item.label}</p>
                            <p className="text-sm text-muted-foreground">{item.hint}</p>
                        </div>
                        <div className="text-right">
                            <p className={cn("font-heading text-xl font-semibold", item.accent)}>{item.value}</p>
                        </div>
                    </div>
                ))}
            </div>
        </SectionCard>
    );
}
