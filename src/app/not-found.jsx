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
    <section className="flex flex-col flex-grow items-center justify-center gap-4 py-12 px-6 text-center">
      {/* 404 Image Wrapper for Responsive Scaling */}
      <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96">
        <Image
          src={ape404}
          alt="404 - Not Found"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Message */}
      <h1 className="text-8xl font-black tracking-wide">404</h1>
      <h2 className="text-3xl font-bold tracking-normal leading-normal">
        Whoops! This page went ape-shit… and disappeared.
      </h2>
      <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-2xl">
        Even a silverback couldn’t bring this page back!
      </p>
      <div className="text-center flex flex-col gap-4">
        <Icons.Ape color="apeRed" size="6xl" className="mx-auto" />

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
