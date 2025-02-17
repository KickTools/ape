// components/KickVerify.tsx
"use client";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useKickAuth } from "@/context/KickAuthContext";
import { KickLogoIcon } from "@/components/icons";
import { useState } from "react";
import { fetchKickUserData } from "@/utils/api";
import { KickUserData } from '@/types/kick';

const KickVerify = () => {
  const { setPage, setSenderId, setKickData } = useKickAuth();
  const [kickUsername, setKickUsername] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleConnectKick = async () => {
    try {
      const userData: KickUserData = await fetchKickUserData(kickUsername);

      if (userData) {
        setSenderId(userData.user_id);
        setKickData(userData);
        setPage("kickVerifyCode"); 
      }
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to connect to Kick.";
      setError(errorMessage); // Fixed: was using 'error' instead of 'errorMessage'
      console.error("Error connecting to Kick:", err);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleConnectKick();
    }
  };

  return (
    <div className="text-center space-y-6">
      <h1 className="text-4xl font-bold mb-4">Connect Your Kick Account</h1>
      <p className="text-lg mb-8">
        To proceed, you need to connect your Kick account. This will allow us
        to verify your identity and provide a seamless experience.
      </p>
      <Input
        value={kickUsername}
        placeholder="Enter your Kick username"
        size="lg"
        radius="sm"
        startContent={<span className="mr-2 text-kick"><KickLogoIcon /></span>}
        onChange={(e) => setKickUsername(e.target.value)}
        onKeyDown={handleKeyPress}
        />
      {error && <p className="text-red-500">{error}</p>}
      <Button
        size="lg"
        radius="full"
        className="bg-kick text-black font-bold"
        onPress={handleConnectKick}
      >
        Connect Kick
      </Button>
    </div>
  );
};

export default KickVerify;
