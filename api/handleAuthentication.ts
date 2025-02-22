import { KickUserData } from "@/types/kick";
import { TwitchUserData } from "@/types/twitch";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

interface ConnectedViewerData {
    twitch: TwitchUserData;
    kick: KickUserData;
}

interface VerificationResponse {
  isValid: boolean;
  user?: TwitchUserData | KickUserData;
  platform: "twitch" | "kick";
  message?: string;
}

export async function verifyAuthToken(
  platform: "twitch" | "kick"
): Promise<VerificationResponse> {
  try {
    const endpoint = `/auth/verify-${platform}-token`;
    const response = await fetchData(endpoint);

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

export async function fetchLoginUserData(
    userId: number,
    platform: "twitch" | "kick"
  ): Promise<ConnectedViewerData> {
    try {
      console.log(`Fetching user data for platform: ${platform}, userId: ${userId}`);
  
      const data = await fetchData(`/data/retrieve/viewers/${platform}/${userId}`);
  
      console.log("Fetched API Response:", data);
  
      return data;
    } catch (error) {
      console.error("Error fetching login user data:", error);
      throw error;
    }
  }
  

async function fetchData(endpoint: string, options?: RequestInit) {
  const response = await fetch(`${apiBaseUrl}${endpoint}`, {
    ...options,
    credentials: "include"
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json();
}
