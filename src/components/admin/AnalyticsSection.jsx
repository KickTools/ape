// src/components/admin/AnalyticsSection.jsx
"use client";
import { useState, useEffect } from "react";
import AnalyticCard from "@/components/elements/AnalyticCard";
import { getAdminAnalytics } from "@/lib/analytics";

export default function AnalyticsSection({ userId }) {
  const [analyticsData, setAnalyticsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userId) {
      fetchAnalytics();
    }
  }, [userId]);

  async function fetchAnalytics() {
    try {
      setLoading(true);
      const response = await getAdminAnalytics(userId);
      if (response && response.success && response.data) {
        setAnalyticsData(response.data);
      } else {
        setError('Invalid response from server.');
        console.error('Invalid response:', response);
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching analytics:', err);
    } finally {
      setLoading(false);
    }
  }

  // Helper function to format live time with days
  function formatLiveTime(totalMinutes) {
    const days = Math.floor(totalMinutes / (24 * 60));
    const remainingMinutes = totalMinutes % (24 * 60);
    const hours = Math.floor(remainingMinutes / 60);
    const minutes = Math.floor(remainingMinutes % 60);

    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m`;
    }
    return `${hours}h ${minutes}m`;
  }

  if (loading) {
    return (
      <section className="py-8 md:py-16 bg-background-400/80 text-center">
        <h2 className="text-5xl font-black mb-8 uppercase">
          Analytics <span className="text-apeRed apePeriod">Overview</span>
        </h2>
        <div className="text-white">Loading analytics...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8 md:py-16 bg-background-400/80 text-center">
        <h2 className="text-5xl font-black mb-8 uppercase">
          Analytics <span className="text-apeRed apePeriod">Overview</span>
        </h2>
        <div className="text-red-500">Error: {error}</div>
      </section>
    );
  }

  return (
    <section className="py-8 md:py-16 bg-background-400/80 text-center">
      <h2 className="text-5xl font-black mb-8 uppercase">
        Analytics <span className="text-apeRed apePeriod">Overview</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto px-6">
  {/* Overall Stream Activity (Last 30 Days) */}
  <AnalyticCard title="Times Live" value={analyticsData.totalStreams || 0} icon="Ape" subText="Last 30 days" />
  <AnalyticCard title="Total Live Time" value={formatLiveTime(analyticsData.totalLiveTime || 0)} icon="Ape" isTimeFormat={true} subText="Last 30 days" />

  {/* Follower/Subscriber Growth (Last 30 Days) */}
  <AnalyticCard title="Followers Gained" value={analyticsData.totalFollowersGained || 0} icon="Ape" subText="Last 30 days" />
  <AnalyticCard title="Subscribers" value={analyticsData.totalSubscribers || 0} icon="Ape" subText="Last 30 days" />
  <AnalyticCard title="Gifted Subs" value={analyticsData.totalGiftedSubs || 0} icon="Ape" subText="Last 30 days" />

  {/* Today's Follower/Subscriber Growth */}
  <AnalyticCard title="Today Followers" value={analyticsData.todayFollowersGained || 0} icon="Ape" subText="Current Day" />
  <AnalyticCard title="Today Subs" value={analyticsData.todaySubscribers || 0} icon="Ape" subText="Current Day" />
  <AnalyticCard title="Today Gifted Subs" value={analyticsData.todayGiftedSubs || 0} icon="Ape" subText="Current Day" />
</div>
    </section>
  );
}