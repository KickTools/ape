// types/auth.tsx

import { TwitchUserData } from "@/types/twitch";
import { KickUserData } from "@/types/kick";

export interface ConnectedUserData {
    twitch: TwitchUserData;
    kick: KickUserData;
    primaryPlatform: "twitch" | "kick"; // Or your platform types
}