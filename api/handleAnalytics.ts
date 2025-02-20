// api/handleAnalytics.ts
import { useCache } from "@/hooks/useCache";
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const CACHE_TTL = 2.5 * 60 * 1000;

export interface GlobalStats {
  verifiedViewers: number;
  botAccounts: number;
}

export interface DailyStats {
  dailyActiveUsers: number;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export const useGlobalStats = () => {
  const { getFromCache, setToStorage } = useCache<GlobalStats>({
    ttl: CACHE_TTL,
    key: 'globalStats'
  });

  const fetchGlobalStats = async (): Promise<GlobalStats> => {
    // Check cache first
    const cachedData = getFromCache();
    if (cachedData) {
      return cachedData;
    }

    try {
      const response = await fetch(`${apiBaseUrl}/analytics/verification/global`, {
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch global stats');
      }
      
      const result: ApiResponse<GlobalStats> = await response.json();
      
      if (!result.success || !result.data) {
        throw new Error(result.error || 'Invalid response format');
      }
      
      // Cache the new data
      setToStorage(result.data);
      return result.data;
    } catch (error) {
      console.error("Error fetching global stats:", error);
      throw error;
    }
  };

  return { fetchGlobalStats };
};

export const useDailyStats = () => {
  const getCacheKey = (date: string) => `dailyStats-${date}`;

  const getDailyStats = async (date: string): Promise<DailyStats> => {
    const { getFromCache, setToStorage } = useCache<DailyStats>({
      ttl: CACHE_TTL,
      key: getCacheKey(date)
    });

    // Check cache first
    const cachedData = getFromCache();
    if (cachedData) {
      return cachedData;
    }

    try {
      const response = await fetch(`${apiBaseUrl}/analytics/verification/daily?date=${date}`, {
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch daily stats');
      }
      
      const result: ApiResponse<DailyStats> = await response.json();
      
      if (!result.success || !result.data) {
        throw new Error(result.error || 'Invalid response format');
      }
      
      // Cache the new data
      setToStorage(result.data);
      return result.data;
    } catch (error) {
      console.error("Error fetching daily stats:", error);
      throw error;
    }
  };

  return { getDailyStats };
};