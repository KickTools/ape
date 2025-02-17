// pages/404.tsx

// Dependencies
import Image from "next/image";
import { Button } from "@heroui/button";

export default function NotFound() {
  return (
    <section className="flex flex-col flex-grow items-center justify-center gap-4 py-12 px-6 text-center">
      {/* 404 Image Wrapper for Responsive Scaling */}
      <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96">
        <Image
          src="/assets/images/404-ape.png"
          alt="404 - Not Found"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Message */}
      <h1 className="text-8xl font-black tracking-wide">404</h1>
      <h2 className="text-3xl font-bold tracking-normal leading-normal">Whoops! This page went ape-shit… and disappeared.</h2>
      <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-2xl">
      Even a silverback couldn’t bring this page back 🦍 !
      </p>

      {/* Action Button */}
      <Button as="a" size="lg" radius="full" color="primary" href="/" className="font-bold mt-4">
        Return Home
      </Button>
    </section>
  );
}
