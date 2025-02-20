"use client";

import { memo, useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = memo(({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !loading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [mounted, isAuthenticated, loading, router]);

  // Show loading state only during initial mount or auth check
  if (!mounted || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          <p>Loading...</p>
          <p>Loading...</p>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // Once mounted and loaded, either show children or nothing (redirect will happen)
  return isAuthenticated ? children : null;
});

ProtectedRoute.displayName = 'ProtectedRoute';