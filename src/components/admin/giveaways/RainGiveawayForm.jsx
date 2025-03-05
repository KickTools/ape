// src/components/admin/giveaways/RainGiveawayForm.jsx
"use client";

import { useState } from "react";
import { createGiveaway, drawGiveawayWinners, getAllGiveaways } from "@/lib/giveawayAPI";
import { useGiveaway } from "@/contexts/GiveawayContext";
import { useToast } from "@/contexts/ToastContext";
import Button from "@/components/elements/Button";

export default function RainGiveawayForm({ onSubmit, onCancel }) {
  const [isLoading, setIsLoading] = useState(false);
  const { setActiveGiveaways } = useGiveaway();
  const toast = useToast();
  const [formData, setFormData] = useState({
    title: "",
    type: "rain",
    winnersCount: 1,
    verificationLevel: 2,
    allowPreviousWinners: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "number" ? parseInt(value, 10) : value,
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
        winnersCount: formData.winnersCount,
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
    } finally {
      setIsLoading(false);
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
        />
      </div>
      <div className="giveaway-form-section">
        <label className="giveaway-form-label">Number of Winners</label>
        <input
          name="winnersCount"
          type="number"
          min="1"
          value={formData.winnersCount}
          onChange={handleChange}
          className="giveaway-form-input"
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
        />
      </div>
      <div className="giveaway-form-section">
        <label className="giveaway-form-checkbox">
          <input
            name="allowPreviousWinners"
            type="checkbox"
            checked={formData.allowPreviousWinners}
            onChange={handleChange}
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