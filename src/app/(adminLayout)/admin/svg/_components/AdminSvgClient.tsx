"use client";

import { ClipboardPaste, Upload } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import { PageHero } from "@/components/admin/admin-shell";
import { Button } from "@/components/ui/button";
import { useSvgList } from "@/hooks/useSvg";
import type { ISvgListQuery } from "@/types/svg.types";

import { AdminSvgFilters } from "./AdminSvgFilters";
import { AdminSvgTable } from "./AdminSvgTable";
import { PasteSvgPanel } from "./PasteSvgPanel";
import { UploadSvgPanel } from "./UploadSvgPanel";

type Panel = "upload" | "paste" | null;

export default function AdminSvgClient({ initialQuery }: { initialQuery: ISvgListQuery }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [panel, setPanel] = useState<Panel>(null);

    const query = useMemo<ISvgListQuery>(() => {
        const page = Number(searchParams.get("page") ?? initialQuery.page ?? 1);
        const limit = Number(searchParams.get("limit") ?? initialQuery.limit ?? 20);
        return {
            page,
            limit,
            search: searchParams.get("search") || initialQuery.search || undefined,
            visibility:
                (searchParams.get("visibility") as ISvgListQuery["visibility"]) ??
                initialQuery.visibility ??
                undefined,
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
            router.push(`/admin/svg?${params.toString()}`);
        },
        [router, searchParams],
    );

    const items = data?.success ? data.data : [];
    const meta = data?.success ? data.meta : undefined;

    return (
        <>
            <PageHero
                eyebrow="SVG library"
                title="Manage every SVG in the catalog"
                description="Upload new icons, paste raw SVG markup, and curate metadata for every asset that powers the product."
                actions={
                    <>
                        <Button variant="outline" onClick={() => setPanel(panel === "paste" ? null : "paste")}>
                            <ClipboardPaste className="size-4" />
                            Paste SVG
                        </Button>
                        <Button onClick={() => setPanel(panel === "upload" ? null : "upload")}>
                            <Upload className="size-4" />
                            Upload SVG
                        </Button>
                    </>
                }
            />

            {panel === "upload" ? <UploadSvgPanel onClose={() => setPanel(null)} /> : null}
            {panel === "paste" ? <PasteSvgPanel onClose={() => setPanel(null)} /> : null}

            <AdminSvgFilters
                query={query}
                onChange={(next) => updateUrl({ ...next, page: 1 })}
            />

            {isError ? (
                <p className="text-sm text-destructive">
                    Failed to load SVGs:{" "}
                    {error instanceof Error ? error.message : "Unknown error"}
                </p>
            ) : (
                <AdminSvgTable
                    items={items}
                    loading={isLoading}
                    fetching={isFetching}
                    page={meta?.page ?? 1}
                    totalPages={meta?.totalPages ?? 1}
                    onPageChange={(page) => updateUrl({ page })}
                />
            )}
        </>
    );
}
