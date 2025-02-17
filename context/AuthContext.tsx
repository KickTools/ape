// context/AuthContext.tsx
"use client";
import { createContext, useContext, useEffect, useState, ReactNode, useCallback, useMemo } from 'react';
import { KickUserData } from '@/types/kick';
import { TwitchData } from '@/types/twitch';
import { useTokenManager } from '@/utils/tokenUtils';

interface AuthContextType {
  isAuthenticated: boolean;
  twitchUser: TwitchData['user'] | null;
  kickUser: KickUserData | null;
  loading: boolean;
  login: (twitchData?: TwitchData, kickData?: KickUserData) => Promise<void>; // Made async
  logout: () => void;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const {
    twitchUser,
    isAuthenticated,
    login: tokenLogin,
    logout: tokenLogout,
    refreshSession,
    checkAuthStatus
  } = useTokenManager();

  const [kickUser, setKickUser] = useState<KickUserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await checkAuthStatusWrapper();
      } catch (error) {
        console.error('Failed to initialize auth:', error);
        await logout();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = useCallback(async (twitchData?: TwitchData, kickData?: KickUserData) => {

    try {
      // Only update if we have new data
      if (kickData) {
        setKickUser(kickData);
        localStorage.setItem('kick_session', JSON.stringify(kickData));
      }

      if (twitchData) {
        await tokenLogin(twitchData);
        localStorage.setItem('twitch_session', JSON.stringify(twitchData));
      }

    } catch (error) {
      console.error("Error during login:", error);
      throw error; // Re-throw to handle in the callback
    }
  }, [tokenLogin]);

  const logout = useCallback(async () => {
    setKickUser(null);
    await tokenLogout();
    localStorage.removeItem('kick_session');
    localStorage.removeItem('twitch_session');
  }, [tokenLogout]);

  const checkAuthStatusWrapper = useCallback(async () => {

    try {
      const { isAuthenticated: twitchAuth } = await checkAuthStatus();

      if (twitchAuth) {
        const kickSession = localStorage.getItem('kick_session');
        if (kickSession) {
          const parsedKickSession = JSON.parse(kickSession);
          setKickUser(parsedKickSession);
        }
        return { isAuthenticated: true };
      }
      return { isAuthenticated: false };
    } catch (error) {
      console.error('Auth status check failed:', error);
      await logout();
      return { isAuthenticated: false };
    }
  }, [checkAuthStatus, logout]);

  const authContextValue = useMemo(() => ({
    isAuthenticated,
    twitchUser,
    kickUser,
    loading,
    login,
    logout,
    refreshSession,
  }), [
    isAuthenticated,
    twitchUser,
    kickUser,
    loading,
    login,
    logout,
    refreshSession,
  ]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {!loading ? children : null}
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