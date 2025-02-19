// types/viewerFormData.tsx
export interface FormState {
    message: string;
    type: 'success' | 'error';
}

export interface ApiResponse<T = any> {
    data?: T;
    status: number;
    message?: string;
    error?: ApiError;
}

// Error types that match our backend responses
export interface ApiError {
    code: ErrorCode;
    message: string;
    fields?: string[];
}

// All possible error codes from our backend
export type ErrorCode = 
    | 'DUPLICATE_BITCOIN_ADDRESS'
    | 'MISSING_FIELDS'
    | 'VIEWER_NOT_FOUND'
    | 'INTERNAL_ERROR';

// Form data structure
export interface ViewerSettings {
    bitcoinAddress: string;
    contactAddress: string;
}

// MongoDB document structure
export interface ViewerSettingsAPI {
    _id: string;
    viewer: string;
    bitcoinAddress: string;
    contactAddress: string;
    createdAt: string;
    updatedAt: string;
}

// Form submission response type
export type ViewerFormResponse = ApiResponse<ViewerSettingsAPI>;