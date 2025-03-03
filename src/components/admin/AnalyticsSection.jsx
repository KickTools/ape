// src/components/admin/AnalyticsSection.jsx
"use client";

import AnalyticCard from "@/components/elements/AnalyticCard";

export default function AnalyticsSection({ analyticsData }) {
  return (
    <section className="py-8 md:py-16 bg-background-400/80 text-center">
      <h2 className="text-5xl font-black mb-8 uppercase">Analytics <span className="text-apeRed apePeriod">Overview</span></h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto px-6">
        <AnalyticCard title="Total Users" value={analyticsData.totalUsers} icon="Ape" />
        <AnalyticCard title="Active Users" value={analyticsData.activeUsers} icon="Ape" />
        <AnalyticCard title="New Users Today" value={analyticsData.newUsersToday} icon="Ape" />
        <AnalyticCard title="Total Events" value={analyticsData.totalEvents} icon="Ape" />
      </div>
    </section>
  );
}