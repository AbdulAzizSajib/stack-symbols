"use client";

import { X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { SectionCard } from "@/components/admin/admin-shell";
import { Button } from "@/components/ui/button";
import { usePasteBulk } from "@/hooks/useSvg";
import type { Visibility } from "@/types/auth.types";
import type { IPasteBulkItem } from "@/types/svg.types";

const VISIBILITY_OPTIONS: Visibility[] = ["PUBLIC", "PRIVATE", "UNLISTED"];

interface BulkItem {
    id: string;
    svgContent: string;
    title: string;
    visibility: Visibility;
}

export function PasteBulkPanel({ onClose }: { onClose: () => void }) {
    const [items, setItems] = useState<BulkItem[]>([
        { id: "1", svgContent: "", title: "", visibility: "PUBLIC" },
    ]);

    const pasteBulk = usePasteBulk();

    const addItem = () => {
        setItems((prev) => [
            ...prev,
            {
                id: String(Date.now()),
                svgContent: "",
                title: "",
                visibility: "PUBLIC",
            },
        ]);
    };

    const removeItem = (id: string) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    const updateItem = (id: string, updates: Partial<BulkItem>) => {
        setItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...updates } : item)));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const validItems: IPasteBulkItem[] = [];
        const errors: string[] = [];

        items.forEach((item, index) => {
            if (!item.svgContent.trim().startsWith("<svg")) {
                errors.push(`Item ${index + 1}: Content must start with <svg ...>`);
                return;
            }
            validItems.push({
                svgContent: item.svgContent.trim(),
                title: item.title.trim() || undefined,
                visibility: item.visibility,
            });
        });
            
        if (errors.length > 0) {
            errors.forEach((err) => toast.error(err));
            return;
        }

        if (validItems.length === 0) {
            toast.error("Please add at least one valid SVG");
            return;
        }

        pasteBulk.mutate(
            { items: validItems },
            {
                onSuccess: (res) => {
                    if (res.success) {
                        toast.success(res.message || `Bulk upload completed: ${res.data?.successful} successful, ${res.data?.failed} failed`);
                        onClose();
                    } else {
                        toast.error(res.message);
                    }
                },
                onError: (err) =>
                    toast.error(err instanceof Error ? err.message : "Bulk paste failed"),
            },
        );
    };

    return (
        <SectionCard
            title="Bulk Paste SVGs"
            description="Paste multiple SVGs at once. Each item will be validated and uploaded individually."
            action={
                <Button variant="outline" size="sm" onClick={onClose}>
                    <X className="size-4" />
                    Close
                </Button>
            }
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                {items.map((item, index) => (
                    <div key={item.id} className="rounded-xl border border-border/70 p-4 space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">SVG #{index + 1}</span>
                            {items.length > 1 && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeItem(item.id)}
                                >
                                    <X className="size-4" />
                                    Remove
                                </Button>
                            )}
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <label className="md:col-span-2">
                                <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                                    SVG markup
                                </span>
                                <textarea
                                    value={item.svgContent}
                                    onChange={(e) =>
                                        updateItem(item.id, { svgContent: e.target.value })
                                    }
                                    placeholder='<svg xmlns="http://www.w3.org/2000/svg" ...>...</svg>'
                                    rows={6}
                                    className="w-full rounded-xl border border-border/70 bg-background p-3 font-mono text-xs outline-none focus:border-primary"
                                />
                            </label>

                            <label>
                                <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                                    Title
                                </span>
                                <input
                                    value={item.title}
                                    onChange={(e) => updateItem(item.id, { title: e.target.value })}
                                    placeholder="Optional"
                                    className="h-10 w-full rounded-xl border border-border/70 bg-background px-3 text-sm outline-none focus:border-primary"
                                />
                            </label>

                            <label>
                                <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                                    Visibility
                                </span>
                                <select
                                    value={item.visibility}
                                    onChange={(e) =>
                                        updateItem(item.id, { visibility: e.target.value as Visibility })
                                    }
                                    className="h-10 w-full rounded-xl border border-border/70 bg-background px-3 text-sm outline-none focus:border-primary"
                                >
                                    {VISIBILITY_OPTIONS.map((v) => (
                                        <option key={v} value={v}>
                                            {v}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>
                    </div>
                ))}

                <div className="flex justify-start">
                    <Button type="button" variant="outline" onClick={addItem}>
                        + Add Another SVG
                    </Button>
                </div>

                <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={pasteBulk.isPending}>
                        {pasteBulk.isPending ? "Uploading..." : `Upload ${items.length} SVG${items.length > 1 ? "s" : ""}`}
                    </Button>
                </div>
            </form>
        </SectionCard>
    );
}
