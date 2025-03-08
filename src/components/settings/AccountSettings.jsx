// src/components/settings/AccountSettings.jsx
export default function AccountSettings({ user, kickProfile, twitchProfile, xProfile }) {
  const kickUsername = kickProfile?.username || null;
  const twitchUsername = twitchProfile?.display_name || null;
  const xUsername = xProfile?.username || null;

  return (
    <div className="settings-container">
      <h3 className="settings-title">Account Settings</h3>
      <form className="settings-form">
        <div className="settings-section">
          <h5 className="section-title">Platforms</h5>
          <div className="form-row">
            <label className="form-label">Kick</label>
            <input
              type="text"
              value={kickUsername || "Not connected"}
              disabled
              className="form-input-disabled"
            />
          </div>
          <div className="form-row">
            <label className="form-label">Twitch</label>
            <input
              type="text"
              value={twitchUsername || "Not connected"}
              disabled
              className="form-input-disabled"
            />
          </div>
          <div className="form-row">
            <label className="form-label">X/Twitter</label>
            <input
              type="text"
              value={xUsername || "Not connected"}
              disabled
              className="form-input-disabled"
            />
          </div>
          <div className="form-row">
            <label className="form-label">Discord</label>
            <input
              type="text"
              value={user.discordUsername || "Not connected"}
              disabled
              className="form-input-disabled"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
