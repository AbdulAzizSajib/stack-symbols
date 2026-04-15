"use client";

import { X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { SectionCard } from "@/components/admin/admin-shell";
import { Button } from "@/components/ui/button";
import { usePasteSvg } from "@/hooks/useSvg";
import type { Visibility } from "@/types/auth.types";

const VISIBILITY_OPTIONS: Visibility[] = ["PUBLIC", "PRIVATE", "UNLISTED"];

export function PasteSvgPanel({ onClose }: { onClose: () => void }) {
    const [svgContent, setSvgContent] = useState("");
    const [title, setTitle] = useState("");
    const [visibility, setVisibility] = useState<Visibility>("PUBLIC");
    const [tagsCsv, setTagsCsv] = useState("");

    const paste = usePasteSvg();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!svgContent.trim().startsWith("<svg")) {
            toast.error("Content must start with <svg ...>");
            return;
        }

        const tags = tagsCsv
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean);

        paste.mutate(
            {
                svgContent: svgContent.trim(),
                title: title.trim() || undefined,
                visibility,
                tags: tags.length ? tags : undefined,
            },
            {
                onSuccess: (res) => {
                    if (res.success) {
                        toast.success("SVG saved");
                        setSvgContent("");
                        setTitle("");
                        setTagsCsv("");
                        onClose();
                    } else {
                        toast.error(res.message);
                    }
                },
                onError: (err) =>
                    toast.error(err instanceof Error ? err.message : "Paste failed"),
            },
        );
    };

    return (
        <SectionCard
            title="Paste SVG"
            description="Drop raw SVG markup as JSON. Useful for quick additions without a file."
            action={
                <Button variant="outline" size="sm" onClick={onClose}>
                    <X className="size-4" />
                    Close
                </Button>
            }
        >
            <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
                <label className="md:col-span-2">
                    <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        SVG markup
                    </span>
                    <textarea
                        value={svgContent}
                        onChange={(e) => setSvgContent(e.target.value)}
                        placeholder='<svg xmlns="http://www.w3.org/2000/svg" ...>...</svg>'
                        rows={8}
                        className="w-full rounded-xl border border-border/70 bg-background p-3 font-mono text-xs outline-none focus:border-primary"
                    />
                </label>

                <label>
                    <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        Title
                    </span>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Optional"
                        className="h-10 w-full rounded-xl border border-border/70 bg-background px-3 text-sm outline-none focus:border-primary"
                    />
                </label>

                <label>
                    <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        Visibility
                    </span>
                    <select
                        value={visibility}
                        onChange={(e) => setVisibility(e.target.value as Visibility)}
                        className="h-10 w-full rounded-xl border border-border/70 bg-background px-3 text-sm outline-none focus:border-primary"
                    >
                        {VISIBILITY_OPTIONS.map((v) => (
                            <option key={v} value={v}>
                                {v}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="md:col-span-2">
                    <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        Tags (comma separated)
                    </span>
                    <input
                        value={tagsCsv}
                        onChange={(e) => setTagsCsv(e.target.value)}
                        placeholder="icon, svg, design"
                        className="h-10 w-full rounded-xl border border-border/70 bg-background px-3 text-sm outline-none focus:border-primary"
                    />
                </label>

                <div className="md:col-span-2 flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={paste.isPending}>
                        {paste.isPending ? "Saving..." : "Save SVG"}
                    </Button>
                </div>
            </form>
        </SectionCard>
    );
}
