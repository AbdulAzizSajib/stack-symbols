"use client";

import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useDeleteSvg, useUpdateSvg } from "@/hooks/useSvg";
import type { Visibility } from "@/types/auth.types";
import type { ISvg } from "@/types/svg.types";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const VISIBILITY_OPTIONS: Visibility[] = ["PUBLIC", "PRIVATE", "UNLISTED"];

export function AdminSvgRow({
    svg,
    editing,
    onEdit,
    onCancelEdit,
}: {
    svg: ISvg;
    editing: boolean;
    onEdit: () => void;
    onCancelEdit: () => void;
}) {
    const previewUrl = svg.rawUrl ?? `${BASE_API_URL}/svg/icons/${svg.slug}`;
    const [confirmDelete, setConfirmDelete] = useState(false);

    const update = useUpdateSvg(svg.slug);
    const remove = useDeleteSvg();

    const [title, setTitle] = useState(svg.title ?? "");
    const [visibility, setVisibility] = useState<Visibility>(svg.visibility);
    const [tagsCsv, setTagsCsv] = useState((svg.tags ?? []).map((t) => t.name).join(", "));

    const handleSave = () => {
        const tags = tagsCsv
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean);
        update.mutate(
            { title: title.trim() || undefined, visibility, tags },
            {
                onSuccess: (res) => {
                    if (res.success) {
                        toast.success("SVG updated");
                        onCancelEdit();
                    } else {
                        toast.error(res.message);
                    }
                },
                onError: (e) => toast.error(e instanceof Error ? e.message : "Update failed"),
            },
        );
    };

    const handleDelete = () => {
        remove.mutate(svg.slug, {
            onSuccess: (res) => {
                if (res.success) {
                    toast.success("SVG deleted");
                    setConfirmDelete(false);
                } else {
                    toast.error(res.message);
                }
            },
            onError: (e) => toast.error(e instanceof Error ? e.message : "Delete failed"),
        });
    };

    return (
        <li className="grid grid-cols-[80px_1fr_120px_120px_220px] items-center gap-4 px-4 py-3">
            <div className="flex size-16 items-center justify-center rounded-lg border border-border/70 bg-muted/20">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={previewUrl}
                    alt={svg.title ?? svg.slug}
                    className="max-h-12 max-w-12 object-contain"
                    loading="lazy"
                />
            </div>

            {editing ? (
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="h-9 rounded-lg border border-border/70 bg-background px-2 text-sm"
                    placeholder="Title"
                />
            ) : (
                <div className="min-w-0">
                    <p className="truncate font-medium">{svg.title ?? svg.slug}</p>
                    <p className="truncate text-xs text-muted-foreground">{svg.slug}</p>
                </div>
            )}

            {editing ? (
                <select
                    value={visibility}
                    onChange={(e) => setVisibility(e.target.value as Visibility)}
                    className="h-9 rounded-lg border border-border/70 bg-background px-2 text-sm"
                >
                    {VISIBILITY_OPTIONS.map((v) => (
                        <option key={v} value={v}>
                            {v}
                        </option>
                    ))}
                </select>
            ) : (
                <span className="rounded-full border border-border/70 bg-muted/40 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    {svg.visibility}
                </span>
            )}

            {editing ? (
                <input
                    value={tagsCsv}
                    onChange={(e) => setTagsCsv(e.target.value)}
                    className="h-9 rounded-lg border border-border/70 bg-background px-2 text-sm"
                    placeholder="comma,separated,tags"
                />
            ) : (
                <p className="truncate text-xs text-muted-foreground">
                    {(svg.tags ?? []).map((t) => t.name).join(", ") || "—"}
                </p>
            )}

            <div className="flex items-center justify-end gap-2">
                {editing ? (
                    <>
                        <Button size="sm" variant="outline" onClick={onCancelEdit}>
                            Cancel
                        </Button>
                        <Button size="sm" onClick={handleSave} disabled={update.isPending}>
                            {update.isPending ? "Saving..." : "Save"}
                        </Button>
                    </>
                ) : confirmDelete ? (
                    <>
                        <Button size="sm" variant="outline" onClick={() => setConfirmDelete(false)}>
                            Cancel
                        </Button>
                        <Button
                            size="sm"
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={remove.isPending}
                        >
                            {remove.isPending ? "Deleting..." : "Confirm delete"}
                        </Button>
                    </>
                ) : (
                    <>
                        <Button size="sm" variant="outline" onClick={onEdit}>
                            <Pencil className="size-3.5" />
                            Edit
                        </Button>
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setConfirmDelete(true)}
                            className="text-destructive hover:text-destructive"
                        >
                            <Trash2 className="size-3.5" />
                            Delete
                        </Button>
                    </>
                )}
            </div>
        </li>
    );
}
