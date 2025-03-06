// src/app/not-found.jsx
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import ape404 from "@/assets/images/404-ape.png";
import Icons from "@/assets/icons";

export default function NotFound() {
  const [referrer, setReferrer] = useState(null);

  useEffect(() => {
    // This code will run only on the client side
    const referrerUrl = document.referrer;

    // If the referrer is from the same site (same origin), store it
    if (referrerUrl && new URL(referrerUrl).origin === window.location.origin) {
      setReferrer(referrerUrl);
    }
  }, []);

  const goBack = () => {
    if (referrer) {
      window.location.href = referrer; // Navigate back to the referrer page
    } else {
      window.location.href = "/"; // Fallback to home if no referrer
    }
  };

  return (
    <section className="flex flex-col flex-grow min-h-screen items-center justify-center gap-4 py-12 px-6 text-center">
      {/* 404 Image Wrapper for Responsive Scaling */}
      <Icons.Ape color="apeRed" size="8xl" className="mx-auto" />

      {/* Message */}
      <h1 className="flex items-center gap-4 text-9xl font-black tracking-wide apePeriod"><span>404</span></h1>
      <h2 className="text-3xl font-bold tracking-normal leading-normal">
        Whoops! This page went ape-shit… and disappeared.
      </h2>
      <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-2xl">
        Even a silverback couldn’t bring this page back!
      </p>

      <div className="text-center flex gap-4">


        {/* Go Back Button */}
        {referrer && (
          <button
            onClick={goBack}
            className="bg-apeRed text-foreground font-bold py-3 px-6 rounded-full transition hover:shadow-apeRed/20 hover:shadow-lg hover:scale-105 cursor-pointer"
          >
            Go Back
          </button>
        )}

        {/* Return Home Button */}
        <button
          onClick={() => window.location.href = "/"}
          className="bg-apeRed text-foreground font-bold py-3 px-6 rounded-full transition hover:shadow-apeRed/20 hover:shadow-lg hover:scale-105 cursor-pointer"
        >
          Return Home
        </button>
      </div>
    </section>
  );
}
