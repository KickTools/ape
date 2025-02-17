// types/kick.tsx
export interface KickSocialLinks {
  instagram?: string;
  twitter?: string;
  youtube?: string;
  discord?: string;
  tiktok?: string;
  facebook?: string;
}

export interface KickUserData {
  id: number;
  user_id: string;
  slug: string;
  chatroom_id: number;
  username: string;
  profile_pic: string;
  bio: string;
  is_banned: boolean;
  vod_enabled: boolean;
  subscription_enabled: boolean;
  is_affiliate: boolean;
  is_verified: boolean;
  followers_count: number;
  banner_image_url: string;
  created_at: string;
  email_verified_at?: string | null;
  social_links: KickSocialLinks;
}

export interface KickApiResponse {
  success: boolean;
  user?: KickUserData;
  message?: string;
}