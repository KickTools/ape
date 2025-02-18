// types/twitch.tsx
export interface TwitchUserData {
  id: string;
  login: string;
  display_name: string;
  type: string;
  broadcaster_type: string;
  description: string;
  profile_image_url: string;
  offline_image_url: string;
  view_count: number;
  followers_count: number;
  email: string;
  created_at: string;
}

// This is what we receive from the backend /auth/user endpoint
export interface TwitchAuthResponse {
  success: boolean;
  user: TwitchUserData;
}

// This is what we store in our frontend state
export interface TwitchState {
  user: TwitchUserData | null;
}

// Only used for API response typing when needed
export interface LegacyTwitchApiResponse {
  success: boolean;
  user: TwitchUserData;
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
}

export interface TwitchData {
  user: TwitchUserData;
}