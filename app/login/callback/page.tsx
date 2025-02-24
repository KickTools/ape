"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { fetchLoginUserData, verifyAuthToken } from "@/api/handleAuthentication";
import { Spinner } from "@heroui/spinner";
import { TwitchUserData } from "@/types/twitch";
import { KickUserData } from "@/types/kick";

const LoginCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const loginAttemptedRef = useRef(false);

  useEffect(() => {
    const handleLogin = async () => {
      if (loginAttemptedRef.current) return;
      loginAttemptedRef.current = true;

      const platform = searchParams.get('platform');

      // Type guard for platform
      if (!platform || (platform !== 'twitch' && platform !== 'kick')) {
        console.error("No platform specified or invalid platform");
        router.replace('/login?error=invalid_platform');
        return;
      }

      try {
        // First, verify the auth token for the current platform
        const verificationResult = await verifyAuthToken(platform);
        console.log('Verification Result:', verificationResult);

        if (!verificationResult.isValid || !verificationResult.user) {
          throw new Error(`Invalid ${platform} verification response`);
        }

        // Get additional viewer data - handle numeric ID
        const userId = typeof verificationResult.user.user_id === 'number'
          ? verificationResult.user.user_id
          : parseInt(verificationResult.user.user_id);

        if (isNaN(userId)) {
          throw new Error('Invalid user ID');
        }

        const connectedData = await fetchLoginUserData(userId, platform);
        console.log('Fetched:', connectedData);

        // Validate that we have both platform's data
        if (!connectedData?.twitch || !connectedData?.kick) {
          throw new Error("Missing required platform data");
        }

        const twitchProfile = connectedData.twitch as TwitchUserData;
        const kickProfile = connectedData.kick as KickUserData;

        if (!twitchProfile || !kickProfile) {
          throw new Error("Invalid platform profiles");
        }

        // Login with both platform's data
        await login({
          twitch: twitchProfile,
          kick: kickProfile,
          primaryPlatform: platform as 'twitch' | 'kick'
        });

        // Redirect to dashboard after successful login
        router.replace('/dashboard');

      } catch (error) {
        console.error("Login error:", error);
        router.replace('/login?error=auth_failed');
      }
    };

    if (!loginAttemptedRef.current) {
      handleLogin();
    }

    return () => {
      loginAttemptedRef.current = false;
    };
  }, [router, login, searchParams]);

  return (
    <div className="flex-grow my-auto space-y-6 text-center">
      <div className="text-center space-y-4">
        <Spinner size="lg" />
        <h1 className="text-4xl font-bold mb-4">
          Signing you in...
        </h1>
        <p className="text-muted-foreground">
          Please wait while we verify your connected accounts
        </p>
      </div>
    </div>
  );
};

export default LoginCallback;