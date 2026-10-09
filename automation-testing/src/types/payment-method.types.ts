import { ApiSuccessResponse, ApiListResponse } from './common.types';

export type PaymentMethodType =
    | 'upi'
    | 'credit_card'
    | 'debit_card'
    | 'net_banking'
    | 'wallet';

export interface PaymentMethod {
    id: string;
    userId: string;
    type: PaymentMethodType;
    displayName: string;
    isDefault: boolean;
    createdAt: string;
    updatedAt?: string;
}

export interface CreatePaymentMethodRequest {
    type: PaymentMethodType;
    displayName: string;
    isDefault?: boolean;
}

export type UpdatePaymentMethodRequest = CreatePaymentMethodRequest;
export type PatchPaymentMethodRequest = Partial<CreatePaymentMethodRequest>;

export type PaymentMethodResponse = ApiSuccessResponse<PaymentMethod>;
export type PaymentMethodsListResponse = ApiListResponse<PaymentMethod>;
export type PaymentTypesResponse = ApiSuccessResponse<PaymentMethodType[]>;