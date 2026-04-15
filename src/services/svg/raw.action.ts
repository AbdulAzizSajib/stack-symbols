"use server";

import { endpoints } from "@/config/endpoints";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!BASE_API_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
}

export const getRawSvgAction = async (slug: string): Promise<string | null> => {
    try {
        const res = await fetch(`${BASE_API_URL}${endpoints.svg.rawIcon(slug)}`, {
            headers: { Accept: "image/svg+xml" },
            next: { revalidate: 60 * 60 * 24 * 7 },
        });
        if (!res.ok) return null;
        return await res.text();
    } catch (error) {
        console.error("Failed to fetch raw SVG:", error);
        return null;
    }
};
