"use client";
import { useKickAuth } from "@/context/KickAuthContext";

// Dependencies
import { Button } from "@heroui/button";

// Assets
import { VerifiedIcon } from "@/components/icons";

export default function LandingConnect() {
  const { setPage } = useKickAuth();

  return (
    <section className="flex flex-col flex-grow items-center justify-center gap-6 py-10 px-6 text-center">
      {/* Title */}
      <div className="flex items-center gap-2">
        <h1 className="text-4xl font-bold tracking-tight">Get Verified</h1>
        <VerifiedIcon className="w-8 h-8 text-green-500" />
      </div>

      {/* Process Explanation */}
      <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-2xl">
        To complete verification, you'll need to connect your **Twitch** and **Kick** accounts.  
        After that, you'll provide your profile information for giveaways and contact purposes.
      </p>

      {/* Steps */}
      <div className="text-xl text-left space-y-3 max-w-lg mt-4">
        <div className="flex items-center gap-2">
          <span className="text-primary font-bold">1.</span> Connect your **Twitch** account.
        </div>
        <div className="flex items-center gap-2">
          <span className="text-primary font-bold">2.</span> Connect your **Kick** account.
        </div>
        <div className="flex items-center gap-2">
          <span className="text-primary font-bold">3.</span> Fill out your profile information.
        </div>
      </div>

      {/* CTA Button */}
      <Button
        size="lg"
        radius="full"
        color="primary"
        onPress={() => setPage("twitchOAuth")}
        className="font-semibold mt-6"
      >
        Start Verification
      </Button>
    </section>
  );
}
