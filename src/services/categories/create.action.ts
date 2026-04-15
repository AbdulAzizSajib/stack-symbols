/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { endpoints } from "@/config/endpoints";
import { httpClient } from "@/lib/axios/httpClient";
import type { ApiErrorResponse, ApiResponse } from "@/types/api.types";
import type { ICategory } from "@/types/category.types";
import { createCategoryZodSchema, type ICreateCategoryPayload } from "@/zod/category.validation";

export const createCategoryAction = async (
    payload: ICreateCategoryPayload,
): Promise<ApiResponse<ICategory> | ApiErrorResponse> => {
    const parsed = createCategoryZodSchema.safeParse(payload);
    if (!parsed.success) {
        return { success: false, message: parsed.error.issues[0]?.message ?? "Invalid input" };
    }

    try {
        return await httpClient.post<ICategory>(endpoints.categories.list, parsed.data);
    } catch (error: any) {
        return {
            success: false,
            message: error?.response?.data?.message ?? `Create category failed: ${error.message}`,
        };
    }
};
