// utilis/api.ts is a file that contains functions to fetch data from the server.
import { KickUserData, KickApiResponse } from '@/types/kick';
import { TwitchUserData, TwitchApiResponse, TwitchData } from '@/types/twitch';

const BASE_URL = 'http://localhost:9988'; // Replace with your actual base URL

export async function fetchKickUserData(username: string): Promise<KickUserData> {
  const response = await fetch(`${BASE_URL}/kick/channel/${username}`);
    
  if (!response.ok) {
    throw new Error(`Failed to fetch user data: ${response.statusText}`);
  }

  const data: KickApiResponse = await response.json();
  console.log(data);
  
  if (!data.success || !data.user) {
    throw new Error('User data not found');
  }

  return data.user;
}

export async function fetchTwitchUserData(): Promise<TwitchData> {
  try {
    const response = await fetch(`${BASE_URL}/auth/twitch/session-data`, {
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Twitch user data: ${response.statusText}`);
    }

    const data: TwitchApiResponse = await response.json();

    if (!data.success || !data.user) {
      throw new Error('Twitch user data not found');
    }

    // Convert TwitchUserData to TwitchData
    const twitchData: TwitchData = {
      user: data.user,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      expiresAt: data.expiresAt,
    };

    return twitchData;
  } catch (error) {
    console.error("Error fetching Twitch user data:", error);
    throw error;
  }
}

export async function saveUserData(twitchData: TwitchData, kickData: KickUserData): Promise<any> {
  try {
    const response = await fetch(`${BASE_URL}/auth/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ twitchData, kickData }),
    });

    if (!response.ok) {
      throw new Error(`Failed to save user data: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error saving user data:", error);
    throw error;
  }
}

export async function refreshTwitchToken(refreshToken: string): Promise<{
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
}> {
  const response = await fetch(`${BASE_URL}/auth/twitch/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    throw new Error('Failed to refresh token');
  }

  const data = await response.json();
  return data;
}

export async function fetchLoginUserData(twitchUserId: string) {
  try {
    // Then get the complete viewer data
    const viewerResponse = await fetch(`http://localhost:9988/data/retrieve/viewers/twitch/${twitchUserId}`);
    if (!viewerResponse.ok) throw new Error('Failed to fetch viewer data');
    const viewerData = await viewerResponse.json();

    return {
      viewerData: viewerData, // This includes both Twitch and Kick data from your schema
    };
  } catch (error) {
    console.error('Error fetching login data:', error);
    throw error;
  }
}

export async function submitFormData(viewerId: string, bitcoinAddress: string, contactAddress: string) {
  try {
    const response = await fetch('http://localhost:9988/data/submit/form-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        viewer: viewerId,
        bitcoinAddress,
        contactAddress
      })
    });

    if (!response.ok) throw new Error('Failed to submit form data');
    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error('Error submitting form data:', error);
    throw error;
  }
}

export async function fetchFormData(twitchUserId: string) {
  try {
    const response = await fetch(`http://localhost:9988/data/submit/form-data/${twitchUserId}`);
    if (!response.ok) throw new Error('Failed to fetch form data');
    const formData = await response.json();
    return formData;
  } catch (error) {
    console.error('Error fetching form data:', error);
    throw error;
  }
}