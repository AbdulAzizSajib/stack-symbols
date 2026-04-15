"use server";

import { endpoints } from "@/config/endpoints";
import { httpClient } from "@/lib/axios/httpClient";
import type { IUsageEvent, IUsageEventListQuery } from "@/types/usage-event.types";

export const listUsageEventsAction = async (query: IUsageEventListQuery = {}) => {
    return httpClient.get<IUsageEvent[]>(endpoints.usageEvents.list, { params: query });
};
