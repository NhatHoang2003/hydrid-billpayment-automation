import { ApiSuccessResponse, ApiListResponse } from './common.types';
import { PaymentMethodType } from './payment-method.types';

export type BillerCategory =
    | 'telecom'
    | 'electricity'
    | 'water'
    | 'gas'
    | 'broadband'
    | 'dth'
    | 'insurance'
    | 'credit_card'
    | 'loan'
    | 'municipal_tax'

export interface Biller {
    id: string;
    name: string;
    displayName: string;
    category: BillerCategory;
    minAmount: number;
    maxAmount: number;
    isActive: boolean;
    logoUrl?: string;
    description?: string;
    supportedPaymentModes?: PaymentMethodType[];
    fetchBillSupported?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateBillerRequest {
    name: string;
    displayName: string;
    category: BillerCategory;
    minAmount?: number;
    maxAmount?: number;
}

export type UpdateBillerRequest = CreateBillerRequest;
export type PatchBillerRequest = Partial<CreateBillerRequest>;

export type BillerResponse = ApiSuccessResponse<Biller>;
export type BillersListResponse = ApiListResponse<Biller>;
export type CategoriesResponse = ApiSuccessResponse<BillerCategory[]>;