/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { endpoints } from "@/config/endpoints";
import { httpClient } from "@/lib/axios/httpClient";
import type { ApiErrorResponse, ApiResponse } from "@/types/api.types";
import type { IPasteBulkResult } from "@/types/svg.types";
import { type IPasteBulkPayload, pasteBulkZodSchema } from "@/zod/svg.validation";

export const pasteBulkAction = async (
    payload: IPasteBulkPayload,
): Promise<ApiResponse<IPasteBulkResult> | ApiErrorResponse> => {
    const parsed = pasteBulkZodSchema.safeParse(payload);
    if (!parsed.success) {
        return { success: false, message: parsed.error.issues[0]?.message ?? "Invalid input" };
    }

    try {
        return await httpClient.post<IPasteBulkResult>(endpoints.svg.pasteBulk, parsed.data);
    } catch (error: any) {
        return {
            success: false,
            message: error?.response?.data?.message ?? `Bulk paste failed: ${error.message}`,
        };
    }
};
