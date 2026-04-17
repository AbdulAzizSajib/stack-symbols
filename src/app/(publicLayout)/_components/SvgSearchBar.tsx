"use client";

import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";

const POPULAR_TAGS = ["react", "typescript", "go", "docker", "rust", "python"];

export function SvgSearchBar({
    defaultValue,
    onSubmit,
}: {
    defaultValue: string;
    onSubmit: (search: string) => void;
}) {
    const [value, setValue] = useState(defaultValue);

    useEffect(() => { setValue(defaultValue); }, [defaultValue]);

    useEffect(() => {
        if (value === "" && defaultValue !== "") onSubmit("");
    }, [value, defaultValue, onSubmit]);

    const handleClear = () => {
        setValue("");
        onSubmit("");
    };

    return (
        <div className="space-y-3">
            <form
                onSubmit={(e) => { e.preventDefault(); onSubmit(value.trim()); }}
            >
                <div className="flex items-center gap-0 rounded-xl border border-border/50 bg-background px-3.5 py-1.5 transition-all focus-within:border-border focus-within:ring-3 focus-within:ring-border/10">
                    <Search className="mr-2.5 size-4 shrink-0 text-muted-foreground" />

                    <input
                        type="search"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Search SVGs… react, go, tailwind"
                        className="h-9 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
                    />

                    {value ? (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="mr-2 flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-muted/80 transition"
                        >
                            <X size={11} />
                        </button>
                    ) : (
                        <div className="mr-2 hidden items-center gap-1 sm:flex">
                            <kbd className="rounded border border-border/50 bg-muted px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground">⌘</kbd>
                            <kbd className="rounded border border-border/50 bg-muted px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground">K</kbd>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="h-8 rounded-lg bg-foreground px-4 text-[13px] font-medium text-background transition hover:opacity-80 active:scale-95"
                    >
                        Search
                    </button>
                </div>
            </form>

            {/* Popular tags */}
            {/* <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-muted-foreground">popular:</span>
                {POPULAR_TAGS.map((tag) => (
                    <button
                        key={tag}
                        type="button"
                        onClick={() => { setValue(tag); onSubmit(tag); }}
                        className="rounded-full border border-border/50 bg-muted/50 px-3 py-1 text-xs text-muted-foreground transition hover:border-border hover:bg-background hover:text-foreground"
                    >
                        {tag}
                    </button>
                ))}
            </div> */}
        </div>
    );
}