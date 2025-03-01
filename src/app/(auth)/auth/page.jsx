// app/(auth)/auth/page.jsx
"use client";  // Ensure this is at the very top

import { useAuth } from "@/contexts/AuthContext";
import { useBanner } from "@/contexts/BannerContext";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import TwitchOAuthStart from "@/components/auth/TwitchOAuthStart";
import KickOAuthStart from "@/components/auth/KickOAuthStart";
import AccountVerification from "@/components/auth/AccountVerification";

export default function AuthPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthPageContent />
    </Suspense>
  );
}

function AuthPageContent() {
  const { loading } = useAuth();
  const { updateBanner } = useBanner();
  const searchParams = useSearchParams(); // Only valid inside Client Components

  const [authState, setAuthState] = useState("login");

  useEffect(() => {
    const initialState = searchParams.get("flow") || "login";
    setAuthState(initialState);
    updateBanner(initialState);
  }, [searchParams]);

  useEffect(() => {
    const platformParams = searchParams.get("platform");
    const redirectParams = searchParams.get("auth_flow");

    if (redirectParams === "verified" && platformParams === "twitch") {
      setAuthState("kickOAuthStart");
      updateBanner("kickOAuthStart");
    } else if (redirectParams === "verified" && platformParams === "kick") {
      setAuthState("accountVerification");
      updateBanner("accountVerification");
    }
  }, [searchParams]);

  const handleStateChange = (newState) => {
    setAuthState(newState);
    updateBanner(newState);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-apeRed"></div>
      </div>
    );
  }

  return (
    <div className="max-w-96 mx-auto">
      {authState === "login" && <LoginForm setAuthState={handleStateChange} />}
      {authState === "register" && <RegisterForm setAuthState={handleStateChange} />}
      {authState === "twitchOAuthStart" && <TwitchOAuthStart setAuthState={handleStateChange} />}
      {authState === "kickOAuthStart" && <KickOAuthStart setAuthState={handleStateChange} />}
      {authState === "accountVerification" && <AccountVerification setAuthState={handleStateChange} />}
    </div>
  );
}
