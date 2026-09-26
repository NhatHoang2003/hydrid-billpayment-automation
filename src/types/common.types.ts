export interface Address {
    line1?: string | null;
    line2?: string | null;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
}

export interface Money {
    amount: number;
    currency?: string;
}

export interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
    offset: number;
    nextCursor: string | null;
    prevCursor: string | null;
}

export interface ResponseMeta {
    requestId: string;
    timestamp: string;
    version: string;
    pagination?: Pagination;
}

export interface ApiSuccessResponse<data> {
    success: true;
    data: data;
    meta: ResponseMeta;
}

export type ApiListResponse<data> = ApiSuccessResponse<data[]>;

export interface DeleteResponse {
    success: true;
    data: { id: string; deleted: true };
    meta: ResponseMeta;
}