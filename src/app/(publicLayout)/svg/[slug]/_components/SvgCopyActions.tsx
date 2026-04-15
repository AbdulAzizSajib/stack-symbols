"use client";

import { Code2, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useTrackSvg } from "@/hooks/useSvg";

export function SvgCopyActions({ slug, rawUrl }: { slug: string; rawUrl: string }) {
    const track = useTrackSvg(slug);

    const copy = async (text: string, type: "link" | "embed") => {
        try {
            await navigator.clipboard.writeText(text);
            toast.success(`${type === "link" ? "Link" : "Embed code"} copied`);
            track.mutate({ type });
        } catch {
            toast.error("Failed to copy. Check clipboard permissions.");
        }
    };

    const embedSnippet = `<img src="${rawUrl}" alt="${slug}" />`;

    return (
        <div className="flex flex-wrap gap-3">
            <Button onClick={() => copy(rawUrl, "link")} variant="outline">
                <LinkIcon className="size-4" />
                Copy link
            </Button>
            <Button onClick={() => copy(embedSnippet, "embed")}>
                <Code2 className="size-4" />
                Copy embed
            </Button>
        </div>
    );
}
