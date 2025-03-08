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
  const [xProfile, setXProfile] = useState(null);
  const [primaryPlatform, setPrimaryPlatform] = useState(null);
  const [loading, setLoading] = useState(true);
  const [signedIn, setSignedIn] = useState(false);
  const router = useRouter();

  // Function to handle login
  const login = async (userData) => {
    try {
      setLoading(true);
  
      const { viewer_id, twitch, kick, x, primaryPlatform: platform, role } = userData;
  
      if (!twitch || !kick || !platform) {
        console.error("Incomplete user data:", { twitch, kick, platform });
        throw new Error("Incomplete user data provided");
      }
  
      setTwitchProfile(twitch);
      setKickProfile(kick);
      setXProfile(x);
      setPrimaryPlatform(platform);
  
      const selectedProfile = platform === "twitch" ? twitch : kick;
      const newUser = {
        id: selectedProfile.user_id || selectedProfile.id,
        viewer_id: viewer_id,
        username: platform === "twitch" ? selectedProfile.display_name : selectedProfile.username,
        profileImage: platform === "twitch" ? selectedProfile.profile_image_url : selectedProfile.profile_pic,
        platform,
        role: role || "regular",
      };
  
      setUser(newUser);
      setSignedIn(true);
  
      localStorage.setItem("twitchProfile", JSON.stringify(twitch));
      localStorage.setItem("kickProfile", JSON.stringify(kick));
      if (x) {
        localStorage.setItem("xProfile", JSON.stringify(x));
      }
      localStorage.setItem("primaryPlatform", platform);
      localStorage.setItem("signedIn", "true");
      localStorage.setItem("role", newUser.role);
  
      return true;
    } catch (error) {
      console.error("Login error in AuthContext:", error.message, error.stack);
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
      setXProfile(null);
      setPrimaryPlatform(null);
      setSignedIn(false);

      // Remove from localStorage
      localStorage.removeItem('twitchProfile');
      localStorage.removeItem('kickProfile');
      localStorage.removeItem('xProfile'); // Remove x profile
      localStorage.removeItem('primaryPlatform');
      localStorage.removeItem('signedIn');
      localStorage.removeItem('role');

      // Navigate to home page
      router.push('/');
    }
  };

    const switchPlatform = () => {
    if (!twitchProfile || !kickProfile || !xProfile) return;

    let newPlatform;
    if (primaryPlatform === 'twitch') {
      newPlatform = 'kick';
    } else if (primaryPlatform === 'kick') {
      newPlatform = 'x';
    } else {
      newPlatform = 'twitch';
    }

    let selectedProfile;
    if (newPlatform === 'twitch') {
      selectedProfile = twitchProfile;
    } else if (newPlatform === 'kick') {
      selectedProfile = kickProfile;
    } else if (newPlatform === 'x') {
      selectedProfile = xProfile;
    }

    setPrimaryPlatform(newPlatform);
    setUser({
      id: selectedProfile.user_id || selectedProfile.id,
      username:
        newPlatform === 'twitch'
          ? selectedProfile.display_name
          : newPlatform === 'kick'
          ? selectedProfile.username
          : selectedProfile.name, // Adjust for x platform's name field
      profileImage:
        newPlatform === 'twitch'
          ? selectedProfile.profile_image_url
          : newPlatform === 'kick'
          ? selectedProfile.profile_pic
          : selectedProfile.profile_image_url, // Adjust for x platform's profile image field
      platform: newPlatform,
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
        const storedXProfile = localStorage.getItem('xProfile');
        const storedPlatform = localStorage.getItem('primaryPlatform');
        const storedSignedIn = localStorage.getItem('signedIn');
        const storedRole = localStorage.getItem('role');
  
        if (storedTwitchProfile && storedKickProfile && storedPlatform && storedSignedIn === 'true') {
          const sessionData = await checkSession();
  
          // Validate sessionData based on expected fields
          if (!sessionData?.user_id) {
            throw new Error('Invalid session from server: missing user_id');
          }
  
          const twitch = JSON.parse(storedTwitchProfile);
          const kick = JSON.parse(storedKickProfile);
          const x = storedXProfile ? JSON.parse(storedXProfile) : null;
          const platform = storedPlatform;
  
          setTwitchProfile(twitch);
          setKickProfile(kick);
          setXProfile(x);
          setPrimaryPlatform(platform);
          setSignedIn(true);
  
          let selectedProfile;
          if (platform === 'twitch') {
            selectedProfile = twitch;
          } else if (platform === 'kick') {
            selectedProfile = kick;
          } else if (platform === 'x' && x) {
            selectedProfile = x;
          } else {
            throw new Error(`Invalid primary platform: ${platform}`);
          }
  
          setUser({
            id: selectedProfile.user_id || selectedProfile.id,
            username:
              platform === 'twitch'
                ? selectedProfile.display_name
                : platform === 'kick'
                ? selectedProfile.username
                : platform === 'x'
                ? selectedProfile.name
                : 'unknown',
            profileImage:
              platform === 'twitch'
                ? selectedProfile.profile_image_url
                : platform === 'kick'
                ? selectedProfile.profile_pic
                : platform === 'x'
                ? selectedProfile.profile_image_url
                : '',
            platform,
            role: sessionData.role || storedRole || 'regular',
          });
  
          if (sessionData.role) {
            localStorage.setItem('role', sessionData.role);
          }
        } else {
          throw new Error('User data not found in localStorage');
        }
      } catch (error) {
        console.error('Session validation failed or data invalid:', error);
        localStorage.removeItem('twitchProfile');
        localStorage.removeItem('kickProfile');
        localStorage.removeItem('xProfile');
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
        xProfile,
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