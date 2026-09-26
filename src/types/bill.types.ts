import { ApiSuccessResponse, ApiListResponse } from './common.types';
import { BillerCategory } from './biller.types';

export type BillStatus =
    | 'pending'
    | 'paid'
    | 'overdue'
    | 'cancelled'
    | 'partially_paid';

export interface Bill {
    id: string;
    userId: string;
    billerId: string;
    customerIdentifier: string;
    amount: number;
    status: BillStatus;
    dueDate?: string;
    customerName?: string;
    billerCategory?: BillerCategory;
    createdAt: string;
    updatedAt?: string;
}

export interface CreateBillRequest {
    userId: string;
    billerId: string;
    customerIdentifier: string;
    amount: number;
    dueDate?: string;
}

export type UpdateBillRequest = CreateBillRequest;
export type PatchBillRequest = Partial<CreateBillRequest>;

export type BillResponse = ApiSuccessResponse<Bill>;
export type BillsListResponse = ApiListResponse<Bill>;

export interface BillsSummaryByStatus {
    count: number;
    totalAmount: number;
}

export interface BillsSummary {
    byStatus: Record<string, BillsSummaryByStatus>;
    total: BillsSummaryByStatus;
}

export type BillsSummaryResponse = ApiSuccessResponse<BillsSummary>;
export type BillFetchResponse = ApiSuccessResponse<Bill>;