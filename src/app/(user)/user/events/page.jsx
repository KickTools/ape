// src/app/(user)/user/events/page.jsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Icons from "@/assets/icons";
import { getAllGiveaways, enterGiveaway, getGiveawayEntryStatus } from '@/lib/giveawayAPI';
import { getPublicEvents } from '@/lib/eventAPI';
import EventCard from '@/components/sections/eventCard';
import { useToast } from '@/contexts/ToastContext';
import { useAuth } from '@/contexts/AuthContext';

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);
  const [activeGiveaway, setActiveGiveaway] = useState(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isEntering, setIsEntering] = useState(false);
  const toast = useToast();
  const { user } = useAuth();

  useEffect(() => {
      fetchEvents();
      if (user) {
          fetchActiveGiveaway();
      } else {
          setIsLoading(false);
      }
  }, [user]);

  const fetchEvents = async () => {
      try {
          setIsLoadingEvents(true);
          const response = await getPublicEvents();
          console.log(response);
          if (response.success) {
              setEvents(response.events);
          }
      } catch (error) {
          toast.error("Failed to load events");
          console.error("Error fetching events:", error);
      } finally {
          setIsLoadingEvents(false);
      }
  };

  const fetchActiveGiveaway = async () => {
      try {
          setIsLoading(true);
          const response = await getAllGiveaways({ status: 'active', type: 'ticket' });
          
          if (response.success && response.data.length > 0) {
              const ticketGiveaways = response.data.filter(g => g.type === 'ticket' && g.status === 'active');
              
              if (ticketGiveaways.length > 0) {
                  ticketGiveaways.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
                  const current = ticketGiveaways[0];
                  setActiveGiveaway(current);
                  
                  if (user) {
                      await checkEntryStatus(current.id);
                  }
              }
          }
      } catch (error) {
          console.error("Error fetching active giveaway:", error);
          toast.error("Could not load giveaway information");
      } finally {
          setIsLoading(false);
      }
  };

  const checkEntryStatus = async (giveawayId) => {
      try {
          const response = await getGiveawayEntryStatus(giveawayId);
          if (response.success) {
              setHasEntered(response.data.hasEntered);
          }
      } catch (error) {
          console.error("Error checking entry status:", error);
      }
  };

  const handleEnterGiveaway = async () => {
      if (!user) {
          toast.error("Please log in to enter the giveaway");
          return;
      }

      if (!activeGiveaway) return;

      setIsEntering(true);
      try {
          const response = await enterGiveaway(activeGiveaway.id);
          
          if (response.success) {
              setHasEntered(true);
              toast.success("You've successfully entered the giveaway!");
          } else {
              if (response.message === "You have already entered this giveaway") {
                  setHasEntered(true);
                  toast.info("You already entered this giveaway");
              } else {
                  toast.error(response.message || "Failed to enter giveaway");
              }
          }
      } catch (error) {
          console.error("Error entering giveaway:", error);
          if (error.message && error.message.includes("already entered")) {
              setHasEntered(true);
              toast.info("You already entered this giveaway");
          } else {
              toast.error(error.message || "Something went wrong while entering the giveaway");
          }
      } finally {
          setIsEntering(false);
      }
  };

  const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
      });
  };

  return (
    <div className="flex flex-col min-h-screen">
        {/* Header Section */}
        <section className="py-16 md:py-32">
            <div className="max-w-5xl mx-auto px-6 mb-8">
                <h2 className="text-4xl md:text-6xl font-black text-foreground uppercase text-center apePeriod">
                    Community <span className="text-apeRed">Events</span>
                </h2>
                <p className="text-lg text-foreground-700 text-center mt-4">
                    Participate in Ape Gang events and connect with the community
                </p>
            </div>

            {/* Events Grid */}
            <div className="max-w-5xl mx-auto px-6 mt-16">
                {isLoadingEvents ? (
                    <div className="flex justify-center items-center py-8">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-apeRed"></div>
                    </div>
                ) : events.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {events.map((event, index) => (
                            <EventCard key={index} {...event} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 text-foreground-600">
                        No upcoming events at the moment. Check back soon!
                    </div>
                )}
            </div>
        </section>

      {/* Giveaway Section */}
      <section className="py-16 md:py-32 bg-background-400/50 text-center mt-auto">
        <div className="max-w-5xl mx-auto px-6">
          <h3 className="text-4xl md:text-6xl font-black text-foreground mb-2 uppercase apePeriod">
            Current <span className="text-apeRed">Giveaway</span>
          </h3>
          <p className="text-lg text-foreground-700 text-center mb-8">
            Enter here for a chance to win "{activeGiveaway ? activeGiveaway.title : "an Ape Gang Community Giveaway"}"!
          </p>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-apeRed"></div>
            </div>
          ) : activeGiveaway ? (
            <div className="bg-apeRed-900/40 border-2 border-apeRed/80 rounded-xl p-6 max-w-2xl mx-auto">
              <div className="flex flex-col items-center gap-4">
                <h4 className="text-xl font-bold">{activeGiveaway.title}</h4>
                
                <div className="flex flex-wrap justify-center gap-4 text-sm text-apeRed">
                  <div className="flex items-center gap-1">
                    <Icons.Calendar size="sm" />
                    <span>Started: {formatDate(activeGiveaway.startDate)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icons.Ape size="sm" />
                    <span>Ends: {formatDate(activeGiveaway.endDate)}</span>
                  </div>
                  {activeGiveaway.entrants && (
                    <div className="flex items-center gap-1">
                      <Icons.User size="sm" />
                      <span>{activeGiveaway.entrants.length} Entries</span>
                    </div>
                  )}
                </div>
                
                <div className="w-full bg-background/90 h-3 rounded-xl overflow-hidden mt-2">
                  {/* Progress bar showing time elapsed */}
                  <div 
                    className="bg-gradient-to-r from-apeRed to-apeYellow h-full"
                    style={{ 
                      width: `${Math.min(100, Math.max(0, 
                        ((Date.now() - new Date(activeGiveaway.startDate)) / 
                        (new Date(activeGiveaway.endDate) - new Date(activeGiveaway.startDate))) * 100
                      ))}%` 
                    }}
                  ></div>
                </div>
                
                {!user ? (
                  <div className="mt-4">
                    <Link 
                      href="/login"
                      className="px-6 py-3 bg-apeRed text-white rounded-full font-semibold hover:bg-apeRed/80 transition"
                    >
                      Login to Enter
                    </Link>
                  </div>
                ) : hasEntered ? (
                  <button 
                    className="px-6 py-3 bg-apeBlue text-foreground rounded-full font-bold cursor-default mt-4"
                    disabled
                  >
                    ✓ Entry Confirmed
                  </button>
                ) : (
                  <button 
                    onClick={handleEnterGiveaway}
                    className="px-6 py-3 bg-apeRed text-white rounded-full font-semibold hover:bg-apeRed/80 transition mt-4"
                    disabled={isEntering}
                  >
                    {isEntering ? (
                      <span className="flex items-center gap-2">
                        <span className="animate-spin h-4 w-4 border-2 border-t-transparent border-white rounded-full"></span>
                        Processing...
                      </span>
                    ) : "Enter Giveaway"}
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-background-800/50 rounded-xl p-6 max-w-2xl mx-auto">
              <p className="text-foreground-700 mb-4">No active giveaways at the moment. Check back soon!</p>
              <button 
                className="px-6 py-3 bg-background-600 text-foreground-600 rounded-full font-semibold cursor-not-allowed"
                disabled
              >
                No Active Giveaway
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}