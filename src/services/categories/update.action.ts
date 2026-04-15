/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { endpoints } from "@/config/endpoints";
import { httpClient } from "@/lib/axios/httpClient";
import type { ApiErrorResponse, ApiResponse } from "@/types/api.types";
import type { ICategory } from "@/types/category.types";
import { type IUpdateCategoryPayload, updateCategoryZodSchema } from "@/zod/category.validation";

export const updateCategoryAction = async (
    id: string,
    payload: IUpdateCategoryPayload,
): Promise<ApiResponse<ICategory> | ApiErrorResponse> => {
    const parsed = updateCategoryZodSchema.safeParse(payload);
    if (!parsed.success) {
        return { success: false, message: parsed.error.issues[0]?.message ?? "Invalid input" };
    }

    try {
        return await httpClient.patch<ICategory>(endpoints.categories.byId(id), parsed.data);
    } catch (error: any) {
        return {
            success: false,
            message: error?.response?.data?.message ?? `Update category failed: ${error.message}`,
        };
    }
};
