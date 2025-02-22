"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
import { KickUserData } from '@/types/kick';
import { TwitchUserData } from '@/types/twitch';

interface ConnectedUserData {
  twitch: TwitchUserData | null;
  kick: KickUserData | null;
  primaryPlatform: 'twitch' | 'kick';
}

interface AuthContextType {
  isAuthenticated: boolean;
  twitchProfile: TwitchUserData | null;
  kickProfile: KickUserData | null;
  primaryPlatform: 'twitch' | 'kick' | null;
  loading: boolean;
  login: (userData: ConnectedUserData) => Promise<void>;
  logout: () => Promise<void>;
  verifyAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const STORAGE_KEYS = {
  PRIMARY_PLATFORM: 'primary_platform',
  KICK_PROFILE: 'kick_profile',
  TWITCH_PROFILE: 'twitch_profile'
} as const;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [twitchProfile, setTwitchProfile] = useState<TwitchUserData | null>(null);
  const [kickProfile, setKickProfile] = useState<KickUserData | null>(null);
  const [primaryPlatform, setPrimaryPlatform] = useState<'twitch' | 'kick' | null>(null);

  // Store profile data in localStorage
  const storeProfiles = useCallback((data: ConnectedUserData) => {
    if (data.twitch) {
      localStorage.setItem(STORAGE_KEYS.TWITCH_PROFILE, JSON.stringify(data.twitch));
    }
    if (data.kick) {
      localStorage.setItem(STORAGE_KEYS.KICK_PROFILE, JSON.stringify(data.kick));
    }
    localStorage.setItem(STORAGE_KEYS.PRIMARY_PLATFORM, data.primaryPlatform);
  }, []);

  // Load profiles from localStorage
  const loadProfiles = useCallback(() => {
    try {
      const storedTwitch = localStorage.getItem(STORAGE_KEYS.TWITCH_PROFILE);
      const storedKick = localStorage.getItem(STORAGE_KEYS.KICK_PROFILE);
      const storedPlatform = localStorage.getItem(STORAGE_KEYS.PRIMARY_PLATFORM) as 'twitch' | 'kick' | null;

      return {
        twitch: storedTwitch ? JSON.parse(storedTwitch) : null,
        kick: storedKick ? JSON.parse(storedKick) : null,
        primaryPlatform: storedPlatform
      };
    } catch (error) {
      console.error('Error loading profiles:', error);
      return null;
    }
  }, []);

  // Verify authentication by checking the platform-specific token
  const verifyAuth = useCallback(async () => {
    try {
      const storedPlatform = localStorage.getItem(STORAGE_KEYS.PRIMARY_PLATFORM) as 'twitch' | 'kick';
      if (!storedPlatform) return false;

      const endpoint = `/auth/verify-${storedPlatform}-token`;
      const response = await fetch(`${apiBaseUrl}${endpoint}`, {
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Token verification failed');
      }

      const data = await response.json();
      return data.isValid;
    } catch (error) {
      console.error('Auth verification failed:', error);
      return false;
    }
  }, []);

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const profiles = loadProfiles();
        if (profiles?.primaryPlatform) {
          const isValid = await verifyAuth();
          
          if (isValid) {
            setTwitchProfile(profiles.twitch);
            setKickProfile(profiles.kick);
            setPrimaryPlatform(profiles.primaryPlatform);
            setIsAuthenticated(true);
          } else {
            // Clear storage if verification fails
            localStorage.clear();
          }
        }
      } catch (error) {
        console.error('Auth initialization failed:', error);
      } finally {
        setLoading(false);
        setMounted(true);
      }
    };

    initializeAuth();
  }, [verifyAuth, loadProfiles]);

  const login = useCallback(async (userData: ConnectedUserData) => {
    try {
      setTwitchProfile(userData.twitch);
      setKickProfile(userData.kick);
      setPrimaryPlatform(userData.primaryPlatform);
      setIsAuthenticated(true);
      
      // Store profiles and platform
      storeProfiles(userData);
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  }, [storeProfiles]);

  const logout = useCallback(async () => {
    try {
      await fetch(`${apiBaseUrl}/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      });
    } catch (error) {
      console.error('Logout request failed:', error);
    } finally {
      // Clear state and storage
      setTwitchProfile(null);
      setKickProfile(null);
      setPrimaryPlatform(null);
      setIsAuthenticated(false);
      localStorage.clear();
    }
  }, []);

  const value = useMemo(() => ({
    isAuthenticated,
    twitchProfile,
    kickProfile,
    primaryPlatform,
    loading,
    login,
    logout,
    verifyAuth
  }), [
    isAuthenticated,
    twitchProfile,
    kickProfile,
    primaryPlatform,
    loading,
    login,
    logout,
    verifyAuth
  ]);

  if (!mounted) {
    return null;
  }

  return (
    <AuthContext.Provider value={value}>
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