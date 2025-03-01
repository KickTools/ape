// Example usage in NotificationsSettings.jsx
import Checkbox from '../elements/Checkbox';

export default function NotificationsSettings({ user }) {
  return (
    <div className="settings-container">
      <h3 className="settings-title">Notifications Settings</h3>
      <form className="settings-form">
        <div className="settings-section">
          <div className="form-row">
            <label className="form-label">Email Notifications</label>
            <Checkbox color="apeRed">Enable</Checkbox>
          </div>
          <div className="form-row">
            <label className="form-label">Push Notifications</label>
            <Checkbox color="apeBlue">Enable</Checkbox>
          </div>
        </div>
        <hr className="section-divider" />
        <div>
          <button type="submit" className="save-button">
            Save Notifications
          </button>
        </div>
      </form>
    </div>
  );
}