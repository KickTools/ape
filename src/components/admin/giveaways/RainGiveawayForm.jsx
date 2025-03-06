// src/components/admin/giveaways/RainGiveawayForm.jsx
"use client";

import { useState, useEffect } from "react";
import { createGiveaway, drawGiveawayWinners, getAllGiveaways, getEligibleViewerCount } from "@/lib/giveawayAPI";
import { useGiveaway } from "@/contexts/GiveawayContext";
import { useToast } from "@/contexts/ToastContext";
import Button from "@/components/elements/Button";

export default function RainGiveawayForm({ onSubmit, onCancel }) {
  const [isLoading, setIsLoading] = useState(false);
  const [eligibleViewerCount, setEligibleViewerCount] = useState(0);
  const { setActiveGiveaways } = useGiveaway();
  const toast = useToast();
  const [formData, setFormData] = useState({
    title: "",
    type: "rain",
    winnersCount: 1,
    verificationLevel: 2,
    allowPreviousWinners: true,
  });

  // Fetch eligible viewer count when verification level changes
  useEffect(() => {
    const fetchEligibleViewerCount = async () => {
      try {
        const { data } = await getEligibleViewerCount(formData.verificationLevel);
        setEligibleViewerCount(data.count);
      } catch (error) {
        console.error("Error fetching eligible viewer count:", error);
        toast.error("Failed to fetch eligible viewer count");
      }
    };

    fetchEligibleViewerCount();
  }, [formData.verificationLevel]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : type === "number" ? parseInt(value, 10) : value;

    // Validate winners count against eligible viewers
    if (name === "winnersCount" && newValue > eligibleViewerCount) {
      toast.error(`Cannot select more winners than eligible viewers (${eligibleViewerCount})`);
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // First create the giveaway
      const { data: createdGiveaway } = await createGiveaway(formData);
      
      // Immediately draw winners for rain giveaways
      const { data: drawResult } = await drawGiveawayWinners(createdGiveaway.id, {
        winnersCount: Math.min(formData.winnersCount, eligibleViewerCount),
        verificationLevel: formData.verificationLevel,
        allowPreviousWinners: formData.allowPreviousWinners,
      });
      
      // Refetch all giveaways to ensure consistent state
      const { data: updatedGiveaways } = await getAllGiveaways();
      setActiveGiveaways(updatedGiveaways);
      
      // Pass the results back to parent component
      onSubmit({
        ...drawResult.giveaway,
        winners: drawResult.winners,
        type: "rain"
      });
      
      toast.success("Banana Blitz completed successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to create Banana Blitz");
      setIsLoading(false); // Make sure to reset loading state on error
    }
  };

  return (
    <form onSubmit={handleSubmit} className="giveaway-form">
      <div className="giveaway-form-section">
        <label className="giveaway-form-label">Title</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="giveaway-form-input"
          placeholder="Banana Blitz #1"
          required
          disabled={isLoading}
        />
      </div>
      <div className="giveaway-form-section">
        <label className="giveaway-form-label">
          Number of Winners (Max: {eligibleViewerCount})
        </label>
        <input
          name="winnersCount"
          type="number"
          min="1"
          max={eligibleViewerCount}
          value={formData.winnersCount}
          onChange={handleChange}
          className="giveaway-form-input"
          disabled={isLoading}
        />
      </div>
      <div className="giveaway-form-section">
        <label className="giveaway-form-label">Verification Level (2-5)</label>
        <input
          name="verificationLevel"
          type="number"
          min="2"
          max="5"
          value={formData.verificationLevel}
          onChange={handleChange}
          className="giveaway-form-input"
          disabled={isLoading}
        />
      </div>
      <div className="giveaway-form-section">
        <label className="giveaway-form-checkbox">
          <input
            name="allowPreviousWinners"
            type="checkbox"
            checked={formData.allowPreviousWinners}
            onChange={handleChange}
            disabled={isLoading}
          />
          <span className="giveaway-form-label">Allow Previous Winners (1 vs. 2 entries)</span>
        </label>
      </div>
      <div className="giveaway-form-buttons mt-6 flex justify-end space-x-3">
        <Button 
          type="button"
          onClick={onCancel}
          color="background-400"
          radius="md"
          size="small"
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button 
          type="submit"
          color="apeRed"
          radius="md"
          size="small"
          isLoading={isLoading}
        >
          Launch Blitz
        </Button>
      </div>
    </form>
  );
}