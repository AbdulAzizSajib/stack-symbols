"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/admin/admin-shell";
import type { ISvg } from "@/types/svg.types";

import { AdminSvgRow } from "./AdminSvgRow";

export function AdminSvgTable({
    items,
    loading,
    fetching,
    page,
    totalPages,
    onPageChange,
}: {
    items: ISvg[];
    loading?: boolean;
    fetching?: boolean;
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}) {
    const [editingSlug, setEditingSlug] = useState<string | null>(null);

    return (
        <SectionCard
            title="Library"
            description={`${items.length} item${items.length === 1 ? "" : "s"} on this page`}
        >
            {loading ? (
                <div className="space-y-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-16 animate-pulse rounded-xl border border-border/70 bg-muted/30"
                        />
                    ))}
                </div>
            ) : items.length === 0 ? (
                <p className="rounded-xl border border-dashed border-border/70 bg-muted/20 p-8 text-center text-sm text-muted-foreground">
                    No SVGs match the current filters.
                </p>
            ) : (
                <div
                    className="overflow-hidden rounded-xl border border-border/70"
                    data-fetching={fetching ? "true" : undefined}
                >
                    <div className="grid grid-cols-[80px_1fr_120px_120px_220px] items-center gap-4 border-b border-border/70 bg-muted/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        <span>Preview</span>
                        <span>Title</span>
                        <span>Visibility</span>
                       
                        <span className="text-right">Actions</span>
                    </div>
                    <ul className="divide-y divide-border/70">
                        {items.map((svg) => (
                            <AdminSvgRow
                                key={svg.id}
                                svg={svg}
                                editing={editingSlug === svg.slug}
                                onEdit={() => setEditingSlug(svg.slug)}
                                onCancelEdit={() => setEditingSlug(null)}
                            />
                        ))}
                    </ul>
                </div>
            )}

            {totalPages > 1 ? (
                <div className="mt-4 flex items-center justify-center gap-3">
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={page <= 1}
                        onClick={() => onPageChange(page - 1)}
                    >
                        <ChevronLeft className="size-4" />
                        Previous
                    </Button>
                    <span className="text-sm text-muted-foreground">
                        Page {page} of {totalPages}
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={page >= totalPages}
                        onClick={() => onPageChange(page + 1)}
                    >
                        Next
                        <ChevronRight className="size-4" />
                    </Button>
                </div>
            ) : null}
        </SectionCard>
    );
}
