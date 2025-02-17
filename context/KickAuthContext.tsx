// context/KickAuthContext.tsx
"use client";

import { createContext, useState, ReactNode, useContext } from "react";
import { KickUserData } from "@/types/kick";
import { TwitchData } from "@/types/twitch";

type KickAuthContextProps = {
  page: string;
  setPage: (page: string) => void;
  senderId: string;
  setSenderId: (id: string) => void;
  twitchData: TwitchData | null;
  setTwitchData: (data: TwitchData | null) => void;
  kickData: KickUserData | null;
  setKickData: (data: KickUserData | null) => void;
};

const KickAuthContext = createContext<KickAuthContextProps | undefined>(undefined);

export function useKickAuth() {
  const context = useContext(KickAuthContext);
  if (!context) {
    throw new Error("useKickAuth must be used within a KickAuthProvider");
  }
  return context;
}

export const KickAuthProvider = ({ children }: { children: ReactNode }) => {
  const [page, setPage] = useState("landing");
  const [senderId, setSenderId] = useState("");
  const [twitchData, setTwitchData] = useState<TwitchData | null>(null);
  const [kickData, setKickData] = useState<KickUserData | null>(null);

  return (
    <KickAuthContext.Provider 
      value={{
        page,
        setPage,
        senderId,
        setSenderId,
        twitchData,
        setTwitchData,
        kickData,
        setKickData
      }}
    >
      {children}
    </KickAuthContext.Provider>
  );
};