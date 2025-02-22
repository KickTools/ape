// app/connect/twitch/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useKickAuth } from "@/context/KickAuthContext";
import { fetchTwitchUserData } from "@/utils/api";
import { Spinner } from "@heroui/spinner";

const Callback = () => {
  const router = useRouter();
  const { setPage, setTwitchData } = useKickAuth();
  const twitchUserName = sessionStorage.getItem("twitchUserName") || "N/A";

  useEffect(() => {
    fetchTwitchUserData()
      .then(userData => {
        sessionStorage.setItem("twitchData", JSON.stringify(userData));
        sessionStorage.setItem("twitchUserName", userData.display_name);
        setTwitchData(userData);
        setPage("kickOAuth");
        router.push("/connect");
      })
      .catch(error => {
        console.error("Error fetching Twitch data:", error);
        router.push("/connect");
      });
  }, [setPage, setTwitchData, router]);

  return (
    <div className="flex-grow my-auto space-y-6 text-center">
      <Spinner size="lg" />
      <h1 className="text-4xl font-bold mb-4">
        Processing Data for
        <span className="text-twitch mx-2">{twitchUserName}</span>
        Twitch API...
      </h1>
    </div>
  );
};

export default Callback;