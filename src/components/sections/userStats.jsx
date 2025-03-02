// src/components/sections/userStats.jsx
"use client";
import { useState, useEffect } from 'react';
import { useGlobalStats, useDailyStats } from "@/lib/analytics";
import { PulseLoader } from 'react-spinners';
import { useToast } from "@/contexts/ToastContext";

let lastFetchTime = 0;
const RATE_LIMIT_TIME = 90000; // 90 seconds

export default function UserStats() {
    const [globalStats, setGlobalStats] = useState(null);
    const [dailyStats, setDailyStats] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const toast = useToast();

    const { fetchGlobalStats } = useGlobalStats();
    const { fetchDailyStats } = useDailyStats();

    useEffect(() => {
        const fetchStats = async () => {
            const now = Date.now();
            if (now - lastFetchTime < RATE_LIMIT_TIME) {
                return; // Skip fetch if rate limit is exceeded
            }
            lastFetchTime = now;

            try {
                setIsLoading(true);
                const globalData = await fetchGlobalStats();
                setGlobalStats(globalData);

                const currentDate = new Date();
                const formattedDate = currentDate.toISOString().split('T')[0];
                const dailyData = await fetchDailyStats(formattedDate);
                setDailyStats(dailyData);

            } catch (error) {
                console.error("Error fetching stats:", error);
                toast.error('Failed to load user statistics!');
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();

        const interval = setInterval(fetchStats, 50); // Note: 50ms seems very frequent—consider increasing
        return () => clearInterval(interval);
    }, [fetchGlobalStats, fetchDailyStats, toast]);

    const displayGlobalStats = () => {
        if (isLoading) {
            return {
                totalViewers: <div className="flex justify-center items-center"><PulseLoader color="#00ed6b" /></div>,
                botAccounts: <div className="flex justify-center items-center"><PulseLoader color="#ed000c" /></div>,
                level3Users: <div className="flex justify-center items-center"><PulseLoader color="#ffd700" /></div>
            };
        }
        if (!globalStats) {
            return {
                totalViewers: "...",
                botAccounts: "...",
                level3Users: "..."
            };
        }
        return {
            totalViewers: globalStats.totalViewers,
            botAccounts: globalStats.botAccounts,
            level3Users: globalStats.levelDistribution?.["3"] || 0 // Safely access Level 3 count
        };
    };

    const displayDailyStats = () => {
        if (isLoading) {
            return { dailyActiveUsers: <div className="flex justify-center items-center"><PulseLoader color="#0082ed" /></div> };
        }
        if (!dailyStats) {
            return { dailyActiveUsers: "..." };
        }
        return { dailyActiveUsers: dailyStats.dailyActiveUsers };
    };

    const { totalViewers, botAccounts, level3Users } = displayGlobalStats();
    const { dailyActiveUsers } = displayDailyStats();

    return (
        <section id="features" className="mb-16 md:mb-32">
            <div className="max-w-5xl mx-auto px-6">
                <h2 className="text-3xl font-black text-center mb-2 uppercase tracking-wide">Verification Stats</h2>
                <p className="text-xl md:text-2xl text-foreground-800 text-center mb-12 px-8">
                    {totalViewers !== "..." ? `${totalViewers} verified members and counting! Join now and get verified.` : "Loading..."}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="text-center">
                        <div className="text-6xl font-bold text-apeBlue-500 mb-4">{dailyActiveUsers}+</div>
                        <h3 className="text-xl font-semibold mb-2">Daily New Users</h3>
                        <p className="text-gray-600">
                            {""}
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="text-6xl font-bold text-apeGreen mb-4">{totalViewers}</div>
                        <h3 className="text-xl font-semibold mb-2">Verified Users</h3>
                        <p className="text-gray-600">
                            {""}
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="flex justify-center text-6xl font-bold text-yellow-400 mb-4">
                            {level3Users} <span className="text-2xl my-auto">⭐</span>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Level 3 Users</h3>
                        <p className="text-gray-600">
                            {""}
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="text-6xl font-bold text-apeRed mb-4">{botAccounts}</div>
                        <h3 className="text-xl font-semibold mb-2">Bot Accounts</h3>
                        <p className="text-gray-600">
                            {""}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}