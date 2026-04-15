import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

import { queryKeys } from "@/config/queryKeys";
import { getQueryClient } from "@/lib/get-query-client";
import { getSvgBySlugAction } from "@/services/svg/get.action";

import SvgDetailClient from "./_components/SvgDetailClient";

type Params = Promise<{ slug: string }>;

export default async function SvgDetailPage({ params }: { params: Params }) {
    const { slug } = await params;

    const queryClient = getQueryClient();

    await queryClient.prefetchQuery({
        queryKey: queryKeys.svg.detail(slug),
        queryFn: () => getSvgBySlugAction(slug),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <SvgDetailClient slug={slug} />
        </HydrationBoundary>
    );
}
