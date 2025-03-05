// src/app/(admin)/admin/giveaways/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAllGiveaways } from "@/lib/giveawayAPI";
import { useGiveaway } from "@/contexts/GiveawayContext";
import { useToast } from "@/contexts/ToastContext";
import Modal from "@/components/elements/Modal";
import Button from "@/components/elements/Button";
import RainGiveawayForm from "@/components/admin/giveaways/RainGiveawayForm";
import ChatGiveawayForm from "@/components/admin/giveaways/ChatGiveawayForm";
import TicketGiveawayForm from "@/components/admin/giveaways/TicketGiveawayForm";
import GiveawayTypeCard from "@/components/admin/giveaways/GiveawayTypeCard";
import GiveawayAnalyticsSection from "@/components/admin/giveaways/GiveawayAnalyticsSection";

export default function GiveawaysHub() {
  const router = useRouter();
  const [activeModal, setActiveModal] = useState(null);
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
      // API calls and state updates will go here
      // This will be implemented in the form components
      setLastAddedGiveaway(giveawayData);
      setActiveModal(null);
      setIsConfirmOpen(true);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const giveawayTypes = [
    {
      id: "rain",
      title: "Banana Blitz",
      description: "Quick random giveaways with instant winner selection",
      icon: "🍌", // Just using an emoji as placeholder, replace with your custom icon
      color: "apeYellow"
    },
    {
      id: "chat",
      title: "SquadW Chat",
      description:
        "Keyword-based chat giveaways with customizable qualifications",
      icon: "💬",
      color: "apeBlue"
    },
    {
      id: "ticket",
      title: "Primal Pass Pick",
      description: "Scheduled raffles with entry period and drawing",
      icon: "🎟️",
      color: "apeRed"
    }
  ];

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

      <section className="section-spacing section-bg">
        <div className="giveaway-hub-content">
          <h2 className="text-4xl md:text-6xl font-black text-foreground uppercase apePeriod">
            Start <span className="text-apeRed">A</span> Giveaway
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {giveawayTypes.map((type) => (
              <GiveawayTypeCard
                key={type.id}
                title={type.title}
                description={type.description}
                icon={type.icon}
                color={type.color}
                onClick={() => setActiveModal(type.id)}
              />
            ))}
          </div>
        </div>
      </section>



      <section className="section-spacing">

      </section>



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
          <h3 className="text-xl font-bold text-foreground mb-4">
            {lastAddedGiveaway?.type === "rain"
              ? "Banana Blitz Winners!"
              : "Giveaway Launched!"}
          </h3>
          {lastAddedGiveaway?.type === "rain" ? (
            <>
              <p className="text-foreground-600 mb-4">
                {winners.length > 0
                  ? "The Ape Gang's lucky winners are:"
                  : "No winners drawn yet—check your settings!"}
              </p>
              {winners.length > 0 && (
                <ul className="list-disc list-inside text-foreground-600 mb-6">
                  {winners.map((winnerId) => (
                    <li key={winnerId}>Viewer ID: {winnerId}</li>
                  ))}
                </ul>
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
        </div>
      </Modal>
    </div>
  );
}
