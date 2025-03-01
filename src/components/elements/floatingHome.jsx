// src/components/elements/floatingHome.mjs
"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Updated import
import Icons from '@/assets/icons/index.jsx';

const FloatingHome = () => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true); // Set state to true once on the client side
  }, []);

  const handleNavigation = () => {
    router.push('/'); // Using the new useRouter from next/navigation
  };

  if (!isClient) return null; // Prevent rendering on the server side

  return (
    <div className="fixed top-4 left-4 w-8 h-8 hover:scale-110 transition-transform rounded hidden md:flex items-center justify-center text-center bg-apeRed cursor-pointer">
      <button
        onClick={handleNavigation}
        className="cursor-pointer"
        aria-label="Go Home"
        title="Go Home"
      >
        <Icons.Ape size="3xl" color="foreground" />
      </button>
    </div>
  );
};

export default FloatingHome;
