// app/login/callback/page.tsx
"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { fetchTwitchUserData, fetchLoginUserData } from "@/utils/api";

// components
import { Spinner } from "@heroui/spinner";

const LoginCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const loginAttemptedRef = useRef(false);

  useEffect(() => {
    const sessionId = searchParams?.get('sessionId');
    
    const handleLogin = async () => {
      if (loginAttemptedRef.current) return;
      loginAttemptedRef.current = true;

      try {
        const sessionData = await fetchTwitchUserData();
        
        const viewerData = await fetchLoginUserData(sessionData.user.id);
    
        if (viewerData.viewerData?.kick?.user_id) {
          await login(
            sessionData, 
            viewerData.viewerData.kick.profile.kick
          );
          router.replace('/dashboard');
        } else {
          throw new Error("Kick user data not found");
        }
      } catch (error) {
        console.error("Login error:", error);
        router.replace('/login?error=auth_failed');
      }
    };

    if (sessionId && !loginAttemptedRef.current) {
      handleLogin();
    }

    return () => {
      loginAttemptedRef.current = false;
    };
  }, [searchParams?.get('sessionId')]); // More specific dependency

  return (
    <div className="flex-grow my-auto space-y-6 text-center">
      <div className="text-center space-y-4">
        <Spinner size="lg" />
        <h1 className="text-4xl font-bold mb-4">
          Signing you in...
        </h1>
        <p className="text-muted-foreground">
          Please wait while we verify your account
        </p>
      </div>
    </div>
  );
};

export default LoginCallback;