// src/components/admin/giveaways/ChatGiveawayForm.jsx
"use client";

import { useState } from "react";
import Button from "@/components/elements/Button";

export default function ChatGiveawayForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: "",
    type: "chat",
    winnersCount: 1,
    keyword: "",
    followLength: 0,
    subscribersOnly: false,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
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
          placeholder="SquadW Chat Giveaway"
          required
        />
      </div>
      <div className="giveaway-form-section">
        <label className="giveaway-form-label">Keyword</label>
        <input
          name="keyword"
          value={formData.keyword}
          onChange={handleChange}
          placeholder="e.g., SquadW"
          className="giveaway-form-input"
          required
        />
        <p className="text-sm text-foreground-600 mt-1">
          Viewers must type this keyword in chat to enter
        </p>
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
        <label className="giveaway-form-label">Min Follow Length (days)</label>
        <input
          name="followLength"
          type="number"
          min="0"
          value={formData.followLength}
          onChange={handleChange}
          className="giveaway-form-input"
        />
      </div>
      <div className="giveaway-form-section">
        <label className="giveaway-form-checkbox">
          <input
            name="subscribersOnly"
            type="checkbox"
            checked={formData.subscribersOnly}
            onChange={handleChange}
          />
          <span className="giveaway-form-label">Subscribers Only</span>
        </label>
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
          color="apeBlue"
          radius="md"
          size="small"
        >
          Next: Set Up Chat
        </Button>
      </div>
    </form>
  );
}