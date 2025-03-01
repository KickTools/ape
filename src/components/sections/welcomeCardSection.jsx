// src/app/components/sections/WelcomeCardSection.jsx
"use client";

import Link from 'next/link';
import UserCard from '../elements/UserCard';
import Icons from "@/assets/icons";

export default function WelcomeCardSection({ cardData }) {
  return (
    <div className="max-w-5xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cardData.map((card, index) => (
          <UserCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
}