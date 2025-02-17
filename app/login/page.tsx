// app/login/TwitchLogin.tsx
"use client";

import { Button } from "@heroui/button";

const TwitchLogin = () => {
  const handleTwitchLogin = () => {
    window.location.href = 'http://localhost:9988/auth/login';
  };

  return (
    <div  className="flex flex-col flex-grow items-center justify-center gap-6 py-12 px-6 text-center">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="mt-6 text-4xl font-bold">Welcome Back</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Sign in with your Twitch account to continue
          </p>
        </div>
        
        <Button
          size="lg"
          radius="full"
          className="w-full bg-twitch font-bold"
          onPress={handleTwitchLogin}
        >
          Sign in with Twitch
        </Button>
      </div>
    </div>
  );
};

export default TwitchLogin;