// utils/tokenUtils.ts
import { useState, useCallback } from 'react';
import { TwitchData } from '@/types/twitch';
import { refreshTwitchToken } from '@/utils/api';

export const useTokenManager = () => {
  const [twitchUser, setTwitchUser] = useState<TwitchData['user'] | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthStatus = async () => {
    console.log('checkAuthStatus starting');
    try {
      const session = localStorage.getItem('twitch_session');
      console.log('Twitch session exists:', !!session);
      
      if (!session) {
        console.log('No session found');
        setIsAuthenticated(false);
        return { isAuthenticated: false };
      }

      const parsedSession: TwitchData = JSON.parse(session);
      console.log('Session parsed successfully');
      
      const expiresAt = new Date(parsedSession.expiresAt).getTime();
      const now = new Date().getTime();
      console.log('Token expiry check:', { expiresAt, now, isExpired: now >= expiresAt });

      if (now >= expiresAt) {
        console.log('Token expired, attempting refresh');
        await refreshSession();
        return { isAuthenticated: true }; // If refresh successful
      } else {
        console.log('Token valid, setting user');
        setTwitchUser(parsedSession.user);
        setIsAuthenticated(true);
        return { isAuthenticated: true }; // Add this line
      }
    } catch (error) {
      console.error('Auth status check failed:', error);
      logout();
      return { isAuthenticated: false };
    }
  };

  const login = (twitchData: TwitchData) => {
    setTwitchUser(twitchData.user);
    setIsAuthenticated(true);
    localStorage.setItem('twitch_session', JSON.stringify(twitchData));
  };

  const logout = useCallback(() => {
    setTwitchUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('twitch_session');
  }, []);

  const refreshSession = useCallback(async () => {
    try {
      const session = localStorage.getItem('twitch_session');
      if (!session) throw new Error('No session found');
  
      const parsedSession: TwitchData = JSON.parse(session);
      const newTokenData = await refreshTwitchToken(parsedSession.refreshToken);
  
      const updatedSession = {
        ...parsedSession,
        accessToken: newTokenData.accessToken,
        refreshToken: newTokenData.refreshToken,
        expiresAt: newTokenData.expiresAt,
      };
  
      localStorage.setItem('twitch_session', JSON.stringify(updatedSession));
      setTwitchUser(parsedSession.user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Session refresh failed:', error);
      logout(); // ⚠️ Depends on `logout`
    }
  }, [logout]);

  return {
    twitchUser,
    isAuthenticated,
    login,
    logout,
    refreshSession,
    checkAuthStatus,
  };
};