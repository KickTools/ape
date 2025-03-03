// contexts/AuthContext.js
"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import { logoutUser, checkSession } from '@/lib/auth';
import { useRouter } from 'next/navigation';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [twitchProfile, setTwitchProfile] = useState(null);
  const [kickProfile, setKickProfile] = useState(null);
  const [primaryPlatform, setPrimaryPlatform] = useState(null);
  const [loading, setLoading] = useState(true);
  const [signedIn, setSignedIn] = useState(false);
  const router = useRouter();

  // Function to handle login
  const login = async (userData) => {
    try {
      setLoading(true);
      
      // Extract profiles from userData
      const { twitch, kick, primaryPlatform: platform, role } = userData;
      
      if (!twitch || !kick || !platform) {
        throw new Error('Incomplete user data provided');
      }
      
      // Set the profiles in state
      setTwitchProfile(twitch);
      setKickProfile(kick);
      setPrimaryPlatform(platform);
      
      // Set the user with the selected platform's data
      const selectedProfile = platform === 'twitch' ? twitch : kick;
      
      const newUser = {
        id: selectedProfile.user_id || selectedProfile.id,
        username: platform === 'twitch' ? selectedProfile.display_name : selectedProfile.username,
        profileImage: platform === 'twitch' ? selectedProfile.profile_image_url : selectedProfile.profile_pic,
        platform,
        role: role || 'regular'
      };
      
      setUser(newUser);
      setSignedIn(true);
      
      // Store in localStorage for persistence
      localStorage.setItem('twitchProfile', JSON.stringify(twitch));
      localStorage.setItem('kickProfile', JSON.stringify(kick));
      localStorage.setItem('primaryPlatform', platform);
      localStorage.setItem('signedIn', 'true');
      localStorage.setItem('role', newUser.role);
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Call the existing logoutUser function from your auth.js
      const result = await logoutUser();
      
      if (!result.success) {
        console.warn('Server logout reported an issue:', result.message);
        // Continue with local logout even if server logout reports an issue
      }
    } catch (error) {
      console.error('Logout error:', error);
      // Continue with local logout even if server logout fails
    } finally {
      // Always perform local logout regardless of server response
      
      // Clear states
      setUser(null);
      setTwitchProfile(null);
      setKickProfile(null);
      setPrimaryPlatform(null);
      setSignedIn(false);
      
      // Remove from localStorage
      localStorage.removeItem('twitchProfile');
      localStorage.removeItem('kickProfile');
      localStorage.removeItem('primaryPlatform');
      localStorage.removeItem('signedIn');
      localStorage.removeItem('role');
      
      // Navigate to home page
      router.push('/');
    }
  };

  const switchPlatform = () => {
    if (!twitchProfile || !kickProfile) return;
    
    const newPlatform = primaryPlatform === 'twitch' ? 'kick' : 'twitch';
    const selectedProfile = newPlatform === 'twitch' ? twitchProfile : kickProfile;
    
    setPrimaryPlatform(newPlatform);
    setUser({
      id: selectedProfile.user_id || selectedProfile.id,
      username: newPlatform === 'twitch' ? selectedProfile.display_name : selectedProfile.username,
      profileImage: newPlatform === 'twitch' ? selectedProfile.profile_image_url : selectedProfile.profile_pic,
      platform: newPlatform
    });
    
    localStorage.setItem('primaryPlatform', newPlatform);
  };

  const refreshToken = async () => {
    try {
      // Implement your token refresh logic here
    } catch (error) {
      logout();
    }
  };

  // Load user data from localStorage only once on component mount
  useEffect(() => {
    const loadUserFromStorage = async () => {
      try {
        const storedTwitchProfile = localStorage.getItem('twitchProfile');
        const storedKickProfile = localStorage.getItem('kickProfile');
        const storedPlatform = localStorage.getItem('primaryPlatform');
        const storedSignedIn = localStorage.getItem('signedIn');
        const storedRole = localStorage.getItem('role');

        if (storedTwitchProfile && storedKickProfile && storedPlatform && storedSignedIn === 'true') {
          // Verify session with server
          const sessionData = await checkSession();
          
          // If session is valid, restore data with server-verified role
          const twitch = JSON.parse(storedTwitchProfile);
          const kick = JSON.parse(storedKickProfile);
          const platform = storedPlatform;
          
          setTwitchProfile(twitch);
          setKickProfile(kick);
          setPrimaryPlatform(platform);
          setSignedIn(true);
          
          const selectedProfile = platform === 'twitch' ? twitch : kick;
          setUser({
            id: selectedProfile.user_id || selectedProfile.id,
            username: platform === 'twitch' ? selectedProfile.display_name : selectedProfile.username,
            profileImage: platform === 'twitch' ? selectedProfile.profile_image_url : selectedProfile.profile_pic,
            platform,
            role: sessionData.role // Use server-verified role
          });
          
          // Update localStorage with fresh role
          localStorage.setItem('role', sessionData.role);
        }
      } catch (error) {
        console.error('Session validation failed or data invalid:', error);
        // Clear localStorage and force re-login
        localStorage.removeItem('twitchProfile');
        localStorage.removeItem('kickProfile');
        localStorage.removeItem('primaryPlatform');
        localStorage.removeItem('signedIn');
        localStorage.removeItem('role');
        router.push('/login?error=session_expired');
      } finally {
        setLoading(false);
      }
    };

    loadUserFromStorage();
  }, [router]);

  return (
    <AuthContext.Provider 
      value={{
        user,
        twitchProfile,
        kickProfile,
        primaryPlatform,
        loading,
        signedIn,
        login,
        logout,
        refreshToken,
        switchPlatform
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);