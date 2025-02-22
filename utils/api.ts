// utils/api.ts
import { KickUserData, KickApiResponse } from "@/types/kick";
import { TwitchUserData, TwitchAuthResponse } from "@/types/twitch";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

async function fetchData(url: string, options?: RequestInit) {
  const response = await fetch(url, {
    ...options,
    credentials: "include" // Always include credentials for cookies
  });

  if (response.status === 401) {
    // Token expired, try to refresh
    const refreshResponse = await fetch(`${apiBaseUrl}/auth/refresh-token`, {
      method: "POST",
      credentials: "include"
    });

    if (refreshResponse.ok) {
      // Retry the original request after token refresh
      const retryResponse = await fetch(url, {
        ...options,
        credentials: "include"
      });

      if (!retryResponse.ok) {
        throw new Error(
          `Failed to fetch: ${retryResponse.status} ${retryResponse.statusText}`
        );
      }

      return retryResponse.json();
    } else {
      // Refresh failed, redirect to login
      window.location.href = "/login";
      throw new Error("Session expired");
    }
  }

  if (!response.ok) {
    throw new Error(
      `Failed to fetch: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

export async function fetchKickUserData(): Promise<KickUserData> {
  try {
    const response = await fetch(`${apiBaseUrl}/auth/kick/user`, {
      credentials: "include"
    });

    if (!response.ok) {
      throw new Error("Failed to fetch Kick user data");
    }

    const data = await response.json();

    if (!data.success || !data.user) {
      throw new Error("Kick user data not found");
    }

    return data.user;
  } catch (error) {
    console.error("Error fetching Kick user data:", error);
    throw error;
  }
}

export async function fetchTwitchUserData(): Promise<TwitchUserData> {
  try {
    const response = await fetch(`${apiBaseUrl}/auth/user`, {
      credentials: "include"
    });

    if (!response.ok) {
      throw new Error("Failed to fetch Twitch user data");
    }

    const data: TwitchAuthResponse = await response.json();

    if (!data.success || !data.user) {
      throw new Error("Twitch user data not found");
    }

    // Transform the Twitch API response to match TwitchUserData interface
    const transformedUserData: TwitchUserData = {
      user_id: data.user.id,
      login: data.user.login,
      display_name: data.user.display_name,
      type: data.user.type,
      broadcaster_type: data.user.broadcaster_type,
      description: data.user.description,
      profile_image_url: data.user.profile_image_url,
      offline_image_url: data.user.offline_image_url,
      view_count: data.user.view_count,
      followers_count: 0, // Default value since it's not provided by the API
      email: data.user.email,
      created_at: data.user.created_at
    };

    return transformedUserData;
  } catch (error) {
    console.error("Error fetching Twitch user data:", error);
    throw error;
  }
}

export async function saveUserData(
  twitchData: { user: TwitchUserData },
  kickData: KickUserData
): Promise<{
  success: boolean;
  user?: TwitchUserData;
  isAuthenticated?: boolean;
}> {
  return fetchData(`${apiBaseUrl}/auth/save`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include", // Ensure cookies are sent
    body: JSON.stringify({ twitchData, kickData })
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
    twitch?: {
      // Move twitch to same level as kick
      user_id: string;
      profile: {
        twitch: TwitchUserData;
      };
    };
  };
}

export async function fetchLoginUserData(
  twitchUserId: string
): Promise<ViewerData> {
  const viewerData = await fetchData(
    `${apiBaseUrl}/data/retrieve/viewers/twitch/${twitchUserId}`
  );
  return { viewerData };
}

export interface SearchResult {
  id: string;
  name: string;
  twitch?: {
    username: string;
    verified: boolean;
    profilePic?: string;
    url: string;
  };
  kick?: {
    username: string;
    verified: boolean;
    twitter?: string;
  };
  bitcoinAddress: string;
  contactAddress: string;
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
    console.error("Search error:", error);
    throw error;
  }
}

interface BasePlatformResponse {
  isValid: boolean;
  message?: string;
}

interface TwitchVerificationResponse extends BasePlatformResponse {
  platform: "twitch";
  user?: TwitchUserData;
}

interface KickVerificationResponse extends BasePlatformResponse {
  platform: "kick";
  user?: KickUserData;
}

type VerificationResponse =
  | TwitchVerificationResponse
  | KickVerificationResponse;

export async function verifyAuthToken(
  platform: "twitch" | "kick"
): Promise<VerificationResponse> {
  try {
    let endpoint;
    switch (platform) {
      case "twitch":
        endpoint = "/auth/verify-token";
        break;
      case "kick":
        endpoint = "/auth/verify-kick-token";
        break;
      default:
        throw new Error(`Unsupported platform: ${platform}`);
    }

    const response = await fetchData(`${apiBaseUrl}${endpoint}`);

    return {
      ...response,
      platform
    };
  } catch (error) {
    return {
      isValid: false,
      platform,
      message:
        error instanceof Error ? error.message : "Token verification failed"
    };
  }
}
