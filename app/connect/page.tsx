// app/connect/page.tsx
"use client";

import { useKickAuth } from "@/context/KickAuthContext";
import LandingConnect from "./landing/page";
import TwitchOAuth from "@/app/connect/auth/TwitchOAuth";
import KickOAuth from "@/app/connect/auth/KickOAuth";
import KickVerify from "@/app/connect/auth/KickVerify";
import KickVerifyCode from "@/app/connect/verification/KickVerifyCode";
import KickVerificationComplete from "@/app/connect/verification/KickVerificationComplete";
import { Card, CardBody } from "@heroui/card";

const ConnectPageContent = () => {
  const { page } = useKickAuth();

  const renderPage = () => {
    switch (page) {
      case "twitchOAuth":
        return <TwitchOAuth />;
      case "kickOAuth":
        return <KickOAuth />;
      case "kickVerify":
        return <KickVerify />;
      case "kickVerifyCode":
        return <KickVerifyCode />;
      case "complete":
        return <KickVerificationComplete />;
      default:
        return <LandingConnect />; // Default to LandingConnect
    }
  };

  // Skip Card when rendering LandingConnect
  if (page === "landing") {
    return <LandingConnect />;
  }

  return (
    <Card
      isBlurred
      className="border-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-background/10 via-background/20 to-background/40 max-w-md"
      shadow="sm"
    >
      <CardBody className="text-center p-8 space-y-8">{renderPage()}</CardBody>
    </Card>
  );
};

export default function Page() {
  return (
    <section className="flex flex-col flex-grow items-center justify-center gap-4 py-8 md:py-10">
      <ConnectPageContent />
    </section>
  );
}