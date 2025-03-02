// src/components/auth/LoginCallback.jsx
"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { fetchLoginUserData, verifyAuthToken } from "@/lib/auth";
import ApeLoader from "../elements/ApeLoader";

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

      // Check for valid platform
      if (!platform || (platform !== 'twitch' && platform !== 'kick')) {
        console.error("No platform specified or invalid platform");
        router.replace('/login?error=invalid_platform');
        return;
      }

      try {
        // First, verify the auth token for the current platform
        const verificationResult = await verifyAuthToken(platform);

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

        // Validate that we have both platform's data
        if (!connectedData?.twitch || !connectedData?.kick) {
          throw new Error("Missing required platform data");
        }

        const twitchProfile = connectedData.twitch;
        const kickProfile = connectedData.kick;

        if (!twitchProfile || !kickProfile) {
          throw new Error("Invalid platform profiles");
        }

        // Login with both platform's data
        await login({
          twitch: twitchProfile,
          kick: kickProfile,
          primaryPlatform: platform
        });

        // Redirect to dashboard after successful login
        router.replace('/user/welcome');

      } catch (error) {
        console.error("Login error:", error);
        router.replace('/login?error=auth_failed');
      }
    };

    if (!loginAttemptedRef.current) {
      handleLogin();
    }

  }, [router, login, searchParams]);

  return (
    <div className="flex-grow my-auto space-y-6 text-center">
      <div className="text-center space-y-1">
        <h1 className="text-4xl font-bold mb-4">
          Signing you in...
        </h1>
        <div className="flex justify-center">
          <ApeLoader />
        </div>
        <p className="text-muted-foreground">
          Please wait while we verify your connected accounts
        </p>

      </div>
    </div>
  );
};

export default LoginCallback;