"use client";

import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import Icons from "@/assets/icons";
import trainLogoLight from "@/assets/images/train_logo_light.png";
import Image from "next/image";

function VerificationTimelineFiller() {
  const { user, kickProfile, twitchProfile } = useAuth();
  
  // Check which steps are verified
  const isTwitchVerified = !!twitchProfile;
  const isKickVerified = !!kickProfile;
  
  // Count verified steps
  const verifiedStepsCount = [isTwitchVerified, isKickVerified].filter(Boolean).length;
  
  // Placeholder verification functions
  const verifyTwitch = () => {
    if (!isTwitchVerified) {
      console.log("Twitch verification would happen here");
      // In the future, this would trigger the Twitch auth flow
    }
  };
  
  const verifyKick = () => {
    if (!isKickVerified) {
      console.log("Kick verification would happen here");
      // In the future, this would trigger the Kick auth flow
    }
  };
  
  const verifyFollowAndChat = () => {
    console.log("Follow and chat verification would happen here");
    // This would check if user follows and has chatted
  };
  
  const verifyDiscord = () => {
    console.log("Discord verification would happen here");
    // This would trigger Discord auth flow
  };
  
  const verifyTwitter = () => {
    console.log("Twitter verification would happen here");
    // This would trigger Twitter auth flow
  };

  const verificationSteps = [
    {
      step: "Authenticate Twitch",
      stars: isTwitchVerified ? 2 : 0,
      description: isTwitchVerified 
        ? "Twitch account connected ✅" 
        : "Connect your Twitch account.",
      color: isTwitchVerified ? "bg-twitch" : "bg-foreground",
      icon: <Icons.BrandTwitch size="3xl" color="foreground" />,
      onClick: verifyTwitch,
      verified: isTwitchVerified
    },
    {
      step: "Authenticate Kick",
      stars: isKickVerified ? 2 : 0,
      description: isKickVerified 
        ? "Kick account connected ✅" 
        : "Connect your Kick account.",
      color: isKickVerified ? "bg-kick" : "bg-foreground",
      icon: <Icons.BrandKick size="3xl" color="background" />,
      onClick: verifyKick,
      verified: isKickVerified
    },
    {
      step: "Follow Trainwreck and Chat",
      stars: 0,
      description: "Follow Trainw on Kick and chat.",
      color: "bg-apeRed",
      icon: <Icons.Ape size="3xl" color="foreground" />,
      onClick: verifyFollowAndChat,
      verified: false
    },
    {
      step: "Authenticate Discord",
      stars: 0,
      description: "Connect your Discord account.",
      color: "bg-discord",
      icon: <Icons.BrandDiscord size="3xl" color="foreground" />,
      onClick: verifyDiscord,
      verified: false
    },
    {
      step: "Authenticate Twitter (X)",
      stars: 0,
      description: "Connect your Twitter (X) account.",
      color: "bg-apeBlue",
      icon: <Icons.BrandX size="3xl" color="foreground" />,
      onClick: verifyTwitter,
      verified: false
    }
  ];

  const renderStars = (stars) => {
    return (
      <span className="text-apeRed">
        {"★".repeat(stars)}
        {"☆".repeat(5 - stars)}
      </span>
    );
  };

  // Calculate total stars collected
  const totalStars = verificationSteps.reduce((sum, step) => sum + step.stars, 0);
  const maxPossibleStars = verificationSteps.length * 1; // Each step is worth 2 stars

  return (
    <div className="flex flex-col items-center min-h-screen py-32">
      {/* Small centered logo */}
      <div className="mb-6">
        <Image
          src={trainLogoLight}
          alt="SquadW Logo"
          width={80}
          height={80}
          className="mx-auto"
        />
      </div>
      <h1 className="text-6xl font-black uppercase mb-2">
        Ape Gang Verification
      </h1>
      <p className="text-2xl text-foreground-700 mb-2">
        {user?.username}, you are currently level {verifiedStepsCount} the verification process.
      </p>
      
      {/* Stars progress indicator */}
      <div className="text-4xl mb-32">
        {renderStars(totalStars)}
      </div>

      <div className="relative w-full max-w-4xl">
        {/* Vertical Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-background-700"></div>

        {verificationSteps.map((step, index) => (
          <div
            key={index}
            className={`flex items-center w-full mb-10 ${
              index % 2 === 0 ? "justify-start" : "justify-end"
            }`}
          >
            {/* Timeline Content */}
            <div className={`relative flex items-center w-96 p-6 bg-background/90 shadow-lg rounded-lg ${
              step.verified ? "border-2 border-apeRed/50 shadow-apeRed/10 shadow-lg" : ""
            }`}>
              <div
                className={`w-12 h-12 flex items-center justify-center rounded-sm ${step.color} shadow-md cursor-pointer hover:opacity-80 transition-opacity`}
                onClick={step.onClick}
                role="button"
                aria-label={`Verify ${step.step}`}
              >
                {step.icon}
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-bold mb-0.5">
                  {step.step}
                </h3>
                <p className="text-foreground-700">{step.description}</p>
              </div>
            </div>

            {/* Star Connector instead of Dot */}
            <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center w-16 h-16">
              <span className={`text-4xl ${step.verified ? "text-apeRed" : "text-foreground"}`}>★</span>
            </div>

            {/* Connection Line to Next Step (except for the last one) */}
            {index < verificationSteps.length - 1 && (
              <div className={`absolute left-1/2 transform -translate-x-1/2 h-10 w-1 top-full ${
                step.verified && verificationSteps[index + 1].verified 
                  ? "bg-apeRed" 
                  : "bg-background-700"
              }`} style={{ top: "calc(100% - 5px)" }}></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default VerificationTimelineFiller;