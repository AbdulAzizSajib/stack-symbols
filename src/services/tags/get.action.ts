"use server";

import { endpoints } from "@/config/endpoints";
import { httpClient } from "@/lib/axios/httpClient";
import type { ITagWithSvgs } from "@/types/tag.types";

export const getTagBySlugAction = async (slug: string) => {
    return httpClient.get<ITagWithSvgs>(endpoints.tags.bySlug(slug));
};
