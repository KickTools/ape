"use client";

import { Button } from "@heroui/button";
import { useKickAuth } from "@/context/KickAuthContext";

const TwitchOAuth = () => {
  const { setPage } = useKickAuth();

  const handleTwitchOAuth = () => {
    window.location.href = 'http://localhost:9988/auth/twitch';
  };

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Connect Your Twitch Account</h1>
      <p className="text-lg mb-8">
        To proceed, you need to connect your Twitch account. This will allow us
        to verify your identity and provide a seamless experience.
      </p>
      <Button
        size="lg"
        radius="full"
        className="bg-twitch font-bold"
        onPress={handleTwitchOAuth}
      >
        Connect Twitch
      </Button>
    </div>
  );
};

export default TwitchOAuth;