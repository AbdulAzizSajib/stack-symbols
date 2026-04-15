import { z } from "zod";

export const createCategoryZodSchema = z.object({
    name: z.string().min(1, "Name is required").max(120),
    description: z.string().max(500).optional(),
    color: z
        .string()
        .regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/, "Color must be a valid hex code")
        .optional(),
    icon: z.string().optional(),
});
export type ICreateCategoryPayload = z.infer<typeof createCategoryZodSchema>;

export const updateCategoryZodSchema = createCategoryZodSchema
    .partial()
    .refine((v) => Object.values(v).some((x) => x !== undefined), {
        message: "At least one field is required",
    });
export type IUpdateCategoryPayload = z.infer<typeof updateCategoryZodSchema>;
