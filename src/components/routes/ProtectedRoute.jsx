// src/components/routes/ProtectedRoute.jsx
"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export default function ProtectedRoute({ children, requiredRole = "user" }) {
  const { signedIn, user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Wait until auth is loaded before making decisions
    if (!loading) {
      if (!signedIn) {
        // Store the attempted URL to redirect back after login
        sessionStorage.setItem("redirectAfterLogin", pathname);
        router.push("/auth?redirect=" + encodeURIComponent(pathname));
      } else if (requiredRole === "admin" && user?.role !== "admin" && user?.role !== "webmaster") {
        // For admin-only routes, check if user has admin or webmaster role
        router.push("/user/dashboard");
      }
    }
  }, [signedIn, loading, router, pathname, user, requiredRole]);

  // Show loading state while checking auth
  if (loading || !signedIn) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="spinner-border h-12 w-12 mb-4" role="status"></div>
          <p className="text-lg">Verifying access...</p>
        </div>
      </div>
    );
  }

  // If user is authenticated (and has required role if specified), render children
  return children;
}