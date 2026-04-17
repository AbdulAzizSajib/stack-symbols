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
    <section className="space-y-6 max-w-6xl mx-auto py-8">
   <header className="flex flex-col gap-3 text-center ">
  <h1 className="font-heading text-3xl  font-bold tracking-tight">
   Find Your Perfect Tech Stack Symbols
  </h1>
  <p className="text-lg text-muted-foreground leading-relaxed">
    Browse, copy, and embed high-quality Tech Stack symbols from our public library to elevate your portfolio and projects.
  </p>
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

<footer className="mt-16 border-t border-border/70 py-6">
  <div className="max-w-5xl mx-auto px-4 flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground">
    
<p className="flex items-center gap-2">
  developed by 
  <a
    href="https://abdulazizsajib.vercel.app/"
    target="_blank"
    rel="noopener noreferrer"
    className=" text-zinc-900 capitalize underline font-bold transition flex items-center gap-1"
  >
    AbdulAzizSajib
 
  </a>
</p>

  
    <p>
      © {new Date().getFullYear()} All rights reserved.
    </p>

  </div>
</footer>
        </section>
    );
}
