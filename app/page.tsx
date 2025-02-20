"use client";

import { useAuth } from "@/context/AuthContext";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { useEffect, useState } from "react";
import { TrainwrecksTVLogo } from "@/components/logo";
import { VerifiedIcon } from "@/components/icons";
import { useGlobalStats, useDailyStats, GlobalStats, DailyStats } from '../api/handleAnalytics';

export default function Home() {
  const { isAuthenticated } = useAuth();
  const [globalStats, setGlobalStats] = useState<GlobalStats | null>(null);
  const [dailyStats, setDailyStats] = useState<DailyStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { fetchGlobalStats } = useGlobalStats();
  const { getDailyStats } = useDailyStats();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        const [globalData, dailyData] = await Promise.all([
          fetchGlobalStats(),
          getDailyStats(new Date().toISOString().split('T')[0])
        ]);

        setGlobalStats(globalData);
        setDailyStats(dailyData);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();

    // Set up refresh interval (optional)
    const intervalId = setInterval(fetchStats, 2.5 * 60 * 1000); // Refresh every 2.5 minutes

    return () => clearInterval(intervalId);
  }, [fetchGlobalStats, getDailyStats]);

  const Stats = () => {
    if (isLoading) {
      return <p className="text-lg text-gray-400 mt-4">Loading stats...</p>;
    }

    if (!globalStats || !dailyStats) {
      return <p className="text-lg text-gray-400 mt-4">Stats unavailable</p>;
    }

    return (
      <div className="mt-8 flex gap-8 sm:gap-16 justify-center">
        <div className="text-center">
          <span className="text-3xl text-kick-500 font-bold tracking-wide">
            {dailyStats.dailyActiveUsers}+
          </span>
          <p className="text-base text-kick-200">Daily Active Users</p>
        </div>
        <div className="text-center">
          <span className="text-3xl text-secondary-400 font-bold tracking-wide">
            {globalStats.verifiedViewers}+
          </span>
          <p className="text-base text-secondary-800">Verified Viewers</p>
        </div>
        <div className="text-center">
          <span className="text-3xl text-primary-400 font-bold tracking-wide">
            {globalStats.botAccounts || 0}
          </span>
          <p className="text-base text-primary-800">Bot Accounts</p>
        </div>
      </div>
    );
  };

  return (
    <section className="flex flex-col flex-grow items-center mt-12 gap-6 py-12 px-6 text-center">
      {/* Logo */}
      <TrainwrecksTVLogo className="mb-8" width={22} height={22} />

      {/* Welcome Message */}
      <h1 className="text-4xl font-bold tracking-tight">
        Welcome to Ape Gang Community
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
        This app helps you verify your <strong>Kick</strong> and <strong>Twitch</strong> accounts
        to gain access to exclusive features, communities, giveaways and rewards.
      </p>

      {/* Verification Badge */}
      <div className="flex flex-col items-center gap-2 mt-2 text-xl font-medium">
        <div className="flex items-center gap-2">
          <VerifiedIcon className="w-6 h-6 text-kick -translate-y-[2px]" />
          <span>Official Verification Process</span>
        </div>
        <span className="text-foreground-100 text-base">
          {isAuthenticated ? "You are currently verified" : ""}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <Button
          as="a"
          size="lg"
          radius="full"
          color="primary"
          href={isAuthenticated ? "#" : "/connect"}
          isDisabled={isAuthenticated}
          className={`font-bold bg-kick text-background ${isAuthenticated ? "opacity-50 cursor-not-allowed" : ""
            }`}
        >
          {isAuthenticated ? "Verified" : "Verify Now"}
        </Button>
        <Button
          as="a"
          size="lg"
          radius="full"
          color="primary"
          href={isAuthenticated ? "/dashboard" : "/login"}
          className="font-bold"
        >
          {isAuthenticated ? "Continue" : "Log In"}
        </Button>
      </div>

      {/* Analytics */}
      <div className="flex flex-col gap-6 mt-12 mb-8">
        <Card isBlurred shadow="sm" className="border-none dark:bg-default-100/30">
          <div className="p-8">
            <h2 className="text-3xl font-bold tracking-wider">Community Stats</h2>
            <p className="text-xl text-gray-300 mt-4 w-4/5 mx-auto">
              <strong>{globalStats?.verifiedViewers || "..."}</strong> verified members
              and counting! Join now to get exclusive perks.
            </p>
            <Stats />
          </div>
        </Card>
      </div>
    </section>
  );
}