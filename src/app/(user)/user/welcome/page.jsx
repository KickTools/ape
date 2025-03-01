// src/app/(user)/user/welcome/page.jsx
"use client";

import Icons from "@/assets/icons";
import Link from 'next/link';
import { useAuth } from "@/contexts/AuthContext";
import WelcomeCardSection from "@/components/sections/welcomeCardSection"; // Import the WelcomeCardSection

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

  const bottomLinks = [
    {
      title: "Terms of Service",
      href: "/terms", // Placeholder link
    },
    {
      title: "Privacy Policy",
      href: "/privacy", // Placeholder link
    },
    {
      title: "Contact Us",
      href: "/contact", // Placeholder link
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <section className="py-16">
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

      <section className="py-32 bg-background-400/80 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl md:text-6xl font-black mb-4 uppercase">
            Explore <span className="text-apeRed">.</span>
          </h2>
          <p className="text-lg text-foreground-700">
            Discover exclusive content, participate in community events, and connect with other members. We're excited to have you here!
          </p>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bottomLinks.map((link, index) => (
              <Link key={index} href={link.href} className="block p-4 rounded-xl bg-background-400/80 border-2 border-transparent hover:border-apeGreen/50 transition-colors text-center">
                <h3 className="text-lg font-semibold">{link.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}