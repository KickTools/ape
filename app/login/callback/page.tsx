// app/login/callback/page.tsx
"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { fetchLoginUserData } from "@/utils/api";
import { Spinner } from "@heroui/spinner";

const LoginCallback = () => {
  const router = useRouter();
  const { login } = useAuth();
  const loginAttemptedRef = useRef(false);

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const handleLogin = async () => {
      if (loginAttemptedRef.current) return;
      loginAttemptedRef.current = true;

      try {
        const response = await fetch(`${apiBaseUrl}/auth/user`, {
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Failed to get user data');
        }

        const { success, user } = await response.json();

        if (!success || !user) {
          throw new Error('Invalid user data received');
        }
        
        // Get additional viewer data
        const viewerData = await fetchLoginUserData(user.id);
        console.log(viewerData);
    
        if (viewerData.viewerData?.kick?.user_id) {
          await login(
            { user },
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

    if (!loginAttemptedRef.current) {
      handleLogin();
    }

    return () => {
      loginAttemptedRef.current = false;
    };
  }, [router, login]);

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