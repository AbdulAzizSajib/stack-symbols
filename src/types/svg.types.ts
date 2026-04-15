import type { Visibility } from "./auth.types";
import type { ICategory } from "./category.types";
import type { ITag } from "./tag.types";

export interface ISvg {
    id: string;
    slug: string;
    title?: string;
    visibility: Visibility;
    url?: string;
    rawUrl?: string;
    width?: number;
    height?: number;
    sizeBytes?: number;
    ownerId?: string;
    categoryId?: string;
    category?: ICategory;
    tags?: ITag[];
    createdAt?: string;
    updatedAt?: string;
}

export interface ISvgListQuery {
    page?: number;
    limit?: number;
    search?: string;
    categoryId?: string;
    tag?: string;
    visibility?: Visibility;
    ownerId?: string;
}

export interface IUploadSvgPayload {
    svg: File;
    title?: string;
    visibility?: Visibility;
    categoryId?: string;
    tags?: string;
}

export interface IPasteSvgPayload {
    svgContent: string;
    title?: string;
    visibility?: Visibility;
    categoryId?: string;
    tags?: string[];
}

export interface IUpdateSvgPayload {
    title?: string;
    visibility?: Visibility;
    categoryId?: string;
    tags?: string[];
}

export type SvgUsageType = "link" | "embed" | "external_embed";

export interface ITrackSvgPayload {
    type: SvgUsageType;
}
