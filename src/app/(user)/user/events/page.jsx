// src/app/(user)/user/events/page.jsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Icons from "@/assets/icons";
import { getAllGiveaways, enterGiveaway, getGiveawayEntryStatus } from '@/lib/giveawayAPI';
import { useToast } from '@/contexts/ToastContext';
import { useAuth } from '@/contexts/AuthContext';

export default function EventsPage() {
  const [activeGiveaway, setActiveGiveaway] = useState(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isEntering, setIsEntering] = useState(false);
  const toast = useToast();
  const { user } = useAuth();

  // Sample template data - replace with actual data/logic later
  const eventData = [
    {
      day: "15",
      name: "Ape Gang Monthly Bash",
      description: "Join us for our monthly community celebration with special guests! *actual events coming soon",
      date: "March 15, 2025",
      href: "#",
    },
    {
      day: "22",
      name: "Gaming Tournament",
      description: "Compete in our quarterly gaming tournament for exclusive prizes. *actual events coming soon",
      date: "March 22, 2025",
      href: "#",
    },
    {
      day: "29",
      name: "Content Creator Meetup",
      description: "Meet your favorite Ape Gang creators and collaborate. *actual events coming soon",
      date: "March 29, 2025",
      href: "#",
    },
    {
      day: "05",
      name: "Ape Trivia Night",
      description: "Test your knowledge in our community trivia event with fun rewards. *actual events coming soon",
      date: "April 5, 2025",
      href: "#",
    },
    {
      day: "12",
      name: "Charity Stream Marathon",
      description: "Watch and donate during our 24-hour charity streaming event. *actual events coming soon",
      date: "April 12, 2025",
      href: "#",
    },
    {
      day: "19",
      name: "Ape Art Showcase",
      description: "Submit and view community artwork in our digital gallery. *actual events coming soon",
      date: "April 19, 2025",
      href: "#",
    },
    {
      day: "26",
      name: "Speedrun Challenge",
      description: "Race against other Apes in our speedrunning competition. *actual events coming soon",
      date: "April 26, 2025",
      href: "#",
    },
    {
      day: "03",
      name: "Ape Gang Q&A",
      description: "Ask questions and chat with the Ape Gang team live. *actual events coming soon",
      date: "May 3, 2025",
      href: "#",
    },
  ];

  useEffect(() => {
    const fetchActiveGiveaway = async () => {
      try {
        setIsLoading(true);
        const response = await getAllGiveaways({ status: 'active', type: 'ticket' });
        console.log("Giveaways", response);
        
        if (response.success && response.data.length > 0) {
          // Get the most recent active ticket giveaway
          const ticketGiveaways = response.data.filter(g => g.type === 'ticket' && g.status === 'active');
          
          if (ticketGiveaways.length > 0) {
            // Sort by start date, newest first
            ticketGiveaways.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
            const current = ticketGiveaways[0];
            setActiveGiveaway(current);
            
            // If user is logged in, check their entry status separately
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

    // Separate function to check entry status
    const checkEntryStatus = async (giveawayId) => {
      try {
        const response = await getGiveawayEntryStatus(giveawayId);
        if (response.success) {
          setHasEntered(response.data.hasEntered);
        }
      } catch (error) {
        console.error("Error checking entry status:", error);
        // Don't show toast for this error, not critical
      }
    };

    if (user) {
      fetchActiveGiveaway();
    } else {
      setIsLoading(false);
    }
  }, [user, toast]);

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
      // Check if the error is because the user already entered
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
            Participate in Ape Gang events and connect with the community <br /> Sample Events - Actual events coming soon!
          </p>
        </div>

        {/* Events Grid */}
        <div className="max-w-5xl mx-auto px-6 mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {eventData.map((event, index) => (
              <EventCard key={index} {...event} />
            ))}
          </div>
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

// Event Card Component
function EventCard({ day, name, description, date, href }) {
  return (
    <div className="relative flex px-4 py-4 rounded-xl bg-foreground-700/5 border-2 border-transparent hover:border-foreground/50 transition-colors">
      <div className="flex flex-col flex-grow items-start">
        <div className="flex w-full justify-between items-center mb-4">
          <span className="text-5xl font-black text-foreground apePeriod">{day}</span>
          <Icons.Calendar size="2xl" color="foreground" className="relative -top-2 right-0" />
        </div>
        <Link href={href} className="block">
          <h3 className="text-xl font-semibold mb-2 hover:underline">{name}</h3>
        </Link>
        <p className="text-foreground-700 mb-2">{description}</p>
        <p className="text-foreground-600 text-sm">{date}</p>
      </div>
    </div>
  );
}