import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

import { queryKeys } from "@/config/queryKeys";
import { getQueryClient } from "@/lib/get-query-client";
import { listSvgAction } from "@/services/svg/list.action";
import type { ISvgListQuery } from "@/types/svg.types";

import SvgBrowseClient from "./_components/SvgBrowseClient";

type SearchParams = Promise<{
    page?: string;
    limit?: string;
    sortBy?: string;
    sortOrder?: string;
    search?: string;
    categoryId?: string;
    tag?: string;
    visibility?: string;
}>;

function parseQuery(sp: Awaited<SearchParams>): ISvgListQuery {
    return {
        page: sp.page ? Number(sp.page) : 1,
        limit: sp.limit ? Number(sp.limit) : 200,
        sortBy: (sp.sortBy as ISvgListQuery["sortBy"]) ?? "title",
        sortOrder: (sp.sortOrder as ISvgListQuery["sortOrder"]) ?? "asc",
        search: sp.search || undefined,
        categoryId: sp.categoryId || undefined,
        tag: sp.tag || undefined,
        visibility: (sp.visibility as ISvgListQuery["visibility"]) ?? "PUBLIC",
    };
}

export default async function BrowsePage({ searchParams }: { searchParams: SearchParams }) {
    const sp = await searchParams;
    const query = parseQuery(sp);

    const queryClient = getQueryClient();

    await queryClient.prefetchQuery({
        queryKey: queryKeys.svg.list(query),
        queryFn: () => listSvgAction(query),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <SvgBrowseClient initialQuery={query} />
        </HydrationBoundary>
    );
}
