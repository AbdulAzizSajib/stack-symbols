"use client";

import { queryKeys } from "@/config/queryKeys";
import { deleteSvgAction } from "@/services/svg/delete.action";
import { getSvgBySlugAction } from "@/services/svg/get.action";
import { listSvgAction } from "@/services/svg/list.action";
import { pasteSvgAction } from "@/services/svg/paste.action";
import { trackSvgAction } from "@/services/svg/track.action";
import { updateSvgAction } from "@/services/svg/update.action";
import { uploadSvgAction } from "@/services/svg/upload.action";
import type { ISvgListQuery, ITrackSvgPayload } from "@/types/svg.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useSvgList(query: ISvgListQuery = {}) {
    return useQuery({
        queryKey: queryKeys.svg.list(query),
        queryFn: () => listSvgAction(query),
        staleTime: 60 * 1000,
        refetchOnWindowFocus: "always",
    });
}

export function useSvgDetail(slug: string) {
    return useQuery({
        queryKey: queryKeys.svg.detail(slug),
        queryFn: () => getSvgBySlugAction(slug),
        enabled: !!slug,
        staleTime: 5 * 60 * 1000,
    });
}

export function useTrackSvg(slug: string) {
    return useMutation({
        mutationFn: (payload: ITrackSvgPayload) => trackSvgAction(slug, payload),
    });
}

export function useUploadSvg() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (formData: FormData) => uploadSvgAction(formData),
        onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.svg.lists() }),
    });
}

export function usePasteSvg() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: pasteSvgAction,
        onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.svg.lists() }),
    });
}

export function useUpdateSvg(slug: string) {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (payload: Parameters<typeof updateSvgAction>[1]) =>
            updateSvgAction(slug, payload),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: queryKeys.svg.detail(slug) });
            qc.invalidateQueries({ queryKey: queryKeys.svg.lists() });
        },
    });
}

export function useDeleteSvg() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (slug: string) => deleteSvgAction(slug),
        onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.svg.lists() }),
    });
}
