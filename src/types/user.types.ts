import { Address, ApiSuccessResponse, ApiListResponse } from './common.types';

export type KycStatus = 'unverified' | 'pending' | 'verified' | 'rejected';

export interface User {
    id: string;
    email: string;
    phone?: string;
    firstName: string;
    lastName: string;
    kycStatus: KycStatus;
    address?: Address;
    createdAt: string;
    updatedAt?: string;
}

export interface CreateUserRequest {
    email: string;
    phone?: string;
    firstName: string;
    lastName: string;
    address?: Address;
}

export type UpdateUserRequest = CreateUserRequest;
export type PatchUserRequest = Partial<CreateUserRequest>;

export type UserResponse = ApiSuccessResponse<User>;
export type UsersListResponse = ApiListResponse<User>;
export type AuthMeResponse = ApiSuccessResponse<User>;

export interface KycVerificationRequest {
    kycStatus: KycStatus;
}

export type KycVerificationResponse = ApiSuccessResponse<User>;