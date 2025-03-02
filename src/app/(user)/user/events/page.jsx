// src/app/(user)/user/events/page.jsx
"use client";

import Link from 'next/link';
import Icons from "@/assets/icons";

export default function EventsPage() {
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

      {/* Giveaway Section - Disabled for now */}
      <section className="py-16 md:py-32 bg-background-400/50 text-center mt-auto">
        <div className="max-w-5xl mx-auto px-6">
          <h3 className="text-2xl md:text-3xl font-black text-foreground mb-6 uppercase apePeriod">
            Current <span className="text-apeRed">Giveaway</span>
          </h3>
          <div className="flex flex-col items-center gap-4 opacity-50 pointer-events-none">
            <p className="text-foreground-700">Ape Gang March Madness Giveaway - Coming Soon!</p>
            <button 
              className="px-6 py-3 bg-apeRed text-white rounded-full font-semibold cursor-not-allowed"
              disabled
            >
              Enter Giveaway (Status: Pending)
            </button>
          </div>
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