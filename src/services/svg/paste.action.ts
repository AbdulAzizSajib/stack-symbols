/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { endpoints } from "@/config/endpoints";
import { httpClient } from "@/lib/axios/httpClient";
import type { ApiErrorResponse, ApiResponse } from "@/types/api.types";
import type { ISvg } from "@/types/svg.types";
import { type IPasteSvgPayload, pasteSvgZodSchema } from "@/zod/svg.validation";

export const pasteSvgAction = async (
    payload: IPasteSvgPayload,
): Promise<ApiResponse<ISvg> | ApiErrorResponse> => {
    const parsed = pasteSvgZodSchema.safeParse(payload);
    if (!parsed.success) {
        return { success: false, message: parsed.error.issues[0]?.message ?? "Invalid input" };
    }

    try {
        return await httpClient.post<ISvg>(endpoints.svg.paste, parsed.data);
    } catch (error: any) {
        return {
            success: false,
            message: error?.response?.data?.message ?? `Paste SVG failed: ${error.message}`,
        };
    }
};
