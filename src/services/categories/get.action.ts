"use server";

import { endpoints } from "@/config/endpoints";
import { httpClient } from "@/lib/axios/httpClient";
import type { ICategory } from "@/types/category.types";

export const getCategoryBySlugAction = async (slug: string) => {
    return httpClient.get<ICategory>(endpoints.categories.bySlug(slug));
};
