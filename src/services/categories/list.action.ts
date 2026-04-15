"use server";

import { endpoints } from "@/config/endpoints";
import { httpClient } from "@/lib/axios/httpClient";
import type { ICategory, ICategoryListQuery } from "@/types/category.types";

export const listCategoriesAction = async (query: ICategoryListQuery = {}) => {
    return httpClient.get<ICategory[]>(endpoints.categories.list, { params: query });
};
