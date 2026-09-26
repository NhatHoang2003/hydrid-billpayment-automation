import { ApiSuccessResponse, ApiListResponse } from './common.types';
import { PaymentMethodType } from './payment-method.types';

export type PaymentStatus =
    | 'initiated'
    | 'processing'
    | 'completed'
    | 'failed'
    | 'refunded'
    | 'cancelled';

export interface Payment {
    id: string;
    billId: string;
    userId: string;
    amount: number;
    status: PaymentStatus;
    transactionId?: string;
    paymentMethodId: string;
    paymentMethodType: PaymentMethodType;
    failureReason?: string;
    createdAt: string;
    updatedAt?: string;
}

export interface CreatePaymentRequest {
    billId: string;
    amount: number;
    paymentMethodId: string;
    paymentMethodType: PaymentMethodType;
}

export type PaymentResponse = ApiSuccessResponse<Payment>;
export type PaymentsListResponse = ApiListResponse<Payment>;
export type RefundResponse = ApiSuccessResponse<Payment>;

export interface PaymentStats {
    byStatus: Record<string, { count: number; totalAmount: number }>;
    successRate?: number;
}
export type PaymentStatsResponse = ApiSuccessResponse<PaymentStats>;