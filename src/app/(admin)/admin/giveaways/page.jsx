// src/app/(admin)/admin/giveaways/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAllGiveaways } from "@/lib/giveawayAPI";
import { useGiveaway } from "@/contexts/GiveawayContext";
import { useToast } from "@/contexts/ToastContext";
import ApeLoader from "@/components/elements/ApeLoader";
import Modal from "@/components/elements/Modal";
import Button from "@/components/elements/Button";
import RainGiveawayForm from "@/components/admin/giveaways/RainGiveawayForm";
import ChatGiveawayForm from "@/components/admin/giveaways/ChatGiveawayForm";
import TicketGiveawayForm from "@/components/admin/giveaways/TicketGiveawayForm";
import GiveawayTypeCard from "@/components/admin/giveaways/GiveawayTypeCard";
import GiveawayAnalyticsSection from "@/components/admin/giveaways/GiveawayAnalyticsSection";
import StartGiveawaySection from "@/components/admin/giveaways/StartGiveawaySection";

export default function GiveawaysHub() {
  const router = useRouter();
  const [activeModal, setActiveModal] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [winners, setWinners] = useState([]);
  const [lastAddedGiveaway, setLastAddedGiveaway] = useState(null);
  const { activeGiveaways, setActiveGiveaways } = useGiveaway();
  const toast = useToast();
  const [analytics, setAnalytics] = useState({
    totalCount: 0,
    activeCount: 0,
    completedCount: 0,
    winnerCount: 0
  });

  useEffect(() => {
    // Fetch giveaways
    const fetchGiveaways = async () => {
      try {
        const { data } = await getAllGiveaways();
        setActiveGiveaways(data);

        // Calculate analytics
        const stats = {
          totalCount: data.length,
          activeCount: data.filter((g) => g.status === "active").length,
          completedCount: data.filter((g) => g.status === "completed").length,
          winnerCount: data.reduce(
            (acc, g) => acc + (g.winners?.length || 0),
            0
          )
        };
        setAnalytics(stats);
      } catch (error) {
        toast.error("Failed to load giveaways.");
      }
    };

    fetchGiveaways();
  }, [setActiveGiveaways, toast]);

  const handleFormSubmit = async (giveawayData) => {
    // Store the form data in the context for the next step if it's a chat giveaway
    if (giveawayData.type === "chat") {
      // Store the form data in localStorage or context
      localStorage.setItem("pendingChatGiveaway", JSON.stringify(giveawayData));
      router.push("/admin/giveaways/chat");
      return;
    }

    // Handle rain or ticket giveaway creation directly
    try {
      setIsLoading(true);
      setLastAddedGiveaway(giveawayData);
      setActiveModal(null);
      setIsConfirmOpen(true);

      if (giveawayData.type === "rain") {
        setWinners(giveawayData.winners || []);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Add closeConfirmModal function to handle modal closing
  const closeConfirmModal = () => {
    if (!isLoading) {
      setIsConfirmOpen(false);
    }
  };

  return (
    <div className="giveaway-container">
      <section>
        <div className="giveaway-header content-width">
          <div className="flex flex-col">
            <h2 className="giveaway-title apePeriod">Giveaway HQ</h2>
            <p className="giveaway-description">
              Manage your giveaways, view analytics, and start new giveaways
              here.
            </p>
          </div>

          <div className="space-x-4">
            <Button
              onClick={() => router.push("/admin/giveaways/view")}
              size="small"
              color="apeRed"
            >
              View All Giveaways
            </Button>
          </div>
        </div>
      </section>

      {/* Giveaway Analytics Section */}
      <GiveawayAnalyticsSection />

      <StartGiveawaySection setActiveModal={setActiveModal} />

      <section className="section-spacing"></section>

      {/* Rain Giveaway Modal */}
      <Modal
        isOpen={activeModal === "rain"}
        onClose={() => setActiveModal(null)}
      >
        <div>
          <h3 className="text-xl font-bold mb-4">Start Banana Blitz</h3>
          <RainGiveawayForm
            onSubmit={handleFormSubmit}
            onCancel={() => setActiveModal(null)}
          />
        </div>
      </Modal>

      {/* Chat Giveaway Modal */}
      <Modal
        isOpen={activeModal === "chat"}
        onClose={() => setActiveModal(null)}
      >
        <div>
          <h3 className="text-xl font-bold mb-4">Start SquadW Chat Giveaway</h3>
          <ChatGiveawayForm
            onSubmit={handleFormSubmit}
            onCancel={() => setActiveModal(null)}
          />
        </div>
      </Modal>

      {/* Ticket Giveaway Modal */}
      <Modal
        isOpen={activeModal === "ticket"}
        onClose={() => setActiveModal(null)}
      >
        <div>
          <h3 className="text-xl font-bold mb-4">Start Primal Pass Pick</h3>
          <TicketGiveawayForm
            onSubmit={handleFormSubmit}
            onCancel={() => setActiveModal(null)}
          />
        </div>
      </Modal>

      {/* Confirmation Modal - This will show different content based on the giveaway type */}
      <Modal isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)}>
        <div className="text-center">
          <h3 className="text-4xl font-black text-foreground mt-8 uppercase apePeriod">
            {lastAddedGiveaway?.type === "rain"
              ? "Banana Blitz Winners"
              : "Giveaway Launched"}
          </h3>
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-8">
              <ApeLoader />
              <p className="mt-4 text-foreground-600">Drawing winners...</p>
            </div>
          ) : (
            <>
              {lastAddedGiveaway?.type === "rain" ? (
                <>
                  <p className="text-xl text-foreground-700 mb-4">
                    {winners.length > 0
                      ? "The Ape Gang's lucky winners are:"
                      : "No winners drawn yet—check your settings!"}
                  </p>
                  {winners.length > 0 && (
                    <div className="flex flex-wrap gap-4 justify-center mb-6">
                      {winners.map((winner) => (
                        <div
                          key={winner._id}
                          className="flex items-center justify-center py-1 px-3 bg-apeRed-800/20 border-2 border-apeRed rounded-md w-[calc(50%-0.5rem)] text-center"
                        >
                          <span className="text-2xl font-medium text-apeRed">
                            {winner.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <p className="text-foreground-600 mb-6">
                  {lastAddedGiveaway?.type === "ticket"
                    ? `${lastAddedGiveaway.title} runs from ${new Date(
                        lastAddedGiveaway.startDate
                      ).toLocaleString()} to ${new Date(
                        lastAddedGiveaway.endDate
                      ).toLocaleString()}. Ready to hype the Ape Gang?`
                    : `${lastAddedGiveaway?.title} has been added successfully. Ready to hype the Ape Gang?`}
                </p>
              )}
              <Button
                onClick={() => setIsConfirmOpen(false)}
                radius="md"
                size="small"
                color="apeRed"
              >
                Got It!
              </Button>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}
