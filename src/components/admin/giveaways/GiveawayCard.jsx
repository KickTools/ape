// src/components/admin/giveaways/GiveawayCard.jsx
"use client";

import { useState, useEffect } from "react";
import {
  updateGiveawayStatus,
  drawGiveawayWinners,
  getAllGiveaways,
  getViewersByIds
} from "@/lib/giveawayAPI";
import { useGiveaway } from "@/contexts/GiveawayContext";
import { useToast } from "@/contexts/ToastContext";
import Button from "@/components/elements/Button";
import DrawWinnerModal from "./DrawWinnerModal";

export default function GiveawayCard({ giveaway }) {
  const [winnerNames, setWinnerNames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [showDrawModal, setShowDrawModal] = useState(false);
  const { setSelectedGiveaway, setActiveGiveaways } = useGiveaway();
  const toast = useToast();

  useEffect(() => {
    // Fetch winner names when giveaway has winners and no names are loaded
    if (
      giveaway.winners &&
      giveaway.winners.length > 0 &&
      winnerNames.length === 0
    ) {
      const fetchWinnerNames = async () => {
        try {
          const { data: winners } = await getViewersByIds(giveaway.winners);
          setWinnerNames(winners);
        } catch (error) {
          toast.error("Failed to load winner names");
        }
      };
      fetchWinnerNames();
    }
  }, [giveaway.winners, winnerNames.length, toast]);

  const handleStatusChange = async (status) => {
    setIsLoading(true);
    try {
      await updateGiveawayStatus(giveaway.id, status);
      // Refetch all giveaways to ensure consistent state
      const { data: allGiveaways } = await getAllGiveaways();
      setActiveGiveaways(allGiveaways);

      toast.warning(
        `Giveaway ${status === "closed" ? "entries closed" : "completed"}!`
      );
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrawWinners = () => {
    if (giveaway.type === "ticket") {
      setShowDrawModal(true);
    } else {
      handleBatchDrawWinners();
    }
  };

  const handleBatchDrawWinners = async () => {
    setIsLoading(true);
    try {
      const { data } = await drawGiveawayWinners(giveaway.id, {
        winnersCount: giveaway.winnersCount,
        verificationLevel: giveaway.verificationLevel,
        allowPreviousWinners: giveaway.allowPreviousWinners
      });

      // Refetch all giveaways to ensure consistent state
      const { data: allGiveaways } = await getAllGiveaways();
      setActiveGiveaways(allGiveaways);

      toast.success(`Winners drawn: ${data.winners.length} selected!`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWinnerDrawn = (updatedGiveaway) => {
    // Update local state with new winner information
    if (updatedGiveaway) {
      // Refresh winner names
      const fetchWinnerNames = async () => {
        try {
          const { data: winners } = await getViewersByIds(updatedGiveaway.winners);
          setWinnerNames(winners);
          
          // Refresh all giveaways
          const { data: allGiveaways } = await getAllGiveaways();
          setActiveGiveaways(allGiveaways);
        } catch (error) {
          toast.error("Failed to refresh after drawing winner");
        }
      };
      fetchWinnerNames();
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case "rain":
        return "Banana Blitz";
      case "chat":
        return "SquadW Chat";
      case "ticket":
        return "Primal Pass Pick";
      default:
        return type;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-apeGreen-500/10 text-apeGreen";
      case "closed":
        return "bg-apeOrange-500/10 text-apeOrange";
      case "completed":
        return "bg-apeBlue-500/10 text-apeBlue";
      case "canceled":
        return "bg-apeRed-500/10 text-apeRed";
      default:
        return "text-foreground";
    }
  };

  const formattedDate = (dateString) => {
    const date = new Date(dateString);
  
    if (isNaN(date.getTime())) {
      return "Invalid Date"; // Handle invalid date strings
    }
  
    const options = {
      weekday: 'short', // Mon
      month: 'short',   // Jan
      day: 'numeric',   // 5
      year: 'numeric',  // 1995
    };
  
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <>
      <div className="giveaway-card">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="giveaway-card-title text-xl font-bold">
              {giveaway.title}
            </h3>
            <p className="giveaway-card-date">{formattedDate(giveaway.createdAt)}</p>
            <div className="flex items-center space-x-3 mt-1">
              <span className="text-sm bg-apeRed-500/10 text-apeRed px-2 py-1 rounded">
                {getTypeLabel(giveaway.type)}
              </span>
              <span
                className={`text-sm px-2 py-1 rounded ${getStatusColor(
                  giveaway.status
                )}`}
              >
                {giveaway.status.charAt(0).toUpperCase() +
                  giveaway.status.slice(1)}
              </span>
            </div>
          </div>
          <Button
            onClick={() => setExpanded(!expanded)}
            color="background-600"
            radius="full"
            size="small"
          >
            {expanded ? "↑" : "↓"}
          </Button>
        </div>

        {expanded && (
          <>
            <div className="giveaway-card-details text-sm space-y-2 my-4">

              {giveaway.type === "ticket" && (
                <>
                  <p>
                    Start:{" "}
                    {giveaway.startDate
                      ? new Date(giveaway.startDate).toLocaleString()
                      : "N/A"}
                  </p>
                  <p>
                    End:{" "}
                    {giveaway.endDate
                      ? new Date(giveaway.endDate).toLocaleString()
                      : "N/A"}
                  </p>
                  {giveaway.entrants && (
                    <p>Entries: {giveaway.entrants.length}</p>
                  )}
                  {giveaway.winners && giveaway.winners.length > 0 && (
                    <p>Winners Drawn: {giveaway.winners.length}</p>
                  )}
                </>
              )}

              {giveaway.winners && giveaway.winners.length > 0 && (
                <div>
                  <p className="flex font-semibold mt-3">Winners:</p>
                  {winnerNames.length > 0 ? (
                    <p className="flex flex-wrap gap-2">
                      {winnerNames.map((winner, index) => (
                        <span key={winner.id}>
                          {winner.name}
                          {index < winnerNames.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </p>
                  ) : (
                    <p className="text-foreground-600">Loading winners...</p>
                  )}
                </div>
              )}
            </div>

            <div className="giveaway-card-buttons flex flex-wrap gap-2 mt-4">
              <Button
                onClick={() => setSelectedGiveaway(giveaway)}
                color="apeRed"
                size="small"
                radius="md"
              >
                Edit
              </Button>
              {giveaway.status === "active" && (
                <Button
                  onClick={() => handleStatusChange("closed")}
                  color="apeBlue"
                  size="small"
                  radius="md"
                  isLoading={isLoading}
                >
                  Close Entries
                </Button>
              )}
              {giveaway.status === "closed" && (
                <Button
                  onClick={handleDrawWinners}
                  color="apeGreen"
                  size="small"
                  radius="md"
                  isLoading={isLoading}
                >
                  Draw Winners
                </Button>
              )}
              <Button
                onClick={() => handleStatusChange("canceled")}
                color="apeRed"
                size="small"
                radius="md"
                isLoading={isLoading}
              >
                Cancel
              </Button>
            </div>
          </>
        )}
      </div>

      {showDrawModal && (
        <DrawWinnerModal 
          giveaway={giveaway} 
          onClose={() => setShowDrawModal(false)} 
          onWinnerDrawn={handleWinnerDrawn}
        />
      )}
    </>
  );
}