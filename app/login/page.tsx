// app/login/TwitchLogin.tsx
"use client";

import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { KickLogoIcon, TwitchLogoIcon } from "@/components/icons";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const TwitchLogin = () => {
  const handleLogin = (platform: "twitch" | "kick") => {
    window.location.href = `${apiBaseUrl}/auth/${platform}/login`;
  };

  return (
    <div className="flex flex-col flex-grow items-center justify-center gap-6 py-12 px-6 text-center">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-5xl font-black tracking-wide">Welcome Back!</h1>
          <p className="mt-2 text-lg text-foreground-200 tracking-wide">
            Sign in with your Twitch or Kick account to continue
          </p>
        </div>
        <div className="flex flex-col gap-4 px-16">
          <Button
            size="lg"
            radius="lg"
            className="w-full bg-twitch font-bold"
            onPress={() => handleLogin("twitch")}
            startContent={<TwitchLogoIcon />}
          >
            Sign in with Twitch
          </Button>
          <Button
            size="lg"
            radius="lg"
            className="w-full bg-kick text-background font-bold"
            onPress={() => handleLogin("kick")}
            startContent={<KickLogoIcon />}
          >
            Sign in with Kick
          </Button>
        </div>
        <p className="text-foreground-200 tracking-wide">Not verified? Get started <Link href="/connect" color="success">here</Link>.</p>

      </div>
    </div>
  );
};

export default TwitchLogin;
