// src/app/(user)/user/welcome/page.jsx
"use client";

import Icons from "@/assets/icons";
import Link from 'next/link';
import { useAuth } from "@/contexts/AuthContext";
import WelcomeCardSection from "@/components/sections/welcomeCardSection";
import ExploreSection from "@/components/sections/exploreSection";

export default function WelcomePage() {
  const { user, signedIn, primaryPlatform } = useAuth();

  const cardData = [
    {
      title: "View Your Profile",
      description: "See your Ape Gang profile, including Kick and Twitch.",
      href: "/user/profile",
      icon: "User",
    },
    {
      title: "Update Settings",
      description: "Manage your account, connections, and preferences.",
      href: "/user/settings",
      icon: "DeviceGamepad3",
    },
    {
      title: "Verification Status",
      description: "Check and improve your verification level progress",
      href: "/user/verification",
      icon: "ShieldCheck",
    },
    {
      title: "Community Events",
      description: "Participate in giveaways and community events.",
      href: "/user/events",
    },
    {
      title: "FAQ & Support",
      description: "Get help and find answers to common questions.",
      href: "/faq",
      icon: "ProgressHelp",
    },
    {
      title: "Ape Nation Discord",
      description: "Connect to the official Train community Discord server.",
      href: "https://discord.gg/trainwreckstv",
      icon: "BrandDiscord",
    },
  ];

  const exploreLinks = [
    {
      title: "Leaderboard",
      description: "See where you rank among other Ape Gang members.",
      href: "/leaderboard",
      icon: "Trophy",
    },
    {
      title: "Moments",
      description: "View and share your favorite moments from the Ape Gang community.",
      href: "/user/moments",
      icon: "Photo",
    },
    {
      title: "Contact Us",
      description: "Reach out to the Ape Gang team for support and inquiries.",
      href: "/contact",
      icon: "Send",
    },
  ];

  return (
    <div className="flex flex-col">
      <section className="py-16 md:py-32">
        <div className="max-w-5xl mx-auto px-6 mb-8">
          {signedIn && user ? (
            <div className="flex flex-col items-center">
              <h2 className="text-4xl md:text-6xl font-black text-foreground tracking-wide uppercase">
                Welcome<span className="text-apeRed">,</span> {user.username}
              </h2>
              <p className="text-lg text-foreground-600">
                Currently using your {primaryPlatform.charAt(0).toUpperCase() + primaryPlatform.slice(1)} account
              </p>
            </div>
          ) : (
            <div className="animate-pulse bg-foreground-200 h-20 w-40 mx-auto mb-8 rounded"></div>
          )}
        </div>
        <WelcomeCardSection cardData={cardData} />
      </section>

      <section className="py-16 md:py-32 mb-16 md:mb-32 bg-background-400/80 text-center">
        <ExploreSection exploreLinks={exploreLinks} />
      </section>
    </div>
  );
}