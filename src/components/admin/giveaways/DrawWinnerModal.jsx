"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/contexts/ToastContext";
import Button from "@/components/elements/Button";
import { drawSingleGiveawayWinner, getViewersByIds } from "@/lib/giveawayAPI";

export default function DrawWinnerModal({ giveaway, onClose, onWinnerDrawn }) {
  const [isDrawing, setIsDrawing] = useState(false);
  const [winner, setWinner] = useState(null);
  const [animation, setAnimation] = useState(false);
  const [remainingWinners, setRemainingWinners] = useState(
    (giveaway.winnersCount || 1) - (giveaway.winners?.length || 0)
  );
  const toast = useToast();

  const handleDrawWinner = async () => {
    setIsDrawing(true);
    setAnimation(true);
    
    try {
      // Simulate animation timing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const { data } = await drawSingleGiveawayWinner(giveaway.id, {
        verificationLevel: giveaway.verificationLevel || 2,
        allowPreviousWinners: giveaway.allowPreviousWinners || false
      });

      if (data.winner) {
        const { data: winnerData } = await getViewersByIds([data.winner]);
        setWinner(winnerData[0]);
        setRemainingWinners(prev => Math.max(0, prev - 1));
        
        if (onWinnerDrawn) {
          onWinnerDrawn(data.giveaway);
        }
        
        // If this completed the giveaway, show a message
        if (data.isComplete) {
          toast.success("All winners drawn! Giveaway completed.");
        }
      } else {
        toast.error("No eligible winners found");
      }
    } catch (error) {
      toast.error(error.message || "Failed to draw winner");
    } finally {
      setIsDrawing(false);
      setAnimation(false);
    }
  };

  const handleComplete = () => {
    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md bg-background p-6 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Draw Winner</h2>
        <div className="mb-4 text-center">
          <p className="mb-2">
            {giveaway.title} - {giveaway.type === "ticket" ? "Primal Pass Pick" : getTypeLabel(giveaway.type)}
          </p>
          <p className="text-sm text-foreground-600 mb-4">
            {remainingWinners} winner{remainingWinners !== 1 ? "s" : ""} remaining to be drawn
          </p>
          
          {winner ? (
            <div className="mt-6 mb-4">
              <h3 className="text-xl font-semibold text-apeGreen">Winner Drawn!</h3>
              <div className="mt-2 p-3 bg-apeGreen/10 rounded-lg">
                <p className="text-lg font-bold">{winner.name}</p>
              </div>
            </div>
          ) : (
            <div className="h-20 flex items-center justify-center">
              {animation ? (
                <div className="animate-spin-pulse text-3xl">
                  🎲
                </div>
              ) : (
                <p>Click the button below to draw a winner</p>
              )}
            </div>
          )}
        </div>
        
        <div className="flex justify-center gap-4">
          {!winner ? (
            <Button
              onClick={handleDrawWinner}
              color="apeGreen"
              size="medium"
              radius="md"
              isLoading={isDrawing}
              disabled={isDrawing}
            >
              {isDrawing ? "Drawing..." : "Draw Winner"}
            </Button>
          ) : remainingWinners > 0 ? (
            <Button
              onClick={handleDrawWinner}
              color="apeGreen"
              size="medium"
              radius="md"
              isLoading={isDrawing}
              disabled={isDrawing}
            >
              Draw Another Winner
            </Button>
          ) : null}
          
          <Button
            onClick={handleComplete}
            color="apeRed"
            size="medium"
            radius="md"
          >
            {remainingWinners <= 0 ? "Complete" : "Close"}
          </Button>
        </div>
      </div>
    </div>
  );
}

function getTypeLabel(type) {
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
}