// utils/api.ts
import { KickUserData, KickApiResponse } from '@/types/kick';
import { TwitchUserData, TwitchApiResponse, TwitchData } from '@/types/twitch';

const BASE_URL = 'http://localhost:9988'; // Replace with your actual base URL

async function fetchData(url: string, options?: RequestInit) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

export async function fetchKickUserData(username: string): Promise<KickUserData> {
  const data: KickApiResponse = await fetchData(`${BASE_URL}/kick/channel/${username}`);

  if (!data.success || !data.user) {
    throw new Error('User data not found');
  }
  return data.user;
}

export async function fetchTwitchUserData(): Promise<TwitchData> {
  const data: TwitchApiResponse = await fetchData(`${BASE_URL}/auth/twitch/session-data`, {
    credentials: 'include',
  });

  if (!data.success || !data.user) {
    throw new Error('Twitch user data not found');
  }

  const twitchData: TwitchData = {
    user: data.user,
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
    expiresAt: data.expiresAt,
  };

  return twitchData;
}

export async function saveUserData(twitchData: TwitchData, kickData: KickUserData): Promise<any> {
  return fetchData(`${BASE_URL}/auth/save`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ twitchData, kickData }),
  });
}

export async function refreshTwitchToken(refreshToken: string): Promise<{
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
}> {
  return fetchData(`${BASE_URL}/auth/twitch/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken }),
  });
}

export async function fetchLoginUserData(twitchUserId: string): Promise<{ viewerData: any }> {
  const viewerData = await fetchData(`${BASE_URL}/data/retrieve/viewers/twitch/${twitchUserId}`);
  return { viewerData };
}

export async function submitFormData(viewerId: string, bitcoinAddress: string, contactAddress: string): Promise<any> {
  return fetchData(`${BASE_URL}/data/submit/form-data`, {
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
}

export async function fetchFormData(twitchUserId: string): Promise<any> {
  return fetchData(`${BASE_URL}/data/submit/form-data/${twitchUserId}`);
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

export async function searchViewers(query: string): Promise<SearchResult[]> {
  try {
    const data = await fetchData(`${BASE_URL}/data/retrieve/search/viewers?q=${encodeURIComponent(query)}&limit=10`);
    return data.results;
  } catch (error) {
    console.error('Search error:', error);
    throw error;
  }
}