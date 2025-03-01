// src/lib/auth.js

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function verifyAuthToken(platform) {
  try {
    const endpoint = `/auth/verify-${platform}-token`;
    const response = await fetchData(endpoint);

    return {
      ...response,
      platform
    };
  } catch (error) {
    return {
      isValid: false,
      platform,
      message:
        error instanceof Error ? error.message : "Token verification failed"
    };
  }
}

export async function fetchLoginUserData(userId, platform) {
  try {
    console.log(`Fetching user data for platform: ${platform}, userId: ${userId}`);

    const data = await fetchData(`/data/retrieve/viewers/${platform}/${userId}`);

    console.log("Fetched API Response:", data);

    return data;
  } catch (error) {
    console.error("Error fetching login user data:", error);
    throw error;
  }
}

async function fetchData(endpoint, options) {
  const response = await fetch(`${apiBaseUrl}${endpoint}`, {
    ...options,
    credentials: "include"
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json();
}

export async function saveUserData(twitchData, kickData) {
  console.log('Saving user data:', twitchData );
  console.log('Saving user data:', kickData );
  const username = kickData.name;
  kickData.username = username;
  try {
    return await fetchData('/auth/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ twitchData, kickData })
    });
  } catch (error) {
    console.error('Error saving user data:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to save user data"
    };
  }
}

export async function fetchKickUserData(kickUsername) {
  try {
    console.log(`Fetching user data for Kick username: ${kickUsername}`);

    const data = await fetchData(`/kick/channel/${kickUsername}`);

    console.log("Fetched Kick Data API Response:", data);

    return data;
  } catch (error) {
    console.error("Error fetching Kick user data:", error);
    throw error;
  }
}

export async function logoutUser() {
  try {
    return await fetchData('/auth/logout', {
      method: 'POST'
    });
  } catch (error) {
    console.error('Error logging out user:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to logout user"
    };
  }
}