// src/contexts/GiveawayContext.jsx
"use client";

import { createContext, useState, useContext } from "react";

const GiveawayContext = createContext();

export function GiveawayProvider({ children }) {
  const [activeGiveaways, setActiveGiveaways] = useState([]);
  const [selectedGiveaway, setSelectedGiveaway] = useState(null);
  const [editModal, setEditModal] = useState(false);

  const value = {
    activeGiveaways,
    setActiveGiveaways,
    selectedGiveaway,
    setSelectedGiveaway,
    editModal,
    setEditModal,
  };

  return (
    <GiveawayContext.Provider value={value}>
      {children}
    </GiveawayContext.Provider>
  );
}

export function useGiveaway() {
  const context = useContext(GiveawayContext);
  if (!context) {
    throw new Error("useGiveaway must be used within a GiveawayProvider");
  }
  return context;
}