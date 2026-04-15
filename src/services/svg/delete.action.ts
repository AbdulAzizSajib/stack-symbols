/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { endpoints } from "@/config/endpoints";
import { httpClient } from "@/lib/axios/httpClient";
import type { ApiErrorResponse, ApiResponse } from "@/types/api.types";

export const deleteSvgAction = async (
    slug: string,
): Promise<ApiResponse<unknown> | ApiErrorResponse> => {
    try {
        return await httpClient.delete(endpoints.svg.bySlug(slug));
    } catch (error: any) {
        return {
            success: false,
            message: error?.response?.data?.message ?? `Delete SVG failed: ${error.message}`,
        };
    }
};
