import { ApiResponse, ViewerSettings, ViewerSettingsAPI, ViewerFormResponse, ApiError } from '@/types/viewerFormData';
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

async function fetchAPI(url: string, options?: RequestInit) {
  const response = await fetch(url, {
    ...options,
    credentials: 'include', // Always include credentials for cookies
  });
  
  if (response.status === 401) {
    // Token expired, try to refresh
    const refreshResponse = await fetch(`${apiBaseUrl}/auth/refresh-token`, {
      method: 'POST',
      credentials: 'include'
    });

    if (refreshResponse.ok) {
      // Retry the original request after token refresh
      const retryResponse = await fetch(url, {
        ...options,
        credentials: 'include'
      });
      
      if (!retryResponse.ok) {
        throw new Error(`Failed to fetch: ${retryResponse.status} ${retryResponse.statusText}`);
      }
      
      return retryResponse.json();
    } else {
      // Refresh failed, redirect to login
      window.location.href = '/login';
      throw new Error('Session expired');
    }
  }

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(JSON.stringify(errorResponse));
  }
  
  return response.json();
}

export async function fetchFormData(twitchUserId: string): Promise<ViewerSettings> {
  try {
      const response = await fetchAPI(`${apiBaseUrl}/data/submit/form-data/${twitchUserId}`);
      
      // The response directly contains the fields we need
      return {
          bitcoinAddress: response.bitcoinAddress || '',
          contactAddress: response.contactAddress || ''
      };
  } catch (error) {
      console.error('Error in fetchFormData:', error);
      throw error; // Let the component handle the error
  }
}

export async function submitFormData(
  viewerId: string,
  bitcoinAddress: string,
  contactAddress: string
): Promise<ApiResponse> {
  try {
      const response = await fetchAPI(`${apiBaseUrl}/data/submit/form-data`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              viewer: viewerId,
              bitcoinAddress,
              contactAddress,
          }),
      });

      // If we get here, it's a successful response
      return {
          status: 200,
          data: response,
          message: 'Settings saved successfully'
      };
  } catch (error: any) {
      // Check if the error response contains the expected structure
      try {
          const errorResponse = JSON.parse(error.message);
          return {
              status: 400,
              error: {
                  code: errorResponse.code,
                  message: errorResponse.error
              } as ApiError
          };
      } catch (parseError) {
          // Handle generic error
          return {
              status: 500,
              error: {
                  code: 'INTERNAL_ERROR',
                  message: error.message
              }
          };
      }
  }
}
