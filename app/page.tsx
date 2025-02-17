// app/page.tsx
"use client";
// Context
import { useAuth } from "@/context/AuthContext";

// Dependencies
import { Button } from "@heroui/button";

// Assets
import { TrainwrecksTVLogo } from "@/components/logo";
import { VerifiedIcon } from "@/components/icons";

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <section className="flex flex-col flex-grow items-center justify-center gap-6 py-12 px-6 text-center">
      {/* Logo */}
      <TrainwrecksTVLogo className="mb-6" width={20} height={20} />

      {/* Welcome Message */}
      <h1 className="text-4xl font-bold tracking-tight">Welcome to Ape Gang Community</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
        This app helps you verify your <strong>Kick</strong> and <strong>Twitch</strong> accounts to gain access to exclusive features, communities, giveaways and rewards.
      </p>

      {/* Verification Badge */}
      <div className="flex flex-col items-center gap-2 mt-2 text-lg font-medium">
        <div className="flex items-center gap-2">
        <VerifiedIcon className="w-6 h-6 text-green-500 -translate-y-[2px]" />
        <span>Official Verification Process</span>
        </div>
        <span className="text-foreground-100 text-base">{isAuthenticated ? "You are currently verified" : ""}</span>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <Button
          as="a"
          size="lg"
          radius="full"
          color="primary"
          href={isAuthenticated ? "#" : "/connect"} // Disable href if authenticated
          isDisabled={isAuthenticated} // Disable button if authenticated
          className={`font-bold bg-kick text-background ${isAuthenticated ? "opacity-50 cursor-not-allowed" : ""}`} // Add styles for disabled state
        >
          {isAuthenticated ? "Verified" : "Verify Now"}
        </Button>
        <Button
          as="a"
          size="lg"
          radius="full"
          color="primary"
          href={isAuthenticated ? "/dashboard" : "/login"}
          className="font-bold"
        >
          {isAuthenticated ? "Continue" : "Log In"}
        </Button>
      </div>
    </section>
  );
}
