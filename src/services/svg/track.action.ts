/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { endpoints } from "@/config/endpoints";
import { httpClient } from "@/lib/axios/httpClient";
import type { ApiErrorResponse, ApiResponse } from "@/types/api.types";
import { type ITrackSvgPayload, trackSvgZodSchema } from "@/zod/svg.validation";

export const trackSvgAction = async (
    slug: string,
    payload: ITrackSvgPayload,
): Promise<ApiResponse<unknown> | ApiErrorResponse> => {
    const parsed = trackSvgZodSchema.safeParse(payload);
    if (!parsed.success) {
        return { success: false, message: parsed.error.issues[0]?.message ?? "Invalid input" };
    }

    try {
        return await httpClient.post(endpoints.svg.track(slug), parsed.data);
    } catch (error: any) {
        return {
            success: false,
            message: error?.response?.data?.message ?? `Track failed: ${error.message}`,
        };
    }
};
