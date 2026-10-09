import { Address, ApiSuccessResponse, ApiListResponse } from './common.types';

export interface GetUsersParams {
    page?: number;
    limit?: number;
    kyc_status?: string;
    search?: string;
}

export interface User {
    id: string;
    email: string;
    phone?: string;
    firstName: string;
    lastName: string;
    kycStatus: string;
    address?: Address;
    createdAt: string;
    updatedAt?: string;
}

export interface CreateUserRequest {
    email?: string | null;
    phone?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    address?: Address | null;
}


export type UpdateUserRequest = CreateUserRequest;
export type PatchUserRequest = Partial<CreateUserRequest>;

export type UserResponse = ApiSuccessResponse<User>;
export type UsersListResponse = ApiListResponse<User>;
export type AuthMeResponse = ApiSuccessResponse<User>;

export interface KycVerificationRequest {
    kycStatus: string;
}

export type KycVerificationResponse = ApiSuccessResponse<User>;