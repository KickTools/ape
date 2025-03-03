// src/components/admin/UserLookup/UserProfileCard.jsx
"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useToast } from "@/contexts/ToastContext";
import { fetchDetailedUserProfile } from "@/lib/viewerDataAPI";
import Icons from "@/assets/icons";
import ApeLoader from "@/components/elements/ApeLoader";

export default function UserProfileCard({ user }) {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);
  const [addressVisible, setAddressVisible] = useState({
    contact: false,
    btc: false,
    eth: false,
  });
  const toast = useToast();

  useEffect(() => {
    let mounted = true;

    const loadProfile = async () => {
      try {
        const data = await fetchDetailedUserProfile(user.platform || "kick", user.id);
        if (mounted) {
          setProfileData(data);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError("Failed to load profile data.");
          toast.error("Failed to load profile data.");
        }
      }
    };

    loadProfile();

    return () => {
      mounted = false;
    };
  }, [user, toast]);

  const toggleAddressVisibility = (type) => {
    setAddressVisible((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const copyAddress = (address, addressType) => {
    if (!address) return;
    navigator.clipboard.writeText(address).then(() => {
      toast.success(`${addressType} copied to clipboard!`);
    }).catch(() => {
      toast.error(`Failed to copy ${addressType}.`);
    });
  };

  const formattedDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!profileData) {
    return  (
    <div className="flex flex-col justify-center items-center m-16">
      <ApeLoader />
      <p className="text-center text-foreground-700 font-bold">Loading profile data...</p>        
    </div>);
  };

  const { kick, twitch, accountVerified, level, contactAddress, btc, eth, kickRelatedInfo } = profileData;

  return (
    <div className="userProfileModal-card">
      <div className="flex">
        {/* Left Column: Profile */}
        <div className="w-1/2">
          <div className="userProfileModal-pfp-container">
            <Image
              src={user.profileImage}
              alt={kick?.username || twitch?.username || "User"}
              width={120}
              height={120}
              className="userProfileModal-pfp"
            />
          </div>
          <h3 className="text-xl font-semibold">{kick?.username || twitch?.username}</h3>
          <div className="userProfileModal-info my-4">
            <p><span className="userProfileModal-label">Level:</span> <span className="userProfileModal-data text-apeRed text-lg">{"★".repeat(level)}</span></p>
            <p><span className="userProfileModal-label">Msgs: </span>{kickRelatedInfo?.chatActivity?.messages || "N/A"}</p>
            <p><span className="userProfileModal-label">Days: </span>{kickRelatedInfo?.chatActivity?.daysActive || "N/A"}</p>
            <p><span className="userProfileModal-label">Watch Time: </span>{kickRelatedInfo?.chatActivity?.watchTime || "N/A"}</p>
            <p><span className="userProfileModal-label">Verified:</span> <span className="userProfileModal-data">{accountVerified ? "Yes" : "No"}</span></p>
          </div>

          <p className="userProfileModel-sectionHeader">Contact</p>
          <div className="userProfileModal-info my-2">
            <div className="flex flex-col">
              <span className={`userProfileModal-data ${addressVisible.contact ? "" : "blur-xs"}`}>
                {addressVisible.contact ? contactAddress || "N/A" : "****************"}
              </span>
              <div className="flex gap-2 mt-1">
                <button onClick={() => toggleAddressVisibility("contact")} className="userProfileModal-button">
                  <Icons.Eye size="lg" />
                </button>
                <button onClick={() => copyAddress(contactAddress, "Contact Address")} className="userProfileModal-button" disabled={!contactAddress}>
                  <Icons.Clipboard size="lg" />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Streamer Data */}
        <div className="w-1/2">
            <p className="userProfileModel-sectionHeader">Kick</p>
            <div className="userProfileModal-info border-kick my-4">
              <p>
                <span className="userProfileModal-label">
                  <a
                    href={`https://kick.com/${kick?.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {kick?.username || "N/A"}
                  </a>
                </span>
              </p>
              <p><span className="userProfileModal-label">Created:</span> {formattedDate(kickRelatedInfo?.accountCreatedDate) || "N/A"}</p>
              <p><span className="userProfileModal-label">Age:</span> {kickRelatedInfo?.accountAge || "N/A"}</p>
            </div>

            <p className="userProfileModel-sectionHeader pt-4">Twitch</p>
            <div className="userProfileModal-info border-twitch my-4">
              <p>
                <span className="userProfileModal-label">
                  <a
                    href={`https://twitch.tv/${twitch?.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {twitch?.username || "N/A"}
                  </a>
                </span>
              </p>
            </div>

          <p className="userProfileModel-sectionHeader pt-4">Kick Association</p>
          <div className="userProfileModal-info border-kick my-4">
            <p><span className="userProfileModal-label">Followed:</span>{kickRelatedInfo?.followed ? "Yes" : "No"}</p>
            <p><span className="userProfileModal-label">Follow Age:</span>{kickRelatedInfo?.followAge || "N/A"}</p>
            <p><span className="userProfileModal-label">Subscriber:</span>{kickRelatedInfo?.subscriber ? "Yes" : "No"}</p>
            <p><span className="userProfileModal-label">Sub Length:</span>{kickRelatedInfo?.subLength || "N/A"}</p>
            <p><span className="userProfileModal-label">Banned:</span>{kickRelatedInfo?.userBanned ? "Yes" : "No"}</p>
          </div>

        </div>
      </div>
      <div className="flex flex-col mt-4">
          <p className="userProfileModel-sectionHeader">Crypto</p>
          <div className="userProfileModal-info border-apeBlue my-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <p className="truncate pr-2"><span className="userProfileModal-label">BTC:</span> {addressVisible.btc ? btc || "N/A" : "********************"}</p>
                <button onClick={() => toggleAddressVisibility("btc")} className="userProfileModal-button mr-1" title="Toggle visibility">
                  <Icons.Eye size="lg" />
                </button>
                <button onClick={() => copyAddress(btc, "BTC")} className="userProfileModal-button" disabled={!btc} title="Copy BTC address">
                  <Icons.Clipboard size="lg" />
                </button>
              </div>
              <div className="flex items-center">
              <p className="truncate pr-2"><span className="userProfileModal-label">ETH:</span> {addressVisible.eth ? eth || "N/A" : "********************"}</p>
                <button onClick={() => toggleAddressVisibility("eth")} className="userProfileModal-button mr-1" title="Toggle visibility">
                  <Icons.Eye size="lg" />
                </button>
                <button onClick={() => copyAddress(eth, "ETH")} className="userProfileModal-button" disabled={!eth} title="Copy ETTH address">
                  <Icons.Clipboard size="lg" />
                </button>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}