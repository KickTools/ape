"use client"
import React, { useState, useEffect } from 'react';
import friendsConfig from '@/config/friends';
import sectionTexture from '@/assets/images/section-textures.jpg';

const Friends = () => {
  const [sortedFriends, setSortedFriends] = useState([]);

  useEffect(() => {
    const sorted = [...friendsConfig].sort((a, b) => a.name.localeCompare(b.name));
    setSortedFriends(sorted);
  }, []);

  return (
    <section
      id="friends"
      className="apeFriends bg-background-600/90 py-16 md:py-32"
      style={{
        backgroundImage: `url(${sectionTexture.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="apePeriod text-6xl font-black text-center mb-8 uppercase" style={{transform: 'skewX(-15deg)'}}>The Boys</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {sortedFriends.map((friend, index) => (
            <div key={index} className="friend-item group flex flex-col items-center gap-2">
              {/* Parallelogram Container */}
              <div 
                className="w-44 h-56 p-1 border-6 border-transparent group-hover:border-apeRed cursor-pointer group-hover:scale-105 transition-all"
                style={{
                  transform: 'skewX(-12.5deg)', // Skew the container
                  overflow: 'hidden', // Ensure the image doesn't overflow
                }}
              >
                {/* Inner div to unskew the image */}
                <div 
                  className="w-full h-full -translate-y-4 translate-x-2"
                  style={{
                    transform: 'skewX(12.5deg) scale(1.5)', // Counter-skew to keep the image straight
                    overflow: 'hidden', // Ensure the image stays within bounds
                  }}
                >
                  <img
                    src={friend.imageUrl}
                    alt={friend.name}
                    className="w-[125%] h-[125%] object-cover"
                  />
                </div>
              </div>
              <a
                href={friend.kickUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-4xl font-black text-apeRed group-hover:text-foreground-500 transition mt-1 -translate-x-6 uppercase"
              >
                {friend.name}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Friends;