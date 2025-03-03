// src/app/(admin)/admin/page.jsx
"use client";

import Icons from "@/assets/icons";
import Link from 'next/link';
import { useAuth } from "@/contexts/AuthContext";
import WelcomeCardSection from "@/components/sections/welcomeCardSection";
import AnalyticsSection from "@/components/admin/AnalyticsSection";

export default function AdminPage() {
  const { user, signedIn } = useAuth();

  const adminCardData = [
    {
      title: "Start a Giveaway",
      description: "Create and manage giveaways for the community.",
      href: "/admin/giveaways",
      icon: "Gift",
    },
    {
      title: "Look Up a User",
      description: "Search for and view user profiles and activity.",
      href: "/admin/users",
      icon: "Search",
    },
    {
      title: "Manage Events",
      description: "Create, edit, and manage community events.",
      href: "/admin/events",
      icon: "Calendar",
    },
    {
      title: "Manage Roles",
      description: "Assign and manage user roles.",
      href: "/admin/roles",
      icon: "User",
    },
    {
      title: "View Reports",
      description: "Review user reports and take necessary actions.",
      href: "/admin/reports",
      icon: "Clipboard",
    },
    {
      title: "Site Settings",
      description: "Manage global site settings and configurations.",
      href: "/admin/settings",
      icon: "Settings",
    },
  ];

  const adminExploreLinks = [
    {
      title: "View Logs",
      description: "Access system logs for troubleshooting and monitoring.",
      href: "/admin/logs",
      icon: "ListOrdered",
    },
    {
      title: "Manage Announcements",
      description: "Create and publish announcements for the community.",
      href: "/admin/announcements",
      icon: "Megaphone",
    },
    {
      title: "Manage Content",
      description: "Manage site content, including pages and posts.",
      href: "/admin/content",
      icon: "FileText",
    },
  ];

  // Dummy analytics data (replace with actual data fetching)
  const analyticsData = {
    totalUsers: 1234,
    activeUsers: 567,
    newUsersToday: 50,
    totalEvents: 10,
  };

  return (
    <div className="flex flex-col">
      <section className="py-16 md:py-32">
        <div className="max-w-5xl mx-auto px-6 mb-8">
          {signedIn && user ? (
            <div className="flex flex-col items-center">
              <h2 className="text-4xl md:text-6xl font-black text-foreground tracking-wide uppercase apePeriod">
                Admin
              </h2>
              <p className="text-lg text-foreground-600">
                Welcome to the Admin Panel. You are logged in as{" "}
                <span className="font-bold">{user.username}</span>.
              </p>
            </div>
          ) : (
            <div className="animate-pulse bg-foreground-200 h-20 w-40 mx-auto mb-8 rounded"></div>
          )}
        </div>
        <WelcomeCardSection cardData={adminCardData} />
      </section>

      {/* Analytics Section */}
      <AnalyticsSection analyticsData={analyticsData} />
    </div>
  );
}