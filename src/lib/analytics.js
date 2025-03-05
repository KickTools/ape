// src/lib/analytics.js

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

async function fetchGlobalStats() {
    const res = await fetch(`${apiBaseUrl}/analytics/verification/global`, {
        next: { revalidate: 150 }, // Revalidate every 2.5 minutes
        credentials: 'include'
    });

    if (!res.ok) {
        throw new Error('Failed to fetch global stats');
    }

    const result = await res.json();

    if (!result.success || !result.data) {
        throw new Error(result.error || 'Invalid response format');
    }

    return result.data;
}

async function fetchDailyStats(date) {
    const res = await fetch(`${apiBaseUrl}/analytics/verification/daily?date=${date}`, {
        next: { revalidate: 150 }, // Revalidate every 2.5 minutes
        credentials: 'include'
    });

    if (!res.ok) {
        throw new Error('Failed to fetch daily stats');
    }

    const result = await res.json();

    if (!result.success || !result.data) {
        throw new Error(result.error || 'Invalid response format');
    }

    return result.data;
}

export const useGlobalStats = () => {
    return { fetchGlobalStats };
};

export const useDailyStats = () => {
    return { fetchDailyStats };
};

export async function getAdminAnalytics(userId) {
    try {
      const response = await fetch(`${apiBaseUrl}/analytics/admin-analtyics/${userId}`, {
        next: { revalidate: 150 }, // Revalidate every 2.5 minutes
        credentials: 'include'
      });
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  }