// src/app/components/elements/AnalyticCard.jsx
"use client";

import Icons from "@/assets/icons";

export default function AnalyticCard({ title, value, icon = "Ape" }) {
  const IconComponent = Icons[icon]; 

  return (
    <div className="flex px-4 py-4 rounded-xl bg-foreground-700/5 border-2 border-transparent hover:border-foreground/50 transition-colors">
      <div className="flex flex-col flex-grow items-start">
        <div className="flex items-center mb-2">
          {IconComponent && <IconComponent size="2xl" color="apeRed" className="mr-3" />}
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <p className="text-3xl font-bold">{value}</p>
      </div>
    </div>
  );
}