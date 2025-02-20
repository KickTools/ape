// api/handleLeaderboard.ts
import { useCache } from "@/hooks/useCache";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const CACHE_TTL = 2.5 * 60 * 1000; // 2.5 minutes

export interface LeaderboardEntry {
  user_id: number;
  username: string;
  stats: {
    total_messages: number;
    streams_participated: number;
  };
  rank: number;
}

export interface LeaderboardResponse {
  data: LeaderboardEntry[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

interface ApiResponse {
  success: boolean;
  data: LeaderboardResponse;
  error?: string;
}

export const useLeaderboard = () => {
  const getCacheKey = (page: number, limit: number, sortBy: string, sortOrder: string) =>
    `leaderboard-page-${page}-limit-${limit}-sortBy-${sortBy}-sortOrder-${sortOrder}`;

  const fetchLeaderboard = async (
    page: number = 1,
    limit: number = 25,
    sortBy: string = 'rank',
    sortOrder: string = 'asc'
  ): Promise<LeaderboardResponse> => {
    const cacheKey = getCacheKey(page, limit, sortBy, sortOrder);
    const { getFromCache, setToStorage } = useCache<LeaderboardResponse>({
      ttl: CACHE_TTL,
      key: cacheKey,
    });

    const cachedData = getFromCache();
    if (cachedData) {
      console.log(`Serving leaderboard from cache: ${cacheKey}`);
      return cachedData;
    }

    const url = `${apiBaseUrl}/leaderboard/chat-leaderboard?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`;
    const response = await fetch(url, { credentials: 'include' });
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

    const result: ApiResponse = await response.json();
    if (!result.success || !result.data) throw new Error(result.error || 'Invalid response');
    setToStorage(result.data);
    console.log(`Cached leaderboard data: ${cacheKey}`);
    return result.data;
  };

  return { fetchLeaderboard };
};