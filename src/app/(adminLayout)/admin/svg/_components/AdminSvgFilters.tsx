"use client";

import { Search } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import type { Visibility } from "@/types/auth.types";
import type { ISvgListQuery } from "@/types/svg.types";

const VISIBILITIES: Array<{ label: string; value: Visibility | "ALL" }> = [
    { label: "All", value: "ALL" },
    { label: "Public", value: "PUBLIC" },
    { label: "Unlisted", value: "UNLISTED" },
    { label: "Private", value: "PRIVATE" },
];

export function AdminSvgFilters({
    query,
    onChange,
}: {
    query: ISvgListQuery;
    onChange: (next: Partial<ISvgListQuery>) => void;
}) {
    const [search, setSearch] = useState(query.search ?? "");

    return (
        <div className="flex flex-col gap-3 rounded-2xl border border-border/70 bg-background/80 p-4 lg:flex-row lg:items-center lg:justify-between">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    onChange({ search: search.trim() || undefined });
                }}
                className="flex flex-1 items-center gap-2"
            >
                <div className="relative flex-1">
                    <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                        type="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by title or tag"
                        className="h-10 w-full rounded-xl border border-border/70 bg-background pl-10 pr-3 text-sm outline-none focus:border-primary"
                    />
                </div>
                <Button type="submit" variant="outline" size="sm">
                    Search
                </Button>
            </form>

            <div className="flex flex-wrap gap-2">
                {VISIBILITIES.map((v) => {
                    const active =
                        (v.value === "ALL" && !query.visibility) || v.value === query.visibility;
                    return (
                        <button
                            key={v.value}
                            type="button"
                            onClick={() =>
                                onChange({ visibility: v.value === "ALL" ? undefined : (v.value as Visibility) })
                            }
                            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                                active
                                    ? "border-primary bg-primary/10 text-primary"
                                    : "border-border/70 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                            }`}
                        >
                            {v.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
