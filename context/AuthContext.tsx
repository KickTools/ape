"use client";
import { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
import { KickUserData } from '@/types/kick';
import { TwitchUserData } from '@/types/twitch';

interface AuthContextType {
  isAuthenticated: boolean;
  twitchUser: TwitchUserData | null;
  kickUser: KickUserData | null;
  loading: boolean;
  login: (twitchData: { user: TwitchUserData }, kickData?: KickUserData) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [twitchUser, setTwitchUser] = useState<TwitchUserData | null>(null);
  const [kickUser, setKickUser] = useState<KickUserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Handle initial mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Check authentication status on mount
  useEffect(() => {
    if (!mounted) return;

    const checkAuth = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/auth/user`, {
          credentials: 'include'
        });

        if (response.ok) {
          const { user } = await response.json();
          setTwitchUser(user);
          setIsAuthenticated(true);

          const kickSession = localStorage.getItem('kick_session');
          if (kickSession) {
            setKickUser(JSON.parse(kickSession));
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsAuthenticated(false);
        setTwitchUser(null);
        setKickUser(null);
        localStorage.removeItem('kick_session');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [mounted]);

  const login = useCallback(async (twitchData: { user: TwitchUserData }, kickData?: KickUserData) => {
    try {
      setTwitchUser(twitchData.user);
      setIsAuthenticated(true);

      if (kickData) {
        setKickUser(kickData);
        localStorage.setItem('kick_session', JSON.stringify(kickData));
      }
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await fetch(`${apiBaseUrl}/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      });
    } catch (error) {
      console.error('Logout request failed:', error);
    } finally {
      setTwitchUser(null);
      setKickUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('kick_session');
    }
  }, []);

  const authContextValue = useMemo(() => ({
    isAuthenticated,
    twitchUser,
    kickUser,
    loading,
    login,
    logout,
  }), [
    isAuthenticated,
    twitchUser,
    kickUser,
    loading,
    login,
    logout,
  ]);

  // Don't render anything until mounted
  if (!mounted) {
    return null;
  }

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};