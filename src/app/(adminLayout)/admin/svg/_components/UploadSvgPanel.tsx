"use client";

import { X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

import { SectionCard } from "@/components/admin/admin-shell";
import { Button } from "@/components/ui/button";
import { SVG_MAX_BYTES } from "@/config/constants";
import { useUploadSvg } from "@/hooks/useSvg";
import type { Visibility } from "@/types/auth.types";

const VISIBILITY_OPTIONS: Visibility[] = ["PUBLIC", "PRIVATE", "UNLISTED"];

export function UploadSvgPanel({ onClose }: { onClose: () => void }) {
    const fileRef = useRef<HTMLInputElement>(null);
    const [title, setTitle] = useState("");
    const [visibility, setVisibility] = useState<Visibility>("PUBLIC");
    const [fileName, setFileName] = useState<string | null>(null);

    const upload = useUploadSvg();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const file = fileRef.current?.files?.[0];

        if (!file) {
            toast.error("Please select an SVG file");
            return;
        }
        if (file.type !== "image/svg+xml") {
            toast.error("File must be an SVG (image/svg+xml)");
            return;
        }
        if (file.size > SVG_MAX_BYTES) {
            toast.error("File must be 5MB or smaller");
            return;
        }

        const fd = new FormData();
        fd.append("svg", file);
        if (title.trim()) fd.append("title", title.trim());
        fd.append("visibility", visibility);

        upload.mutate(fd, {
            onSuccess: (res) => {
                if (res.success) {
                    toast.success("SVG uploaded");
                    setTitle("");
                    setFileName(null);
                    if (fileRef.current) fileRef.current.value = "";
                    onClose();
                } else {
                    toast.error(res.message);
                }
            },
            onError: (err) =>
                toast.error(err instanceof Error ? err.message : "Upload failed"),
        });
    };

    return (
        <SectionCard
            title="Upload SVG"
            description="Pick an SVG file from disk and assign metadata."
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
                        SVG file
                    </span>
                    <div className="flex items-center gap-3 rounded-xl border border-dashed border-border/70 bg-muted/20 p-4">
                        <input
                            ref={fileRef}
                            type="file"
                            accept="image/svg+xml"
                            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
                            className="text-sm"
                        />
                        {fileName ? (
                            <span className="truncate text-xs text-muted-foreground">{fileName}</span>
                        ) : null}
                    </div>
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

                <div className="md:col-span-2 flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={upload.isPending}>
                        {upload.isPending ? "Uploading..." : "Upload"}
                    </Button>
                </div>
            </form>
        </SectionCard>
    );
}
