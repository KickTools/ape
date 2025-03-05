// src/components/admin/giveaways/GiveawayForm.jsx
"use client";

import { useState } from "react";

export default function GiveawayForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    type: "rain",
    winnersCount: 1,
    verificationLevel: 2,
    allowPreviousWinners: true,
    keyword: "",
    followLength: 0,
    subscribersOnly: false,
    startDate: "", // New: for ticket type
    endDate: "",   // New: for ticket type
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
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
          required
        />
      </div>
      <div className="giveaway-form-section">
        <label className="giveaway-form-label">Type</label>
        <select name="type" value={formData.type} onChange={handleChange} className="giveaway-form-select">
          <option value="rain">Banana Blitz</option>
          <option value="chat">SquadW Chat</option>
          <option value="ticket">Primal Pass Pick</option>
        </select>
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
      {formData.type === "chat" && (
        <>
          <div className="giveaway-form-section">
            <label className="giveaway-form-label">Keyword</label>
            <input
              name="keyword"
              value={formData.keyword}
              onChange={handleChange}
              placeholder="e.g., SquadW"
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
        </>
      )}
      {formData.type === "ticket" && (
        <>
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
        </>
      )}
      <button type="submit" className="giveaway-submit-button">
        Launch Giveaway
      </button>
    </form>
  );
}