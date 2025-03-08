// src/lib/connectionsAPI.js
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const AUTH_ROUTE = "/auth";
const DATA_ROUTE = "/data/retrieve";

// Function to initiate an X connection flow
export function initiateConnection(service) {
  try {
    // Store current URL in local storage to redirect back after auth
    localStorage.setItem('authRedirectPath', window.location.pathname);
    
    // Get the correct endpoint (x for Twitter)
    const serviceEndpoint = service === 'twitter' ? 'x' : service;
    
    // Make a fetch request with credentials to ensure cookies are sent
    fetch(`${API_BASE_URL}${AUTH_ROUTE}/${serviceEndpoint}/login`, {
      method: 'GET',
      credentials: 'include',  // This ensures cookies are sent with the request
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.redirected) {
        // If the response is a redirect, follow it
        window.location.href = response.url;
      } else {
        // If not redirected directly, get the redirect URL from the response
        return response.json();
      }
    })
    .then(data => {
      if (data && data.url) {
        window.location.href = data.url;
      }
    })
    .catch(error => {
      console.error(`Error initiating ${service} connection:`, error);
      // Fallback to direct redirection if fetch fails
      window.location.href = `${API_BASE_URL}${AUTH_ROUTE}/${serviceEndpoint}/login`;
    });
  } catch (error) {
    console.error(`Error initiating ${service} connection:`, error);
    // Fallback to direct redirection if try/catch fails
    window.location.href = `${API_BASE_URL}${AUTH_ROUTE}/${serviceEndpoint}/login`;
  }
}

// Function to get verification level based on viewerId or platform/userId
export async function getVerificationLevel(viewerId, userId, platform) {
  try {
    let url = `${API_BASE_URL}${DATA_ROUTE}/viewers/verification`;
    const queryParams = new URLSearchParams();

    if (viewerId) {
      queryParams.append('viewerId', viewerId);
    } else if (platform && userId) {
      queryParams.append('platform', platform);
      queryParams.append('userId', userId);
    } else {
      throw new Error('Either viewerId or platform and userId are required');
    }

    url += `?${queryParams.toString()}`;

    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data; // Now returning both verificationLevel and verificationStatus
  } catch (error) {
    console.error('Error fetching verification level:', error);
    throw error;
  }
}
