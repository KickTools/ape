// src/lib/dataAPI.js
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// In-memory cache with expiration
const cache = new Map();
const CACHE_EXPIRY_MS = 5 * 60 * 1000; // 5 minutes - adjust as needed

// Helper function to check if cache entry is still valid
function isCacheValid(entry) {
  return entry && Date.now() - entry.timestamp < CACHE_EXPIRY_MS;
}

// Helper function to generate a cache key
function getCacheKey(userId) {
  return `viewerFormData_${userId}`;
}

export async function fetchViewerFormData(platform, userId) {
  if (!userId) {
    throw new Error('User ID is required');
  }

  const cacheKey = getCacheKey(userId);
  const cachedData = cache.get(cacheKey);

  // Return cached data if it exists and hasn’t expired
  if (cachedData && isCacheValid(cachedData)) {
    console.log(`[dataAPI] Using cached data for user ${userId}`);
    return cachedData.data;
  }

  // Fetch fresh data from API
  const response = await fetch(`${API_BASE_URL}/data/submit/form-data/${userId}`, {
    credentials: 'include',
  });

  if (!response.ok) {
    if (response.status === 404) {
      cache.set(cacheKey, { data: null, timestamp: Date.now() });
      return null; // New user case
    }
    if (response.status === 401 || response.status === 403) {
      throw new Error('Authentication failed. Please log in again.');
    }
    const errorData = await response.json();
    throw new Error(errorData.error || `Error ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();

  // Store in cache with timestamp
  cache.set(cacheKey, { data, timestamp: Date.now() });
  console.log(`[dataAPI] Cached fresh data for user ${userId}`);

  return data;
}

// Helper to invalidate cache after a successful update
function invalidateCache(userId) {
  const cacheKey = getCacheKey(userId);
  cache.delete(cacheKey);
  console.log(`[dataAPI] Cache invalidated for user ${userId}`);
}

export async function submitViewerFormData(formData) {
  if (!formData.viewer) {
    throw new Error('Viewer ID is required');
  }

  const response = await fetch(`${API_BASE_URL}/data/submit/form-data`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(formData),
  });

  const responseData = await response.json();

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      throw new Error('Authentication failed. Please log in again.');
    }
    throw new Error(responseData.error || `Error ${response.status}: ${response.statusText}`);
  }

  // Invalidate cache after successful update
  invalidateCache(formData.viewer);
  return responseData;
}

export async function submitGiveawaySettings({ viewer, bitcoinAddress, ethAddress, contactAddress }) {
  if (!viewer || !bitcoinAddress || !contactAddress) {
    throw new Error('Missing required fields for giveaway settings');
  }

  const payload = {
    viewer,
    bitcoinAddress,
    ethAddress: ethAddress || undefined,
    contactAddress,
  };

  const response = await fetch(`${API_BASE_URL}/data/submit/form-data`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(payload),
  });

  const responseData = await response.json();

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      throw new Error('Authentication failed. Please log in again.');
    }
    throw new Error(responseData.error || `Error ${response.status}: ${response.statusText}`);
  }

  // Invalidate cache after successful update
  invalidateCache(viewer);
  return responseData;
}

export async function submitPreferencesSettings({ viewer, language }) {
  if (!viewer) {
    throw new Error('Viewer ID is required');
  }

  const payload = {
    viewer,
    language,
  };

  const response = await fetch(`${API_BASE_URL}/data/submit/form-data`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(payload),
  });

  const responseData = await response.json();

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      throw new Error('Authentication failed. Please log in again.');
    }
    throw new Error(responseData.error || `Error ${response.status}: ${response.statusText}`);
  }

  // Invalidate cache after successful update
  invalidateCache(viewer);
  return responseData;
}

export async function submitNotificationsSettings({ viewer, notifications }) {
  if (!viewer) {
    throw new Error('Viewer ID is required');
  }

  const payload = {
    viewer,
    notifications,
  };

  const response = await fetch(`${API_BASE_URL}/data/submit/form-data`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(payload),
  });

  const responseData = await response.json();

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      throw new Error('Authentication failed. Please log in again.');
    }
    throw new Error(responseData.error || `Error ${response.status}: ${response.statusText}`);
  }

  // Invalidate cache after successful update
  invalidateCache(viewer);
  return responseData;
}

export function parseContactAddress(contactAddress) {
  if (!contactAddress) {
    return {
      platform: 'Twitter/X',
      address: ''
    };
  }

  const parts = contactAddress.includes(':')
    ? contactAddress.split(':', 2)
    : ['Twitter/X', contactAddress];

  return {
    platform: parts[0],
    address: parts[1] || ''
  };
}

export function formatContactAddress(platform, address) {
  return `${platform}:${address}`;
}