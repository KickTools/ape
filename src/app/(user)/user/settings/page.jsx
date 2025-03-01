// src/app/(user)/user/settings/page.jsx
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from "@/contexts/AuthContext";
import AccountSettings from '@/components/settings/AccountSettings';
import ConnectionsSettings from '@/components/settings/ConnectionsSettings';
import PreferencesSettings from '@/components/settings/PreferencesSettings';
import SecuritySettings from '@/components/settings/SecuritySettings';
import NotificationsSettings from '@/components/settings/NotificationsSettings';

export default function SettingsPage() {
  const { user, signedIn } = useAuth();
  const [activeSetting, setActiveSetting] = useState("Account");

  const settingsOptions = [
    { title: "Account", icon: "User" },
    { title: "Connections", icon: "User" },
    { title: "Preferences", icon: "User" },
    { title: "Security", icon: "ShieldCheck" },
    { title: "Notifications", icon: "User" },
    { title: "Disconnect", icon: "User", color: "apeRed" },
  ];

  const renderSettingsContent = () => {
    switch (activeSetting) {
      case "Account":
        return <AccountSettings user={user} />;
      case "Connections":
        return <ConnectionsSettings user={user} />;
      case "Preferences":
        return <PreferencesSettings user={user} />;
      case "Security":
        return <SecuritySettings user={user} />;
      case "Notifications":
        return <NotificationsSettings user={user} />;
      default:
        return <AccountSettings user={user} />;
    }
  };

  if (!signedIn || !user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Please sign in to view settings.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl md:text-2xl font-black text-foreground tracking-wide uppercase mb-8">
            Settings <span className='text-apeRed'>.</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Left Column: Settings Options */}
            <div className="bg-background-400/80 rounded-xl p-6 transition-colors">
              <h3 className="text-lg font-black text-foreground mb-4">
                {user.username}
              </h3>
              <ul className="space-y-4 m-0 p-0">
                {settingsOptions.map((option, index) => (
                  <li key={index} className="flex items-center text-foreground-700">
                    <button
                      onClick={() => setActiveSetting(option.title)}
                      className={`block rounded-sm hover:underline cursor-pointer ${activeSetting === option.title ? 'font-black text-apeBlue' : ''}`}
                    >
                      {option.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column: Settings Form (Dynamic) */}
            <div className="col-span-3 bg-background-400/80 rounded-xl p-6 border-2 border-transparent hover:border-foreground/50 transition-colors">
              {renderSettingsContent()}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}