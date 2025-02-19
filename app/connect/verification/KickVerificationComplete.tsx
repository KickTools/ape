// app/connect/verification/KickVerificationComplete.tsx
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useKickAuth } from "@/context/KickAuthContext";
import { useAuth } from "@/context/AuthContext";
import { saveUserData } from "@/utils/api";

// components
import { Spinner } from "@heroui/spinner";
import { KickLogoIcon } from "@/components/icons";

const KickVerificationComplete = () => {
  const { kickData, twitchData } = useKickAuth();
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleDataSave = async () => {
      if (!kickData || !twitchData) {
        setError("Missing required authentication data");
        setIsProcessing(false);
        return;
      }

      try {

        // Save to backend
        const response = await saveUserData({ user: twitchData }, kickData);

        if (!response.success || !response.isAuthenticated) {
          throw new Error("Authentication not confirmed by backend");
        }

        // Update local auth state
        login({ user: twitchData }, kickData);

        // Wait to ensure state updates
        await new Promise(resolve => setTimeout(resolve, 500));

        // Redirect only if authentication is confirmed
        if (response.isAuthenticated) {
          router.push('/dashboard');
        } else {
          throw new Error("User authentication state is not properly updated");
        }
      } catch (error) {
        console.error("Verification process failed:", error);
        setError("Failed to complete verification process");
      } finally {
        setIsProcessing(false);
      }
    };


    handleDataSave();
  }, [kickData, twitchData, login, router]);

  if (error) {
    return (
      <div className="flex flex-col items-center space-y-6 p-8">
        <KickLogoIcon className="w-16 h-16 text-kick" />
        <h2 className="text-2xl font-bold text-center text-red-500">
          Verification Error
        </h2>
        <p className="text-center text-foreground">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-6 p-8">
      <KickLogoIcon className="w-16 h-16 text-kick" />
      <h2 className="text-2xl font-bold text-center">
        Verification Complete
      </h2>
      <p className="text-center text-foreground">
        Your Kick and Twitch accounts have been successfully connected.
      </p>
      {isProcessing && (
        <Spinner
          color="warning"
          size="lg"
          label="Finalizing your connection..."
          labelColor="warning"
        />
      )}
    </div>
  );
};

export default KickVerificationComplete;