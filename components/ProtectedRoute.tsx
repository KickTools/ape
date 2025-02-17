// components/ProtectedRoute.tsx
"use client";

import { memo } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = memo(({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log('ProtectedRoute state:', { isAuthenticated, loading });
    
    if (!loading && !isAuthenticated) {
      console.log('Redirecting to login - not authenticated');
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    console.log('ProtectedRoute: Still loading...');
    return <div>Loading...</div>;
  }

  console.log('ProtectedRoute: Rendering children, isAuthenticated:', isAuthenticated);
  return isAuthenticated ? <>{children}</> : null;
});