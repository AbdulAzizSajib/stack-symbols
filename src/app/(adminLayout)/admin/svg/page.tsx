import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

import { queryKeys } from "@/config/queryKeys";
import { getQueryClient } from "@/lib/get-query-client";
import { listSvgAction } from "@/services/svg/list.action";
import type { ISvgListQuery } from "@/types/svg.types";

import AdminSvgClient from "./_components/AdminSvgClient";

type SearchParams = Promise<{
    page?: string;
    limit?: string;
    search?: string;
    visibility?: string;
}>;

function parseQuery(sp: Awaited<SearchParams>): ISvgListQuery {
    return {
        page: sp.page ? Number(sp.page) : 1,
        limit: sp.limit ? Number(sp.limit) : 200,
        search: sp.search || undefined,
        visibility: (sp.visibility as ISvgListQuery["visibility"]) ?? undefined,
    };
}

export default async function AdminSvgPage({ searchParams }: { searchParams: SearchParams }) {
    const sp = await searchParams;
    const query = parseQuery(sp);

    const queryClient = getQueryClient();

    await queryClient.prefetchQuery({
        queryKey: queryKeys.svg.list(query),
        queryFn: () => listSvgAction(query),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <AdminSvgClient initialQuery={query} />
        </HydrationBoundary>
    );
}
