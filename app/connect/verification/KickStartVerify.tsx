// app/connect/verification/KickStartVerify.tsx

import { Button } from "@heroui/button";
import { useKickAuth } from "@/context/KickAuthContext";

const KickStartVerify = () => {
  const { setPage } = useKickAuth();

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Connect Your Accounts</h1>
      <p className="text-lg mb-8">
        To proceed, you need to connect your Kick and Twitch accounts. This
        will allow us to verify your identity and provide a seamless
        experience.
      </p>
      <p className="text-lg mb-8">First we will start with Twitch</p>
      <Button
        size="lg"
        radius="full"
        className="bg-twitch text-white"
        onPress={() => setPage("verifyCode")}
      >
        Connect Twitch
      </Button>
    </div>
  );
};

export default KickStartVerify;
