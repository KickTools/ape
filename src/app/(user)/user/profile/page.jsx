// sr/app/(user)/user/profile/page.jsx
"use client";

import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import Icons from "@/assets/icons";
import sectionTexture from "@/assets/images/section-textures.jpg";
import Image from "next/image";

export default function Profile() {
  const { user, kickProfile, twitchProfile } = useAuth();

  // Fallback username if neither profile is available
  const username = kickProfile?.username || twitchProfile?.display_name || "Unknown User";

  // Join date (earliest from Kick or Twitch)
  const joinDate = kickProfile?.created_at || twitchProfile?.created_at 
    ? new Date(kickProfile?.created_at || twitchProfile?.created_at).toLocaleDateString()
    : "N/A";

  return (
    <div className="flex flex-col">
      <section className="py-24 text-center text-foreground">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex justify-center mb-6">
            <Icons.Ape size="6xl" color="apeRed" />
          </div>
          <h1 className="text-4xl lg:text-6xl font-black mb-2 uppercase">
            Squad Profile <span className="text-apeRed">.</span>
          </h1>
          <p className="text-3xl font-bold md:text-4xl text-foreground-700 px-16 mb-8 uppercase">
            {username}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {/* Kick Profile Card */}
            {kickProfile && (
              <div className="bg-background-400/80 p-6 rounded-md">
                <div className="flex items-center mb-4">
                  {kickProfile.profile_pic && (
                    <Image
                      src={kickProfile.profile_pic}
                      alt={`${kickProfile.username}'s Kick profile`}
                      width={48}
                      height={48}
                      className="rounded-full mr-4"
                    />
                  )}
                  <h3 className="text-xl font-semibold">
                    Kick <span className="text-kick font-black mr-2">. </span>{kickProfile.username}
                  </h3>
                </div>
                <p className="text-foreground-700 mb-2">{kickProfile.bio || "No bio available"}</p>
                <p className="text-sm">
                  <strong>Followers:</strong> {kickProfile.followers_count || 0}
                </p>
                <p className="text-sm">
                  <strong>Verified:</strong> {kickProfile.is_verified ? "Yes" : "No"}
                </p>
                <p className="text-sm">
                  <strong>Joined:</strong> {new Date(kickProfile.created_at).toLocaleDateString()}
                </p>
                {kickProfile.social_links && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {Object.entries(kickProfile.social_links).map(([platform, handle]) =>
                      handle ? (
                        <a
                          key={platform}
                          href={
                            platform === "twitter"
                              ? `https://twitter.com/${handle}`
                              : platform === "instagram"
                              ? `https://instagram.com/${handle}`
                              : platform === "youtube"
                              ? `https://youtube.com/${handle}`
                              : platform === "discord"
                              ? `https://discord.gg/${handle}`
                              : platform === "tiktok"
                              ? `https://tiktok.com/@${handle}`
                              : "#"
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-foreground-700 hover:underline"
                        >
                          {platform.charAt(0).toUpperCase() + platform.slice(1)}
                        </a>
                      ) : null
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Twitch Profile Card */}
            {twitchProfile && (
              <div className="bg-background-400/80 p-6 rounded-md text-left">
                <div className="flex items-center mb-4">
                  {twitchProfile.profile_image_url && (
                    <Image
                      src={twitchProfile.profile_image_url}
                      alt={`${twitchProfile.display_name}'s Twitch profile`}
                      width={48}
                      height={48}
                      className="rounded-full mr-4"
                    />
                  )}
                  <h3 className="text-xl font-semibold">
                    Twitch<span className="text-twitch font-black mr-2"> . </span>{twitchProfile.display_name}
                  </h3>
                </div>
                <p className="text-foreground-700 mb-2">{twitchProfile.description || "No bio available"}</p>
                <p className="text-sm">
                  <strong>Broadcaster Type:</strong> {twitchProfile.broadcaster_type || "None"}
                </p>
                <p className="text-sm">
                  <strong>Joined:</strong> {new Date(twitchProfile.created_at).toLocaleDateString()}
                </p>
              </div>
            )}

            {/* General Info Card */}
            <div className="bg-background-400/80 p-6 rounded-md text-left">
              <h3 className="text-xl font-semibold mb-4">General Info</h3>
              <p className="text-sm">
                <strong>Username:</strong> {username}
              </p>
              <p className="text-sm">
                <strong>Earliest Join Date:</strong> {joinDate}
              </p>
              <p className="text-sm">
                <strong>Kick Status:</strong> {kickProfile ? "Active" : "Not Linked"}
              </p>
              <p className="text-sm">
                <strong>Twitch Status:</strong> {twitchProfile ? "Active" : "Not Linked"}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}