// src/app/loading.jsx
"use client";

import React from "react";
import ApeLoader from "@/components/elements/ApeLoader";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <ApeLoader />
    </div>
  );
}