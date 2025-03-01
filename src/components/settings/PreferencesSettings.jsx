// src/components/settings/PreferencesSettings.jsx
export default function PreferencesSettings({ user }) {
  return (
    <div className="settings-container">
      <h3 className="settings-title">Preferences Settings</h3>
      <h5 className="section-title">Regional</h5>
      <form className="settings-form">
        <div className="settings-section">
          <div className="form-row">
            <label className="form-label">Language</label>
            <select className="form-select">
              <option>English</option>
              <option>Spanish</option>
            </select>
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