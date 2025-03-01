// src/components/settings/GiveawaySettings.jsx
import { useState, useEffect } from "react";
import { useToast } from "@/contexts/ToastContext";
import { 
  fetchViewerFormData, 
  submitGiveawaySettings, 
  parseContactAddress, 
  formatContactAddress 
} from "@/lib/dataAPI";

export default function GiveawaySettings({ user }) {
  const [formData, setFormData] = useState({
    bitcoinAddress: "",
    ethAddress: "", // Added ethAddress
    contactPlatform: "Twitter/X", // Default platform
    contactAddress: ""
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
        
        if (data) {
          const { platform, address } = parseContactAddress(data.contactAddress);
          
          const newFormData = {
            bitcoinAddress: data.bitcoinAddress || "",
            ethAddress: data.ethAddress || "", // Added ethAddress
            contactPlatform: platform,
            contactAddress: address
          };
          
          setFormData(newFormData);
          setInitialFormData(newFormData);
        }
        
      } catch (error) {
        console.error("Error fetching form data:", error);
        toast.error("Failed to load your giveaway settings");
      } finally {
        setIsLoading(false);
      }
    }

    loadUserData();
  }, [user]);

  // Check for changes
  useEffect(() => {
    if (!isLoading) {
      const changed = 
        formData.bitcoinAddress !== initialFormData.bitcoinAddress ||
        formData.ethAddress !== initialFormData.ethAddress || // Added ethAddress
        formData.contactPlatform !== initialFormData.contactPlatform ||
        formData.contactAddress !== initialFormData.contactAddress;
      
      setHasChanges(changed);
    }
  }, [formData, initialFormData, isLoading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!hasChanges) return;
    
    try {
      setIsSaving(true);
      
      const contactAddressFormatted = formatContactAddress(
        formData.contactPlatform, 
        formData.contactAddress
      );
      
      const payload = {
        viewer: user.twitch?.user_id || user.id,
        bitcoinAddress: formData.bitcoinAddress,
        ethAddress: formData.ethAddress, // Added ethAddress
        contactAddress: contactAddressFormatted
      };
      
      await submitGiveawaySettings(payload);
      
      setInitialFormData({ ...formData });
      setHasChanges(false);
      toast.success("Giveaway settings saved successfully!");
      
    } catch (error) {
      console.error("Error saving form data:", error);
      toast.error(error.message || "Failed to save settings");
    } finally {
      setIsSaving(false);
    }
  };

  const platformOptions = [
    "Email",
    "Twitter/X",
    "Discord",
    "Telegram",
    "Instagram"
  ];

  return (
    <div className="settings-container">
      <h3 className="settings-title">Giveaway Settings</h3>
      {isLoading ? (
        <div className="loading-spinner">Loading your settings...</div>
      ) : (
        <form className="settings-form" onSubmit={handleSubmit}>
          <div className="settings-section">
            <h5 className="section-title">Crypto Options</h5>
            <div className="form-row">
              <label className="form-label">BTC Address</label>
              <input
                type="text"
                name="bitcoinAddress"
                className="form-input"
                placeholder="Your BTC Address"
                value={formData.bitcoinAddress}
                onChange={handleChange}
              />
            </div>
            <div className="form-row">
              <label className="form-label">ETH Address</label>
              <input
                type="text"
                name="ethAddress"
                className="form-input"
                placeholder="Your ETH Address (optional)"
                value={formData.ethAddress}
                onChange={handleChange}
              />
            </div>
          </div>
          <hr className="section-divider" />
          <div className="settings-section">
            <h5 className="section-title">Contact Options</h5>
            <div className="form-row">
              <label className="form-label">Platform</label>
              <select
                name="contactPlatform"
                className="form-select"
                value={formData.contactPlatform}
                onChange={handleChange}
              >
                {platformOptions.map((platform) => (
                  <option key={platform} value={platform}>
                    {platform}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-row">
              <label className="form-label">Contact Info</label>
              <input
                type="text"
                name="contactAddress"
                className="form-input"
                placeholder="Your contact information"
                value={formData.contactAddress}
                onChange={handleChange}
              />
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