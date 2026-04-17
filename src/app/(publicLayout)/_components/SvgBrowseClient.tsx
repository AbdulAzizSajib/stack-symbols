"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

import { useSvgList } from "@/hooks/useSvg";
import type { ISvgListQuery } from "@/types/svg.types";

import { SvgGrid } from "./SvgGrid";
import { SvgPagination } from "./SvgPagination";
import { SvgSearchBar } from "./SvgSearchBar";

export default function SvgBrowseClient({ initialQuery }: { initialQuery: ISvgListQuery }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const query = useMemo<ISvgListQuery>(() => {
        const page = Number(searchParams.get("page") ?? initialQuery.page ?? 1);
        const limit = Number(searchParams.get("limit") ?? initialQuery.limit ?? 200);
        return {
            page,
            limit,
            sortBy:
                (searchParams.get("sortBy") as ISvgListQuery["sortBy"]) ??
                initialQuery.sortBy ??
                "title",
            sortOrder:
                (searchParams.get("sortOrder") as ISvgListQuery["sortOrder"]) ??
                initialQuery.sortOrder ??
                "asc",
            search: searchParams.get("search") || initialQuery.search || undefined,
            categoryId: searchParams.get("categoryId") || initialQuery.categoryId || undefined,
            tag: searchParams.get("tag") || initialQuery.tag || undefined,
            visibility:
                (searchParams.get("visibility") as ISvgListQuery["visibility"]) ??
                initialQuery.visibility ??
                "PUBLIC",
        };
    }, [searchParams, initialQuery]);

    const { data, isLoading, isError, error, isFetching } = useSvgList(query);

    const updateUrl = useCallback(
        (next: Partial<ISvgListQuery>) => {
            const params = new URLSearchParams(searchParams.toString());
            for (const [key, value] of Object.entries(next)) {
                if (value === undefined || value === null || value === "") {
                    params.delete(key);
                } else {
                    params.set(key, String(value));
                }
            }
            router.push(`/browse?${params.toString()}`);
        },
        [router, searchParams],
    );

    const onSearch = (search: string) => updateUrl({ search, page: 1 });
    const onPageChange = (page: number) => updateUrl({ page });

    if (isError) {
        return (
            <p className="text-sm text-destructive">
                Failed to load SVGs: {error instanceof Error ? error.message : "Unknown error"}
            </p>
        );
    }

    const items = useMemo(() => {
        const list = data?.success ? data.data : [];
        if (query.sortBy !== "title") return list;

        return [...list].sort((a, b) => {
            const left = (a.title ?? a.slug ?? "").toLowerCase();
            const right = (b.title ?? b.slug ?? "").toLowerCase();
            const compare = left.localeCompare(right);
            return query.sortOrder === "desc" ? -compare : compare;
        });
    }, [data, query.sortBy, query.sortOrder]);
    const meta = data?.success ? data.meta : undefined;

    return (
        <section className="space-y-6 container mx-auto px-4 py-8  bg-[#EDE9E6]">
            <header className="flex flex-col gap-3">
                <h1 className="font-heading text-3xl font-semibold tracking-tight">Browse SVGs</h1>
                <p className="text-sm text-muted-foreground">
                    Discover, copy, and embed icons from the public library.
                </p>
            </header>

            <SvgSearchBar defaultValue={query.search ?? ""} onSubmit={onSearch} />

            <SvgGrid items={items} loading={isLoading} fetching={isFetching} />

            {meta ? (
                <SvgPagination
                    page={meta.page}
                    totalPages={meta.totalPages}
                    onChange={onPageChange}
                />
            ) : null}
        </section>
    );
}
