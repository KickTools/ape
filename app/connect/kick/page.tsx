// app/connect/kick/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useKickAuth } from "@/context/KickAuthContext";
import { fetchKickUserData } from "@/utils/api";
import { Spinner } from "@heroui/spinner";

const Callback = () => {
  const router = useRouter();
  const { kickData, setPage, setKickData, setTwitchData } = useKickAuth();
  const kickUserName = kickData?.username || "N/A";

  useEffect(() => {
    fetchKickUserData()
      .then(userData => {
        console.log(userData);
        setKickData(userData);
        setPage("complete");
        setTwitchData(JSON.parse(sessionStorage.getItem("twitchData") || "null"));
        sessionStorage.removeItem("twitchData");
        sessionStorage.removeItem("twitchUserName");
        router.push("/connect");
      })
      .catch(error => {
        console.error("Error fetching Kick data:", error);
        router.push("/connect");
      });
  }, [setPage, setKickData, router, setTwitchData]);

  return (
    <div className="flex-grow my-auto space-y-6 text-center">
      <Spinner size="lg" />
      <h1 className="text-4xl font-bold mb-4">
        Processing Data for
        <span className="text-kick mx-2">{kickUserName}</span>
        Kick API...
      </h1>
    </div>
  );
};

export default Callback;