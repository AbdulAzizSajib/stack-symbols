"use client";

import { Search } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

export function SvgSearchBar({
    defaultValue,
    onSubmit,
}: {
    defaultValue: string;
    onSubmit: (search: string) => void;
}) {
    const [value, setValue] = useState(defaultValue);

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit(value.trim());
            }}
            className="flex items-center gap-2"
        >
            <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                    type="search"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Search SVGs by title or tag"
                    className="h-11 w-full rounded-xl border border-border/70 bg-background pl-10 pr-3 text-sm outline-none ring-0 focus:border-primary"
                />
            </div>
            <Button type="submit">Search</Button>
        </form>
    );
}
