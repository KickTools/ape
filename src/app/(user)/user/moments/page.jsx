// src/app/(user)/user/moments/page.jsx
"use client";

import { useState } from "react";
import Icons from "@/assets/icons";

export default function MomentsPage() {
  const [moments] = useState([
    {
      title: "Train's MAX wins for 20 million",
      description: "Trainwreckstv hits massive max win on Hoarders 2!",
      thumbnail: "/images/moments/train-jackpot.jpg",
      href: "https://kick.com/trainwreckstv"
    },
    {
      title: "Community Meme of the Month",
      description: "Ape Gang members creating the funniest memes.",
      thumbnail: "/images/moments/community-meme.jpg",
      href: "#"
    },
    {
      title: "Legendary Rant Compilation",
      description: "Train's most memorable rants in one video.",
      thumbnail: "/images/moments/train-rant.jpg",
      href: "#"
    }
  ]);

  return (
    <div className="flex flex-col space-y-16 max-w-5xl mx-auto px-6 py-16 md:py-32">
      {/* Header */}
      <h2 className="text-4xl md:text-6xl font-black mb-4 uppercase text-center">
        Moments <span className="text-apeRed">.</span>
      </h2>
      <p className="text-lg text-foreground-700 text-center">
        The best clips, memes, and moments from Trainwreckstv and the Ape Gang
        community.
      </p>

      {/* Moments Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {moments.map(({ title, description, thumbnail, href }, index) => (
          <a
            key={index}
            href={href}
            className="group flex flex-col items-center text-center hover:bg-apeRed-500/10 hover:no-underline rounded-xl cursor-pointer transition-all"
          >
            <div className="w-full h-56 overflow-hidden rounded-xl">
              <img
                src={thumbnail}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <h3 className="px-8 text-2xl font-black mt-4 group-hover:text-apeRed flex-grow">
              {title}
            </h3>
            <p className="text-md text-foreground-800 py-2 px-8">{description}</p>
          </a>
        ))}
      </div>

      {/* Submit Moment Section */}
      <section className="bg-background-400/80 p-8 md:p-16 rounded-xl text-center">
        <h3 className="text-4xl md:text-6xl font-black mb-4 uppercase apePeriod">
          Submit Your Moment
        </h3>
        <p className="text-lg text-foreground-600 mb-6">
          Got a legendary clip or an unforgettable moment? Submit it here and
          get featured!
        </p>

        {/* Level 3 Requirement */}
        <div className="bg-apeRed-500/10 border border-apeRed-500 text-apeRed-500 py-3 px-6 rounded-lg font-bold mb-6">
          You must be **Level 3** or higher to submit a moment.
        </div>

        {/* Submission Form */}
        <form className="flex flex-col items-center space-y-4 w-full max-w-2xl mx-auto">
          <input
            type="url"
            placeholder="Enter clip or image link (Kick, Twitch, YouTube, etc.)"
            className="block w-full rounded-md border-transparent hover:border-foreground/70 bg-background-300/5 border-2 px-3 py-2"
            disabled={true} // Placeholder, no logic yet
          />
          <textarea
            placeholder="Describe your moment (optional)"
            className="w-full p-3block w-full rounded-md border-transparent hover:border-foreground/70 bg-background-300/5 border-2 px-3 py-2"
            rows="3"
            disabled={true} // Placeholder, no logic yet
          ></textarea>

          <button
            type="button"
            className="bg-apeRed-500 text-white py-3 px-6 rounded-lg font-bold opacity-50 cursor-not-allowed"
            disabled={true} // Placeholder, no logic yet
          >
            Submit Moment (Coming Soon)
          </button>
        </form>
      </section>
    </div>
  );
}
