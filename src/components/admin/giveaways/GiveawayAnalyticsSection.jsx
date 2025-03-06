// src/components/admin/giveaways/GiveawayAnalyticsSection.jsx
"use client";
import { useState, useEffect } from "react";
import AnalyticCard from "@/components/elements/AnalyticCard";
import { getAllGiveaways } from "@/lib/giveawayAPI";
import { useToast } from "@/contexts/ToastContext";

// Skeleton component for loading state
const AnalyticCardSkeleton = () => (
  <div className="animate-pulse p-4 rounded-xl shadow-md bg-background-400">
    <div className="inline-block h-6 w-1/6 bg-background-300/10 rounded-lg mr-2"></div>
    <div className="inline-block h-6 w-5/6 bg-background-300/10 rounded-lg"></div>
    <div className="h-4 w-8 bg-background-300/50 rounded-lg"></div>
  </div>
);

export default function GiveawayAnalyticsSection() {
  const [analytics, setAnalytics] = useState({
    totalCount: 0,
    activeCount: 0,
    completedCount: 0,
    winnerCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const fetchGiveaways = async () => {
      try {
        setLoading(true);
        const { data } = await getAllGiveaways();

        const stats = {
          totalCount: data.length,
          activeCount: data.filter((g) => g.status === "active").length,
          completedCount: data.filter((g) => g.status === "completed").length,
          winnerCount: data.reduce(
            (acc, g) => acc + (g.winners?.length || 0),
            0
          ),
        };
        setAnalytics(stats);
      } catch (err) {
        setError("Failed to load giveaways.");
        toast.error("Failed to load giveaways.");
        console.error("Error fetching giveaways:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGiveaways();
  }, [toast]);

  if (loading) {
    return (
      <section className="pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <AnalyticCardSkeleton />
          <AnalyticCardSkeleton />
          <AnalyticCardSkeleton />
          <AnalyticCardSkeleton />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8 md:py-16 px-8 bg-background-400/80 text-center">
        <h2 className="text-5xl font-black mb-8 uppercase">
          Giveaway <span className="text-apeRed apePeriod">Analytics</span>
        </h2>
        <div className="text-red-500">Error: {error}</div>
      </section>
    );
  }

  return (
    <section className="pb-8 md:pb-16 px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        <AnalyticCard
          title="Total Giveaways"
          value={analytics.totalCount}
          icon="Gift"
        />
        <AnalyticCard
          title="Active"
          value={analytics.activeCount}
          icon="Runner"
        />
        <AnalyticCard
          title="Completed"
          value={analytics.completedCount}
          icon="CircleCheck"
        />
        <AnalyticCard
          title="Winners"
          value={analytics.winnerCount}
          icon="Trophy"
        />
      </div>
    </section>
  );
}