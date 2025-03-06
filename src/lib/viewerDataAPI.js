// src/lib/viewerDataAPI.js
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

async function fetchData(endpoint, options = {}) {
    const response = await fetch(`${apiBaseUrl}${endpoint}`, {
      ...options,
      credentials: "include"
    });
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }
    return response.json();
}

// Admin-only: Fetch all viewers
export async function fetchAllViewers() {
  try {
    return await fetchData('/data/retrieve/viewers/all');
  } catch (error) {
    console.error("Error fetching all viewers:", error);
    throw error;
  }
}

// Admin-only: Fetch paginated viewers with filters
export async function fetchViewersList({ page = 1, limit = 10, platform, verified, search = "", sortBy = 'createdAt', sortOrder = 'desc' } = {}) {
    try {
      const queryParams = {
        page,
        limit,
        sortBy,
        sortOrder
      };
      if (platform) queryParams.platform = platform;
        
      // Only include search param if it's not empty
      if (search && search.trim() !== "") {
        queryParams.search = search;
      }
  
      const query = new URLSearchParams(queryParams).toString();
      const result = await fetchData(`/data/retrieve/viewers?${query}`);
      return result;
    } catch (error) {
      console.error("Error fetching viewers list:", error);
      throw error;
    }
}

// Admin-only: Fetch detailed viewer profile
export async function fetchViewerProfile(platform, userId) {
  try {
    return await fetchData(`/data/retrieve/viewers/profile/${platform}/${userId}`);
  } catch (error) {
    console.error("Error fetching viewer profile:", error);
    throw error;
  }
}

export async function fetchDetailedUserProfile(platform, userId) {
  try {
    const result = await fetchData(`/data/retrieve/user-profile/${platform}/${userId}`);
    return result.data;
  } catch (error) {
    console.error("Error fetching detailed profile:", error);
    throw error;
  }
}

// Admin-only: Search viewers
export async function searchViewers(query, limit = 10) {
  try {
    const queryString = new URLSearchParams({ q: query, limit }).toString();
    return await fetchData(`/data/retrieve/search/viewers?${queryString}`);
  } catch (error) {
    console.error("Error searching viewers:", error);
    throw error;
  }
}