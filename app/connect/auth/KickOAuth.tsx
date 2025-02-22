// app/connect/auth/KickOAuth.tsx
"use client";

import { Button } from "@heroui/button";
import { KickLogoIcon } from "@/components/icons";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const KickOAuth = () => {

  const handleKickOAuth = () => {
    window.location.href = `${apiBaseUrl}/auth/kick/verify`;
  };

  return (
    <div className="text-center">
      <h1 className="text-4xl font-black mb-4">Connect Your Kick Account</h1>
      <p className="text-lg mb-8">
        Next, you will need to connect your Kick account. This will allow pair your Twitch and Kick
        accounts to further improve your verification.
      </p>
      <Button
        size="lg"
        radius="full"
        className="bg-kick font-bold text-background"
        onPress={handleKickOAuth}
        startContent={<KickLogoIcon />}
      >
        Connect Kick
      </Button>
    </div>
  );
};

export default KickOAuth;