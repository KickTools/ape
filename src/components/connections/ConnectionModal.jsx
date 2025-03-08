// src/components/connections/ConnectionModal.jsx
import { useState } from "react";
import Modal from "@/components/elements/Modal";
import Icons from "@/assets/icons";

export default function ConnectionModal({ 
  isOpen, 
  onClose, 
  service, 
  onConnect 
}) {
  const getServiceDisplayName = () => {
    switch (service) {
      case "twitter":
        return "X";
      case "discord":
        return "Discord";
      case "twitch":
        return "Twitch";
      case "kick":
        return "Kick";
      default:
        return service;
    }
  };
  
  const getServiceIcon = () => {
    switch (service) {
      case "twitter":
        return <Icons.BrandX size="2xl" />;
      case "discord":
        return <Icons.BrandDiscord size="2xl" />;
      case "twitch":
        return <Icons.BrandTwitch size="2xl" />;
      case "kick":
        return <Icons.BrandKick size="2xl" />;
      default:
        return null;
    }
  };

  const serviceName = getServiceDisplayName();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center">
        <div className="flex justify-center mb-4">
          {getServiceIcon()}
        </div>
        <h3 className="text-xl font-bold mb-4">
          Connect your {serviceName} account
        </h3>
        <p className="mb-6 text-foreground/80">
          Connecting your {serviceName} account will help verify your identity 
          and increase your verification level.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-background-300 text-foreground hover:bg-background-200"
          >
            Cancel
          </button>
          <button
            onClick={() => onConnect(service)}
            className="px-4 py-2 rounded bg-apeRed text-white hover:bg-apeRed/80"
          >
            Connect {serviceName}
          </button>
        </div>
      </div>
    </Modal>
  );
}