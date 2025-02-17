export interface TwitchData {
  user: {
    id: string;
    login: string;
    display_name: string;
    type: string;
    broadcaster_type: string;
    description: string;
    profile_image_url: string;
    offline_image_url: string;
    view_count: number;
    email: string;
    created_at: string;
  };
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
}

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

export interface TwitchApiResponse {
  success: boolean;
  user: TwitchUserData;
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
}