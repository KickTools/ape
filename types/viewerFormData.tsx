// types/viewerFormData.tsx
export interface ApiResponse<T> {
    data: T;
    status: number;
    message?: string;
}

export interface ViewerSettings {
    bitcoinAddress: string;
    contactAddress: string;
}

// This matches the actual MongoDB document structure
export interface ViewerSettingsAPI {
    _id: string;
    viewer: string;
    bitcoinAddress: string;
    contactAddress: string;
    createdAt: string;
    updatedAt: string;
}