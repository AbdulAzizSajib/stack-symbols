"use server";

import { endpoints } from "@/config/endpoints";
import { httpClient } from "@/lib/axios/httpClient";
import type { ISvg, ISvgListQuery } from "@/types/svg.types";

export const listSvgAction = async (query: ISvgListQuery = {}) => {
    return httpClient.get<ISvg[]>(endpoints.svg.list, { params: query });
};
