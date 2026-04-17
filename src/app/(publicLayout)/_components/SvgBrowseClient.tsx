"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";

import { useSvgList } from "@/hooks/useSvg";
import { createRequestSvgAction } from "@/services/request-svg/create.action";
import type { ISvgListQuery } from "@/types/svg.types";


import { SvgGrid } from "./SvgGrid";
import { SvgPagination } from "./SvgPagination";
import { SvgSearchBar } from "./SvgSearchBar";
import { SelectedIconsBar } from "./SelectedIconsBar";

export default function SvgBrowseClient() {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
  const [requestedName, setRequestedName] = useState("");
  const [submittingRequest, setSubmittingRequest] = useState(false);

    const query = useMemo<ISvgListQuery>(() => {
        const page = Number(searchParams.get("page") ?? 1);
        const limit = Number(searchParams.get("limit") ?? 200);
        return {
            page,
            limit,
            sortBy:
                (searchParams.get("sortBy") as ISvgListQuery["sortBy"]) ?? "title",
            sortOrder:
                (searchParams.get("sortOrder") as ISvgListQuery["sortOrder"]) ?? "asc",
            search: searchParams.get("search") || undefined,
            categoryId: searchParams.get("categoryId") || undefined,
            tag: searchParams.get("tag") || undefined,
            visibility:
                (searchParams.get("visibility") as ISvgListQuery["visibility"]) ?? "PUBLIC",
        };
    }, [searchParams]);

    const { data, isError, error, isFetching } = useSvgList(query);

    const items = useMemo(() => {
        const list = data?.success ? data.data : [];
        if (query.sortBy !== "title") return list;

        return [...list].sort((a, b) => {
            const left = (a.title ?? a.slug ?? "").toLowerCase();
            const right = (b.title ?? b.slug ?? "").toLowerCase();
            const compare = left.localeCompare(right);
            return query.sortOrder === "desc" ? -compare : compare;
        });
    }, [data, query.sortBy, query.sortOrder]);
    const meta = data?.success ? data.meta : undefined;

    const updateUrl = useCallback(
        (next: Partial<ISvgListQuery>) => {
            const params = new URLSearchParams(searchParams.toString());
            for (const [key, value] of Object.entries(next)) {
                if (value === undefined || value === null || value === "") {
                    params.delete(key);
                } else {
                    params.set(key, String(value));
                }
            }
            router.push(`${pathname}?${params.toString()}`);
        },
        [pathname, router, searchParams],
    );

    const onSearch = (search: string) => updateUrl({ search, page: 1 });
    const onPageChange = (page: number) => updateUrl({ page });

    const onRequestSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const name = requestedName.trim();
      if (!name) {
        toast.error("Please enter a stack symbol name");
        return;
      }

      setSubmittingRequest(true);
      const res = await createRequestSvgAction({ name });
      setSubmittingRequest(false);

      if (res.success) {
        toast.success(res.message || "Request submitted");
        setRequestedName("");
        return;
      }

      toast.error(res.message || "Failed to submit request");
    };

    if (isError) {
        return (
            <p className="text-sm text-destructive">
                Failed to load SVGs: {error instanceof Error ? error.message : "Unknown error"}
            </p>
        );
    }

    return (
    <section className="space-y-6 max-w-6xl mx-auto py-4">
 <header className="flex flex-col items-center text-center gap-2 py-2">

  {/* Badge */}
  <div className="inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-muted/50 px-3 py-1">
    <span className="size-1.5 rounded-full bg-emerald-500 shrink-0" />
    <span className="text-xs text-muted-foreground">free to use · no attribution required</span>
  </div>

  {/* Heading */}
  <h1 className="font-heading text-4xl font-extrabold tracking-tight leading-[1.2] max-w-2xl">
    Find your perfect tech stack symbols
  </h1>

  {/* Subtext */}
  <p className="text-[15px] text-muted-foreground leading-relaxed max-w-xl">
    Browse, copy, and embed high-quality tech stack symbols from our public library — built for developers and designers.
  </p>

  {/* Stats */}
  <div className="flex items-center gap-6 flex-wrap justify-center mt-1">
    <div className="flex flex-col items-center gap-0.5">
      <span className="text-lg font-medium text-foreground">{data?.meta?.total || 0} +</span>
      <span className="text-[11px] text-muted-foreground">icons</span>
    </div>
    <div className="w-px h-7 bg-border/50" />
    <div className="flex flex-col items-center gap-0.5">
      <span className="text-lg font-medium text-foreground">SVG</span>
      <span className="text-[11px] text-muted-foreground">format</span>
    </div>
    <div className="w-px h-7 bg-border/50" />
    <div className="flex flex-col items-center gap-0.5">
      <span className="text-lg font-medium text-foreground">free</span>
      <span className="text-[11px] text-muted-foreground">forever</span>
    </div>
  </div>

</header>
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">

         <SvgSearchBar defaultValue={query.search ?? ""} onSubmit={onSearch} />
        <SelectedIconsBar />
    </div>
            <SvgGrid items={items} fetching={isFetching} />
    {meta ? (
                <SvgPagination
                    page={meta.page}
                    totalPages={meta.totalPages}
                    onChange={onPageChange}
                />
            ) : null}

            {/*  */}
          <div className="max-w-xl mx-auto mt-12 p-4 sm:p-6  border border-border/70 bg-[#eaded5] shadow-sm text-zinc-900">

  {/* Heading */}
  <h2 className="text-lg sm:text-xl font-bold tracking-tight text-center">
    Can’t find your Stack Symbols?
  </h2>

  {/* Description */}
  <p className="text-xs sm:text-sm text-center mt-2">
    Tell us what you&apos;re looking for - we might add it to the library.
  </p>

  {/* Input Section */}
  <form
    className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-2"
    onSubmit={onRequestSubmit}
  >

    {/* Helper text */}
    <span className="text-xs sm:text-sm text-center sm:text-left sm:whitespace-nowrap">
      I&apos;m looking for
    </span>

    <input
      type="text"
      placeholder="e.g. Spotify, Stripe..."
      value={requestedName}
      onChange={(e) => setRequestedName(e.target.value)}
      disabled={submittingRequest}
      className="w-full sm:flex-1 h-10 px-3 rounded-md border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-primary/40"
    />

    <button
      type="submit"
      disabled={submittingRequest}
      className="w-full sm:w-auto h-10 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition disabled:cursor-not-allowed disabled:opacity-60"
    >
      {submittingRequest ? "Requesting..." : "Request"}
    </button>

  </form>
</div>

<footer className="border-t border-border/50 py-10 mt-16">
  <div className="max-w-5xl mx-auto px-4 flex flex-col gap-8">

    {/* Top row */}
    <div className="flex flex-wrap items-start justify-between gap-6">

        <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-xs text-muted-foreground">
        built by{" "}
        
        <a  href="https://abdulazizsajib.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-foreground border-b border-border hover:border-foreground transition-colors"
        >
          AbdulAzizSajib
        </a>
        <span> · © {new Date().getFullYear()} all rights reserved</span>
      </p>
    </div>
      {/* Links */}
      <div className="flex items-center gap-6 flex-wrap">
        
         <a href="https://github.com/AbdulAzizSajib"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
          </svg>
          GitHub
        </a>
        
         <a href="https://abdulazizsajib.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="8" cy="8" r="6.5"/>
            <path d="M8 1.5C6 4 5 6 5 8s1 4 3 6.5M8 1.5C10 4 11 6 11 8s-1 4-3 6.5M1.5 8h13"/>
          </svg>
          Portfolio
        </a>
      </div>

    </div>

 
    {/* Bottom row */}
  

  </div>
</footer>




        </section>
    );
}
