// components/auth/AccountVerification.js
"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Icons from "@/assets/icons/index.jsx";
import ApeLoader from "../elements/ApeLoader";
import { useRouter } from "next/navigation";
import { verifyAuthToken, saveUserData, fetchKickUserData } from "@/lib/auth";

export default function AccountVerification({ setAuthState }) {
  const { login } = useAuth();
  const router = useRouter();
  const [isVerifying, setIsVerifying] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [verificationError, setVerificationError] = useState(null);
  const [accountInfo, setAccountInfo] = useState(null);
  const verificationAttemptedRef = useRef(false);

  const handleContinue = () => {
    router.push("/user/welcome");
  };

  const verifyAccount = async () => {
    if (verificationAttemptedRef.current) return;
    verificationAttemptedRef.current = true;

    try {
      setIsVerifying(true);

      // Verify both platform tokens to get user data
      const [twitchVerification, kickVerification] = await Promise.all([
        verifyAuthToken("twitch"),
        verifyAuthToken("kick")
      ]);

      // Check if both verifications were successful
      if (!twitchVerification.isValid || !kickVerification.isValid) {
        console.error("Token verification failed:", {
          twitch: twitchVerification.isValid,
          kick: kickVerification.isValid
        });
        throw new Error("Account verification failed. Please try again.");
      }

      // Extract user data from verification results
      const twitchProfile = twitchVerification.user;
      let kickProfile = kickVerification.user; // Initialize kickProfile

      try {
        const kickUserData = await fetchKickUserData(
          kickProfile.username || kickProfile.name
        );
        if (kickUserData && kickUserData.success && kickUserData.user) {
          // Merge kickProfile with fetched Kick user data
          kickProfile = { ...kickProfile, ...kickUserData.user };
        } else {
          console.warn(
            "Failed to fetch additional Kick user data, using basic profile."
          );
        }
      } catch (fetchError) {
        console.error("Error fetching additional Kick user data:", fetchError);
        console.warn("Using basic Kick profile data.");
      }

      // Save both platform data to the backend
      setIsSaving(true);
      const saveResult = await saveUserData(twitchProfile, kickProfile);
      setIsSaving(false);

      if (!saveResult.success) {
        console.error("Failed to save user data:", saveResult);
        throw new Error(
          "Failed to save your account information. Please try again."
        );
      }

      // Set account info for display
      setAccountInfo({
        twitch_username: twitchProfile.display_name || twitchProfile.login,
        kick_username: kickProfile.username || kickProfile.name
      });

      // Log in with the Auth context
      await login({
        twitch: twitchProfile,
        kick: kickProfile,
        primaryPlatform: "twitch" // Default to Twitch as primary
      });

      setIsVerifying(false);
    } catch (error) {
      console.error("Account verification failed:", error);
      setVerificationError(
        error.message ||
          "Your account couldn't be verified. Please start the process again."
      );
      setIsVerifying(false);
    }
  };

  useEffect(() => {
    // Begin verification process
    verifyAccount();
  }, []);

  // Show loading state when either verifying tokens or saving data
  if (isVerifying || isSaving) {
    return (
      <div className="space-y-8 text-left">
        <h1 className="text-6xl font-black">
          3<span className="text-apeRed ml-2">.</span>
        </h1>
        <div>
          <h1 className="text-2xl font-black tracking-wide">
            {isSaving ? "Creating Account" : "Connecting"}
          </h1>
          <p className="mt-2 text-foreground-700 tracking-wide">
            {isSaving
              ? "Saving your account information..."
              : "Gathering your account information..."}
          </p>
        </div>
        <div className="flex justify-start items-center">
          <ApeLoader />
        </div>
      </div>
    );
  }

  if (verificationError) {
    return (
      <div className="space-y-8 text-left">
        <h1 className="text-6xl font-black">
          3<span className="text-apeRed ml-2"></span>
        </h1>
        <div>
          <h1 className="text-2xl font-black tracking-wide">Error</h1>
          <p className="mt-2 text-foreground-700 tracking-wide">
            {verificationError}
          </p>
          <button
            onClick={() => setAuthState("register")}
            className="text-apeRed hover:underline focus:outline-none cursor-pointer"
          >
            Start Over
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 text-left">
      <h1 className="text-6xl font-black">
        3<span className="text-apeRed ml-2">.</span>
      </h1>
      <div>
        <h1 className="text-2xl font-black tracking-wide">Connected</h1>
        <p className="mt-2 text-foreground-700 tracking-wide">
          Account successfully created!
        </p>
      </div>

      <div>
        <p className="text-lg text-foreground tracking-wide">
          You have successfully verified your Twitch and Kick accounts and you
          are currently at level 2 verification. Confirm your information below
          to proceed. If for some reasson the wrong accounts were connected
          please send us a message to webmaster@squadw.online
        </p>
      </div>

      {/* Display Account Info */}
      {accountInfo && (
        <div className="my-4 py-2 px-4 border-l-4 border-apeRed">
          <h2 className="text-lg font-bold mb-2">Account Information:</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold text-twitch">Twitch Username:</p>
              <p className="text-foreground-700">
                {accountInfo.twitch_username}
              </p>
            </div>
            <div>
              <p className="font-semibold text-kick">Kick Username:</p>
              <p className="text-foreground-700">{accountInfo.kick_username}</p>
            </div>
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex flex-col gap-4">
        <button
          className="flex items-center justify-center gap-4 border-2 border-apeRed text-foreground-500 font-bold py-3 px-6 rounded-lg bg-transparent hover:bg-apeRed hover:border-apeRed hover:text-foreground transition cursor-pointer"
          onClick={handleContinue}
        >
          <span>Continue to SquadW Online</span>
          <Icons.Ape size="2xl" className="my-auto -translate-y-0.5" />
        </button>
      </div>

      {/* Terms */}
      <p className="text-foreground-700 tracking-wide leading-8">
        By continuing, you agree to the{" "}
        <a href="/legal?doc=tos" className="text-foreground hover:underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a
          href="/legal?doc=privacy"
          className="text-foreground hover:underline"
        >
          Privacy Policy
        </a>
      </p>
    </div>
  );
}
