// src/components/admin/giveaways/GiveawayFilters.jsx
"use client";

import { useState } from "react";
import Button from "@/components/elements/Button";

export default function GiveawayFilters({ filters, onFilterChange }) {
  const [searchQuery, setSearchQuery] = useState(filters.searchQuery || "");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onFilterChange({ searchQuery });
  };

  return (
    <div className="content-width bg-foreground-800/5 p-4 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Status filter */}
        <div className="filter-group">
          <label className="text-sm text-foreground-600 mb-2 block">Status</label>
          <div className="flex space-x-2">
            {["all", "active", "closed", "completed"].map((status) => (
              <Button
                key={status}
                onClick={() => onFilterChange({ status })}
                color={filters.status === status ? "apeRed" : "foreground-950"}
                radius="md"
                size="small"
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Type filter */}
        <div className="filter-group">
          <label className="text-sm text-foreground-600 mb-2 block">Type</label>
          <div className="flex space-x-2">
            {["all", "rain", "chat", "ticket"].map((type) => (
              <Button
                key={type}
                onClick={() => onFilterChange({ type })}
                color={filters.type === type ? "apeRed" : "foreground-950"}
                radius="md"
                size="small"
              >
                {type === "all" ? "All" : 
                 type === "rain" ? "Blitz" : 
                 type === "chat" ? "Chat" : "Raffle"}
              </Button>
            ))}
          </div>
        </div>

        {/* Search filter */}
        <div className="filter-group">
          <label className="text-sm text-foreground-600 mb-2 block">Search</label>
          <form onSubmit={handleSearchSubmit} className="flex">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title..."
              className="flex-grow giveaway-form-input mr-2"
            />
            <Button
              type="submit"
              color="apeRed"
              radius="md"
              size="small"
            >
              Search
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}