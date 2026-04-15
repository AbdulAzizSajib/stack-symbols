"use server";

import { endpoints } from "@/config/endpoints";
import { httpClient } from "@/lib/axios/httpClient";
import type { IUsageSummary, IUsageSummaryQuery } from "@/types/usage-event.types";

export const getUsageSummaryAction = async (query: IUsageSummaryQuery) => {
    return httpClient.get<IUsageSummary>(endpoints.usageEvents.summary, { params: query });
};
