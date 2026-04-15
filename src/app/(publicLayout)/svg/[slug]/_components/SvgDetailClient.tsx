"use client";

import { notFound } from "next/navigation";

import { useSvgDetail } from "@/hooks/useSvg";

import { SvgDetailHero } from "./SvgDetailHero";
import { SvgDetailMeta } from "./SvgDetailMeta";
import { SvgDetailSkeleton } from "./SvgDetailSkeleton";

export default function SvgDetailClient({ slug }: { slug: string }) {
    const { data, isLoading, isError, error } = useSvgDetail(slug);

    if (isLoading) return <SvgDetailSkeleton />;

    if (isError) {
        return (
            <p className="text-sm text-destructive">
                Failed to load SVG: {error instanceof Error ? error.message : "Unknown error"}
            </p>
        );
    }

    if (!data?.success || !data.data) {
        notFound();
    }

    const svg = data.data;

    return (
        <article className="space-y-8">
            <SvgDetailHero svg={svg} />
            <SvgDetailMeta svg={svg} />
        </article>
    );
}
