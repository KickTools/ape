// src/lib/giveawayAPI.js
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const GIVEAWAY_ROUTE = "/giveaways";

// Helper function to handle API responses
const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "API request failed");
  }
  return data;
};

// Fetch all giveaways with optional filters
export const getAllGiveaways = async (filters = {}) => {
  try {
    let endpoint = `${API_BASE_URL}${GIVEAWAY_ROUTE}/`;
    
    // Add query parameters if filters are provided
    if (Object.keys(filters).length > 0) {
      const params = new URLSearchParams();
      if (filters.status && filters.status !== 'all') params.append('status', filters.status);
      if (filters.type && filters.type !== 'all') params.append('type', filters.type);
      if (filters.search) params.append('search', filters.search);
      
      endpoint += `?${params.toString()}`;
    }
    
    const response = await fetch(endpoint, {
      method: "GET",
      credentials: "include", // Include cookies for session token
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    
    // Map MongoDB _id to id and ensure other fields are consistent
    if (result.success && result.data) {
      return {
        ...result,
        data: result.data.map(giveaway => ({
          ...giveaway,
          id: giveaway._id,
          startDate: giveaway.start_date,
          endDate: giveaway.end_date
        }))
      };
    }
    
    return result;
  } catch (error) {
    console.error("Error fetching giveaways:", error.message);
    throw error;
  }
};

// Create a new giveaway (admin-only)
export const createGiveaway = async (giveawayData) => {
  try {
    // Transform client-side field names to server-side field names if needed
    const transformedData = {
      ...giveawayData,
      start_date: giveawayData.startDate,
      end_date: giveawayData.endDate
    };
    
    const response = await fetch(`${API_BASE_URL}${GIVEAWAY_ROUTE}/`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transformedData),
    });
    return handleResponse(response);
  } catch (error) {
    console.error("Error creating giveaway:", error.message);
    throw error;
  }
};

export const updateGiveaway = async (giveawayId, giveawayData) => {
  try {
    // Transform client-side field names to server-side field names if needed
    const transformedData = {
      ...giveawayData,
      start_date: giveawayData.startDate,
      end_date: giveawayData.endDate
    };
    
    const response = await fetch(`${API_BASE_URL}${GIVEAWAY_ROUTE}/${giveawayId}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transformedData),
    });
    return handleResponse(response);
  } catch (error) {
    console.error(`Error updating giveaway ${giveawayId}:`, error.message);
    throw error;
  }
};

// Update giveaway status (admin-only)
export const updateGiveawayStatus = async (giveawayId, status) => {
  try {
    const response = await fetch(`${API_BASE_URL}${GIVEAWAY_ROUTE}/${giveawayId}/status`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });
    return handleResponse(response);
  } catch (error) {
    console.error(`Error updating giveaway ${giveawayId} status:`, error.message);
    throw error;
  }
};

// Draw winners for a giveaway (admin-only)
export const drawGiveawayWinners = async (giveawayId, { winnersCount, verificationLevel, allowPreviousWinners }) => {
  console.log("winnersCount", winnersCount);
  try {
    const response = await fetch(`${API_BASE_URL}${GIVEAWAY_ROUTE}/${giveawayId}/draw`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ winnersCount, verificationLevel, allowPreviousWinners }),
    });
    return handleResponse(response);
  } catch (error) {
    console.error(`Error drawing winners for giveaway ${giveawayId}:`, error.message);
    throw error;
  }
};

// Enter a ticket giveaway (user-accessible)
export const enterGiveaway = async (giveawayId) => {
  try {
    const response = await fetch(`${API_BASE_URL}${GIVEAWAY_ROUTE}/${giveawayId}/enter`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return handleResponse(response);
  } catch (error) {
    console.error(`Error entering giveaway ${giveawayId}:`, error.message);
    throw error;
  }
};

export const getViewersByIds = async (viewerIds) => {
  try {
    const response = await fetch(`${API_BASE_URL}${GIVEAWAY_ROUTE}/viewers`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ viewerIds }),
    });
    return handleResponse(response);
  } catch (error) {
    console.error(`Error fetching viewers:`, error.message);
    throw error;
  }
};

export const getGiveawayEntryStatus = async (giveawayId) => {
  try {
    const response = await fetch(`${API_BASE_URL}${GIVEAWAY_ROUTE}/${giveawayId}/entry-status`, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    return handleResponse(response);
  } catch (error) {
    console.error(`Error checking entry status for giveaway ${giveawayId}:`, error.message);
    throw error;
  }
};

export const getGiveawayAnalytics = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}${GIVEAWAY_ROUTE}/analytics`, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    return handleResponse(response);
  } catch (error) {
    console.error(`Error fetching giveaway analytics:`, error.message);
    throw error;
  }
};

// Check viewer count eligibility
export const getEligibleViewerCount = async (verificationLevel) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}${GIVEAWAY_ROUTE}/eligible-viewers?verificationLevel=${verificationLevel}`, {
      method: "GET",
      credentials: "include",
      headers: { 
        "Content-Type": "application/json" 
      }
    });
    return handleResponse(response);
  } catch (error) {
    console.error(`Error fetching eligible viewer count:`, error.message);
    throw error;
  }
};

export const drawSingleGiveawayWinner = async (giveawayId, { verificationLevel, allowPreviousWinners }) => {
  try {
    const response = await fetch(`${API_BASE_URL}${GIVEAWAY_ROUTE}/${giveawayId}/draw-single`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ verificationLevel, allowPreviousWinners }),
    });
    return handleResponse(response);
  } catch (error) {
    console.error(`Error drawing single winner for giveaway ${giveawayId}:`, error.message);
    throw error;
  }
};