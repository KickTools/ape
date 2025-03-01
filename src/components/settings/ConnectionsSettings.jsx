// src/components/settings/ConnectionsSettings.jsx
import Icons from "@/assets/icons";

export default function ConnectionsSettings({ user }) {
  return (
    <div className="settings-container">
      <h3 className="settings-title">Connections Settings</h3>
      <form className="settings-form">
        <div className="settings-section grid grid-cols-2 gap-12">
          <div className="connection-item">
            <label className="connection-label">X Connection</label>
            <button className="connection-button connection-x flex items-center justify-center gap-2">
              <Icons.BrandX size="xl" /> Connect X
            </button>
          </div>
          <div className="connection-item">
            <label className="connection-label">Discord Connection</label>
            <button className="connection-button connection-discord flex items-center justify-center gap-2">
              <Icons.BrandDiscord size="xl" /> Connect Discord
            </button>
          </div>
          <div className="connection-item">
            <label className="connection-label">Twitch Connection</label>
            <button className="connection-button connection-twitch flex items-center justify-center gap-2">
              <Icons.BrandTwitch size="xl" /> Connect Twitch
            </button>
          </div>
          <div className="connection-item">
            <label className="connection-label">Kick Connection</label>
            <button className="connection-button connection-kick flex items-center justify-center gap-2">
              <Icons.BrandKick size="xl" /> Connect Kick
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}