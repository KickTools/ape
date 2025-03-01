// src/components/settings/NotificationsSettings.jsx
import { useState, useEffect } from "react";
import { useToast } from "@/contexts/ToastContext";
import { fetchViewerFormData, submitNotificationsSettings } from "@/lib/dataAPI";
import Checkbox from '../elements/Checkbox';

export default function NotificationsSettings({ user }) {
  const [formData, setFormData] = useState({
    emailNotifications: false,
    pushNotifications: false,
  });
  const [initialFormData, setInitialFormData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const toast = useToast();

  const userID = user?.mainUserId || user?.id;
  const platform = user?.platform;

  useEffect(() => {
    async function loadUserData() {
      if (!user) return;

      try {
        setIsLoading(true);

        if (!userID) {
          throw new Error("User ID not available");
        }

        const data = await fetchViewerFormData(platform, userID);

        if (data && typeof data.notifications === "boolean") {
          const newFormData = {
            emailNotifications: data.notifications,
            pushNotifications: data.notifications,
          };
          setFormData(newFormData);
          setInitialFormData(newFormData);
        }

      } catch (error) {
        console.error("Error fetching notifications data:", error);
        toast.error("Failed to load your notification settings");
      } finally {
        setIsLoading(false);
      }
    }

    loadUserData();
  }, [user, toast]);

  useEffect(() => {
    if (!isLoading) {
      const changed =
        formData.emailNotifications !== initialFormData.emailNotifications ||
        formData.pushNotifications !== initialFormData.pushNotifications;
      setHasChanges(changed);
    }
  }, [formData, initialFormData, isLoading]);

  // Updated handleChange to work with Checkbox's boolean value
  const handleChange = (name) => (value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!hasChanges) return;

    try {
      setIsSaving(true);

      const notifications = formData.emailNotifications || formData.pushNotifications;

      const payload = {
        viewer: user.twitch?.user_id || userID,
        notifications,
      };

      await submitNotificationsSettings(payload);

      setInitialFormData({ ...formData });
      setHasChanges(false);
      toast.success("Notification settings saved successfully!");

    } catch (error) {
      console.error("Error saving notifications:", error);
      toast.error(error.message || "Failed to save notification settings");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="settings-container">
      <h3 className="settings-title">Notifications Settings</h3>
      {isLoading ? (
        <div className="loading-spinner">Loading your settings...</div>
      ) : (
        <form className="settings-form" onSubmit={handleSubmit}>
          <div className="settings-section">
            <div className="section-details">
              <h5 className="section-title">Turn on or off Notifications</h5>
              <p className="section-description">
                Choose how you want to receive notifications for events, giveaways, community news and more
              </p>
            </div>
            <div className="form-row">
              <label className="form-label">Email Notifications</label>
              <Checkbox
                name="emailNotifications"
                color="apeRed"
                checked={formData.emailNotifications}
                onChange={handleChange("emailNotifications")}
              >
                Enable
              </Checkbox>
            </div>
          </div>
          <hr className="section-divider" />
          <div>
            <button
              type="submit"
              className={`save-button ${!hasChanges ? 'disabled' : ''}`}
              disabled={!hasChanges || isSaving}
            >
              {isSaving ? 'Saving...' : 'Save Notifications'}
            </button>
            {hasChanges && (
              <p className="text-sm text-apeRed mt-2">
                You have unsaved changes
              </p>
            )}
          </div>
        </form>
      )}
    </div>
  );
}