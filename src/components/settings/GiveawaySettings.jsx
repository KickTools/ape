// src/components/settings/GiveawaySettings.jsx
export default function GiveawaySettings({ user }) {
    return (
      <div className="settings-container">
        <h3 className="settings-title">Giveaway Settings</h3>
        <form className="settings-form">
          <div className="settings-section">
            <h5 className="section-title">Crypto Options</h5>
            <div className="form-row">
              <label className="form-label">BTC Address</label>
              <input type="text" className="form-input" placeholder="Your BTC Address" />
            </div>
            <div className="form-row">
              <label className="form-label">ETH Address</label>
              <input type="text" className="form-input" placeholder="Your ETH Address" />
            </div>
          </div>
          <hr className="section-divider" />
          <div className="settings-section">
            <h5 className="section-title">Contact Options</h5>
            <div className="form-row">
              <label className="form-label">Platform</label>
              <select className="form-select">
                <option>Email</option>
                <option defaultValue>Twitter/X</option>
                <option>Discord</option>
                <option>Telegram</option>
                <option>Instagram</option>
              </select>
            </div>
            <div className="form-row">
              <label className="form-label">Contact Info</label>
              <input
                type="text"
                className="form-input"
                placeholder="Your contact information"
              />
            </div>
          </div>
  
          <hr className="section-divider" />
          <div>
            <button type="submit" className="save-button">
              Save Preferences
            </button>
          </div>
        </form>
      </div>
    );
  }