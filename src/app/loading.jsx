// src/app/loading.jsx
"use client";

import React, { useEffect, useState } from "react";
import ApeLoader from "@/components/elements/ApeLoader";

export default function Loading() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      {mounted && <ApeLoader />}
    </div>
  );
}
