"use server";

import { endpoints } from "@/config/endpoints";
import { httpClient } from "@/lib/axios/httpClient";
import type { ISvg } from "@/types/svg.types";

export const getSvgBySlugAction = async (slug: string) => {
    return httpClient.get<ISvg>(endpoints.svg.bySlug(slug));
};
