import type { ISvg } from "./svg.types";

export interface ITag {
    id: string;
    name: string;
    slug: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface ITagWithSvgs extends ITag {
    svgFiles?: ISvg[];
}

export interface ITagListQuery {
    page?: number;
    limit?: number;
    search?: string;
}
