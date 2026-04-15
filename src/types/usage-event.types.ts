import type { SvgUsageType } from "./svg.types";

export interface IUsageEvent {
    id: string;
    svgId: string;
    type: SvgUsageType;
    userId?: string;
    referrer?: string;
    userAgent?: string;
    ip?: string;
    createdAt: string;
}

export interface IUsageEventListQuery {
    page?: number;
    limit?: number;
    sortBy?: "createdAt" | "type";
    sortOrder?: "asc" | "desc";
    svgId?: string;
    type?: SvgUsageType;
    from?: string;
    to?: string;
}

export interface IUsageSummaryQuery {
    from: string;
    to: string;
}

export interface IUsageSummary {
    totalEvents: number;
    byType: Record<SvgUsageType, number>;
    topSvgs: Array<{ svgId: string; slug?: string; count: number }>;
    range: { from: string; to: string };
}
