"use server";

import { endpoints } from "@/config/endpoints";
import { httpClient } from "@/lib/axios/httpClient";
import type { ITag, ITagListQuery } from "@/types/tag.types";

export const listTagsAction = async (query: ITagListQuery = {}) => {
    return httpClient.get<ITag[]>(endpoints.tags.list, { params: query });
};
