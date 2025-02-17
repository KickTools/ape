"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useKickAuth } from "@/context/KickAuthContext";
import { fetchTwitchUserData } from "@/utils/api";

// components
import { Spinner } from "@heroui/spinner";

const Callback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { twitchData, setPage, setTwitchData } = useKickAuth();
  console.log("twitchData", twitchData);

  const twitchUserName = twitchData?.user?.display_name || "N/A";

  useEffect(() => {
    const sessionId = searchParams?.get('sessionId');

    if (sessionId) {
      fetchTwitchUserData()
        .then(data => {
          setTwitchData(data);
          setPage("kickVerify");
          router.push("/connect"); // Redirect back to main page
        })
        .catch(error => {
          console.error("Error:", error);
          router.push("/connect");
        });
    }
  }, [searchParams, setPage, setTwitchData, router]);

  return (
    <div className="flex-grow my-auto space-y-6 text-center">
      <Spinner size="lg" />
      <h1 className="text-4xl font-bold mb-4">Processing Data for<span className="text-twitch mx-2">{twitchUserName}</span>Twitch API...</h1>
    </div>
  );
};

export default Callback; // No provider needed here