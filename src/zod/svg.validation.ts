import { z } from "zod";

const visibilityEnum = z.enum(["PUBLIC", "PRIVATE", "UNLISTED"]);

const SVG_MAX_BYTES = 5 * 1024 * 1024;

export const uploadSvgZodSchema = z.object({
    svg: z
        .instanceof(File, { message: "SVG file is required" })
        .refine((f) => f.type === "image/svg+xml", "File must be an SVG (image/svg+xml)")
        .refine((f) => f.size <= SVG_MAX_BYTES, "File must be 5MB or smaller"),
    title: z.string().max(120).optional(),
    visibility: visibilityEnum.optional(),
    categoryId: z.string().optional(),
    tags: z.string().optional(),
});
export type IUploadSvgPayload = z.infer<typeof uploadSvgZodSchema>;

export const pasteSvgZodSchema = z.object({
    svgContent: z
        .string()
        .min(1, "SVG content is required")
        .refine((v) => v.trim().startsWith("<svg"), "Content must start with <svg ...>"),
    title: z.string().max(120).optional(),
    visibility: visibilityEnum.optional(),
    categoryId: z.string().optional(),
    tags: z.array(z.string()).optional(),
});
export type IPasteSvgPayload = z.infer<typeof pasteSvgZodSchema>;

export const pasteBulkItemZodSchema = z.object({
    svgContent: z
        .string()
        .min(1, "SVG content is required")
        .refine((v) => v.trim().startsWith("<svg"), "Content must start with <svg ...>"),
    title: z.string().max(120).optional(),
    visibility: visibilityEnum.optional(),
    categoryId: z.string().optional(),
    tags: z.array(z.string()).optional(),
});

export const pasteBulkZodSchema = z.object({
    items: z.array(pasteBulkItemZodSchema).min(1, "At least one item is required"),
});
export type IPasteBulkPayload = z.infer<typeof pasteBulkZodSchema>;

export const updateSvgZodSchema = z
    .object({
        title: z.string().max(120).optional(),
        visibility: visibilityEnum.optional(),
        categoryId: z.string().optional(),
        tags: z.array(z.string()).optional(),
    })
    .refine((v) => Object.values(v).some((x) => x !== undefined), {
        message: "At least one field is required",
    });
export type IUpdateSvgPayload = z.infer<typeof updateSvgZodSchema>;

export const trackSvgZodSchema = z.object({
    type: z.enum(["link", "embed", "external_embed"]),
});
export type ITrackSvgPayload = z.infer<typeof trackSvgZodSchema>;
