// src/app/components/elements/UserCard.jsx
"use client";

import Link from 'next/link';
import Icons from "@/assets/icons";

export default function UserCard({ title, description, href, icon = "Ape" }) {
  const IconComponent = Icons[icon]; // Dynamically get the icon component

  return (
    <div className="flex px-4 py-4 rounded-xl bg-foreground-700/5 border-2 border-transparent hover:border-foreground/50 transition-colors">
      <div className="flex flex-grow items-start">
        {IconComponent && <IconComponent size="6xl" color="apeRed" className="mr-4 my-auto" />}
        <div>
          <Link href={href} className="block">
            <h3 className="text-xl font-semibold mb-2 hover:underline">{title}</h3>
          </Link>
          <p className="text-foreground-700">{description}</p>
        </div>
      </div>
    </div>
  );
}