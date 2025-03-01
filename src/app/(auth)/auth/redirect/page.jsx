"use client";
import { Suspense } from "react";
import LoginCallback from "@/components/auth/LoginCallback"; // Import the existing component

export default function LoginRedirectPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginCallback />
    </Suspense>
  );
}