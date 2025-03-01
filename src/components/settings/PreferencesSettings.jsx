// src/components/settings/PreferencesSettings.jsx
import { useState, useEffect } from "react";
import { useToast } from "@/contexts/ToastContext";
import { fetchViewerFormData, submitPreferencesSettings } from "@/lib/dataAPI";

export default function PreferencesSettings({ user }) {
  const [formData, setFormData] = useState({
    language: "en", // Default to English
  });
  const [initialFormData, setInitialFormData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const toast = useToast();

  const userID = user?.mainUserId || user?.id;
  const platform = user?.platform;

  // Fetch existing form data when component mounts
  useEffect(() => {
    async function loadUserData() {
      if (!user) return;

      try {
        setIsLoading(true);

        if (!userID) {
          throw new Error("User ID not available");
        }

        const data = await fetchViewerFormData(platform, userID);

        if (data && data.language) {
          const newFormData = {
            language: data.language,
          };
          setFormData(newFormData);
          setInitialFormData(newFormData);
        }

      } catch (error) {
        console.error("Error fetching preferences data:", error);
        toast.error("Failed to load your preferences");
      } finally {
        setIsLoading(false);
      }
    }

    loadUserData();
  }, [user, toast]);

  // Check for changes
  useEffect(() => {
    if (!isLoading) {
      const changed = formData.language !== initialFormData.language;
      setHasChanges(changed);
    }
  }, [formData, initialFormData, isLoading]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!hasChanges) return;

    try {
      setIsSaving(true);

      const payload = {
        viewer: user.twitch?.user_id || userID,
        language: formData.language,
      };

      await submitPreferencesSettings(payload);

      setInitialFormData({ ...formData });
      setHasChanges(false);
      toast.success("Preferences saved successfully!");

    } catch (error) {
      console.error("Error saving preferences:", error);
      toast.error(error.message || "Failed to save preferences");
    } finally {
      setIsSaving(false);
    }
  };

  // Language options (you can expand this list as needed)
  const languageOptions = [
    { value: "en", label: "English" },
    { value: "es", label: "Spanish" },
    // Add more languages here, e.g., { value: "fr", label: "French" }
  ];

  return (
    <div className="settings-container">
      <h3 className="settings-title">Preferences Settings</h3>
      {isLoading ? (
        <div className="loading-spinner">Loading your preferences...</div>
      ) : (
        <form className="settings-form" onSubmit={handleSubmit}>
          <div className="settings-section">
            <h5 className="section-title">Regional</h5>
            <div className="form-row">
              <label className="form-label">Language</label>
              <select
                name="language"
                className="form-select"
                value={formData.language}
                onChange={handleChange}
              >
                {languageOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <hr className="section-divider" />
          <div>
            <button
              type="submit"
              className={`save-button ${!hasChanges ? 'disabled' : ''}`}
              disabled={!hasChanges || isSaving}
            >
              {isSaving ? 'Saving...' : 'Save Preferences'}
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