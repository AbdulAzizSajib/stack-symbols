/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { endpoints } from "@/config/endpoints";
import { httpClient } from "@/lib/axios/httpClient";
import type { ApiErrorResponse, ApiResponse } from "@/types/api.types";
import type { ISvg } from "@/types/svg.types";
import { type IUpdateSvgPayload, updateSvgZodSchema } from "@/zod/svg.validation";

export const updateSvgAction = async (
    slug: string,
    payload: IUpdateSvgPayload,
): Promise<ApiResponse<ISvg> | ApiErrorResponse> => {
    const parsed = updateSvgZodSchema.safeParse(payload);
    if (!parsed.success) {
        return { success: false, message: parsed.error.issues[0]?.message ?? "Invalid input" };
    }

    try {
        return await httpClient.patch<ISvg>(endpoints.svg.bySlug(slug), parsed.data);
    } catch (error: any) {
        return {
            success: false,
            message: error?.response?.data?.message ?? `Update SVG failed: ${error.message}`,
        };
    }
};
