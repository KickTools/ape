// src/components/settings/ConnectionsSettings.jsx
import { useState, useEffect } from "react";
import Icons from "@/assets/icons";
import Modal from "@/components/elements/Modal";
import { initiateConnection, getVerificationLevel } from "@/lib/connectionsAPI";

export default function ConnectionsSettings({ user }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState({
    x: false,
    twitch: false,
    kick: false,
    discord: false,
  });

  const userID = user?.id;
  const userPlatform = user?.platform;

  useEffect(() => {
    const fetchVerificationStatus = async () => {
      if (userID && userPlatform) {
        try {
          const data = await getVerificationLevel(null, userID, userPlatform);
  
          setVerificationStatus({
            x: data.verificationStatus.x, 
            twitch: data.verificationStatus.twitch,
            kick: data.verificationStatus.kick,
            discord: data.verificationStatus.discord
          });
        } catch (error) {
          console.error("Failed to fetch verification status:", error);
        }
      }
    };
  
    fetchVerificationStatus();
  }, [user]);

  const handleConnectX = () => {
    setModalOpen(false);
    initiateConnection('twitter');
  };

  return (
    <div className="settings-container">
      <h3 className="settings-title">Connections Settings</h3>
      <div className="settings-form">
        <div className="settings-section grid grid-cols-2 gap-12">
          <div className="connection-item">
            <label className="connection-label">X Connection</label>
            <button
              onClick={() => setModalOpen(true)}
              className={`connection-button connection-x flex items-center justify-center gap-2 ${
                verificationStatus.x ? 'bg-green-600/20 border-green-600' : ''
              }`}
              type="button"
              disabled={verificationStatus.x}
            >
              <Icons.BrandX size="xl" />
              {verificationStatus.x ? 'Connected' : 'Connect X'}
              {verificationStatus.x && (
                <span className="ml-auto text-green-400">
                  <Icons.CopyCheck size="sm" />
                </span>
              )}
            </button>
          </div>
          <div className="connection-item">
            <label className="connection-label">Discord Connection</label>
            <button
              className={`connection-button connection-discord flex items-center justify-center gap-2 ${
                verificationStatus.discord ? 'bg-green-600/20 border-green-600' : ''
              }`}
              type="button"
              disabled={verificationStatus.discord}
            >
              <Icons.BrandDiscord size="xl" />
              {verificationStatus.discord ? 'Connected' : 'Connect Discord'}
              {verificationStatus.discord && (
                <span className="ml-auto text-green-400">
                  <Icons.CopyCheck size="sm" />
                </span>
              )}
            </button>
          </div>
          <div className="connection-item">
            <label className="connection-label">Twitch Connection</label>
            <button
              className={`connection-button connection-twitch flex items-center justify-center gap-2 ${
                verificationStatus.twitch ? 'bg-green-600/20 border-green-600' : ''
              }`}
              type="button"
              disabled={verificationStatus.twitch}
            >
              <Icons.BrandTwitch size="xl" />
              {verificationStatus.twitch ? 'Connected' : 'Connect Twitch'}
              {verificationStatus.twitch && (
                <span className="ml-auto text-green-400">
                  <Icons.CopyCheck size="sm" />
                </span>
              )}
            </button>
          </div>
          <div className="connection-item">
            <label className="connection-label">Kick Connection</label>
            <button
              className={`connection-button connection-kick flex items-center justify-center gap-2 ${
                verificationStatus.kick ? 'bg-green-600/20 border-green-600' : ''
              }`}
              type="button"
              disabled={verificationStatus.kick}
            >
              <Icons.BrandKick size="xl" />
              {verificationStatus.kick ? 'Connected' : 'Connect Kick'}
              {verificationStatus.kick && (
                <span className="ml-auto text-green-400">
                  <Icons.CopyCheck size="sm" />
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Icons.BrandX size="2xl" />
          </div>
          <h3 className="text-xl font-bold mb-4">
            Connect your X account
          </h3>
          <p className="mb-6 text-foreground/80">
            Connecting your X account will help verify your identity.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 rounded bg-background-300 text-foreground hover:bg-background-200"
            >
              Cancel
            </button>
            <button
              onClick={handleConnectX}
              className="px-4 py-2 rounded bg-apeRed text-white hover:bg-apeRed/80"
            >
              Connect X
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}