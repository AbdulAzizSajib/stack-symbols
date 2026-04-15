/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { endpoints } from "@/config/endpoints";
import { httpClient } from "@/lib/axios/httpClient";
import type { ApiErrorResponse, ApiResponse } from "@/types/api.types";

export const deleteCategoryAction = async (
    id: string,
): Promise<ApiResponse<unknown> | ApiErrorResponse> => {
    try {
        return await httpClient.delete(endpoints.categories.byId(id));
    } catch (error: any) {
        return {
            success: false,
            message: error?.response?.data?.message ?? `Delete category failed: ${error.message}`,
        };
    }
};
