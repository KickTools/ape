// src/components/admin/giveaways/TicketGiveawayForm.jsx
"use client";

import { useState } from "react";
import { createGiveaway, getAllGiveaways } from "@/lib/giveawayAPI";
import { useGiveaway } from "@/contexts/GiveawayContext";
import { useToast } from "@/contexts/ToastContext";
import Button from "@/components/elements/Button";

export default function TicketGiveawayForm({ onSubmit, onCancel }) {
  const [isLoading, setIsLoading] = useState(false);
  const { setActiveGiveaways } = useGiveaway();
  const toast = useToast();
  const [formData, setFormData] = useState({
    title: "",
    type: "ticket",
    winnersCount: 1,
    verificationLevel: 2,
    allowPreviousWinners: true,
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Create the ticket giveaway
      const { data: createdGiveaway } = await createGiveaway(formData);
      
      // Refetch all giveaways to ensure consistent state
      const { data: updatedGiveaways } = await getAllGiveaways();
      setActiveGiveaways(updatedGiveaways);
      
      // Pass the results back to parent component
      onSubmit({
        ...createdGiveaway,
        type: "ticket"
      });
      
      toast.success("Primal Pass Pick created successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to create Primal Pass Pick");
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
          placeholder="Monthly Membership Raffle"
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="giveaway-form-section">
          <label className="giveaway-form-label">Start Date</label>
          <input
            name="startDate"
            type="datetime-local"
            value={formData.startDate}
            onChange={handleChange}
            className="giveaway-form-input"
            required
          />
        </div>
        <div className="giveaway-form-section">
          <label className="giveaway-form-label">End Date</label>
          <input
            name="endDate"
            type="datetime-local"
            value={formData.endDate}
            onChange={handleChange}
            className="giveaway-form-input"
            required
          />
        </div>
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
          <span className="giveaway-form-label">Allow Previous Winners</span>
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
          Launch Raffle
        </Button>
      </div>
    </form>
  );
}