// utils/api.ts
import { KickUserData, KickApiResponse } from '@/types/kick';
import { TwitchUserData, TwitchAuthResponse } from '@/types/twitch';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

async function fetchData(url: string, options?: RequestInit) {
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
    throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
}

export async function fetchKickUserData(username: string): Promise<KickUserData> {
  const data: KickApiResponse = await fetchData(`${apiBaseUrl}/kick/channel/${username}`);

  if (!data.success || !data.user) {
    throw new Error('User data not found');
  }
  return data.user;
}

export async function fetchTwitchUserData(): Promise<TwitchUserData> {
  try {
    const response = await fetch(`${apiBaseUrl}/auth/user`, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch Twitch user data');
    }

    const data: TwitchAuthResponse = await response.json();

    if (!data.success || !data.user) {
      throw new Error('Twitch user data not found');
    }

    // Return just the user data, not wrapped in an object
    return data.user;
  } catch (error) {
    console.error('Error fetching Twitch user data:', error);
    throw error;
  }
}

export async function saveUserData(
  twitchData: { user: TwitchUserData },
  kickData: KickUserData
): Promise<{ success: boolean; user?: TwitchUserData; isAuthenticated?: boolean }> {
  return fetchData(`${apiBaseUrl}/auth/save`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Ensure cookies are sent
    body: JSON.stringify({ twitchData, kickData }),
  });
}

interface ViewerData {
  viewerData: {
    kick?: {
      user_id: string;
      profile: {
        kick: KickUserData;
      };
    };
    // Add other viewer data properties as needed
  };
}

export async function fetchLoginUserData(twitchUserId: string): Promise<ViewerData> {
  const viewerData = await fetchData(`${apiBaseUrl}/data/retrieve/viewers/twitch/${twitchUserId}`);
  return { viewerData };
}

export interface SearchResult {
  id: string;
  name: string;
  twitch?: {
    username: string;
    verified: boolean;
  };
  kick?: {
    username: string;
    verified: boolean;
  };
}

interface SearchResponse {
  success: boolean;
  results: SearchResult[];
}

export async function searchViewers(query: string): Promise<SearchResult[]> {
  try {
    const data: SearchResponse = await fetchData(
      `${apiBaseUrl}/data/retrieve/search/viewers?q=${encodeURIComponent(query)}&limit=10`
    );
    return data.results;
  } catch (error) {
    console.error('Search error:', error);
    throw error;
  }
}