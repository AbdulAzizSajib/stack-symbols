import type { ISvgListQuery } from "@/types/svg.types";

export const queryKeys = {
    svg: {
        all: ["svg"] as const,
        lists: () => [...queryKeys.svg.all, "list"] as const,
        list: (query: ISvgListQuery) => [...queryKeys.svg.lists(), query] as const,
        details: () => [...queryKeys.svg.all, "detail"] as const,
        detail: (slug: string) => [...queryKeys.svg.details(), slug] as const,
    },
    categories: {
        all: ["categories"] as const,
        list: (query: object = {}) => [...queryKeys.categories.all, "list", query] as const,
        detail: (slug: string) => [...queryKeys.categories.all, "detail", slug] as const,
    },
    tags: {
        all: ["tags"] as const,
        list: (query: object = {}) => [...queryKeys.tags.all, "list", query] as const,
        detail: (slug: string) => [...queryKeys.tags.all, "detail", slug] as const,
    },
} as const;
