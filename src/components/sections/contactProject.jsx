// src/components/sections/ContactProject.jsx
'use client'; // Required for client-side hooks like useRouter in App Router

import { useRouter } from 'next/navigation';
import Icons from '@/assets/icons/index.jsx';

export default function ContactProject() {
  const router = useRouter();

  const handleContactClick = () => {
    router.push('/contact');
  };

  const handleLearnMoreClick = () => {
    router.push('/about');
  };

  return (
    <section id="contact" className="bg-background-400 py-16 md:py-32">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-4xl lg:text-6xl font-black mb-6 uppercase apePeriod">Learn and Get Involved</h2>
        <p className="text-xl md:text-2xl text-foreground-800 text-center mb-12 px-8">
          This is a community project by Babz, CEO of KickTools, inspired by the Ape Gang community. If you’re interested in joining this project or have questions about it, use the contact button below!
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={handleLearnMoreClick}
            className="bg-apeRed text-foreground-500 font-bold py-3 px-6 rounded-full hover:shadow-apeRed/20 hover:shadow-lg hover:scale-105 transition cursor-pointer"
          >
            Learn More
          </button>
          <button
            onClick={handleContactClick}
            className="group flex bg-transparent border-2 border-foreground-500 text-foreground-500 font-bold py-3 px-6 rounded-full transition cursor-pointer"
          >
            Contact <Icons.Send size="lg" className="my-auto ml-2 -rotate-6 group-hover:text-apeBlue group-hover:rotate-6 transition-all" />
          </button>
        </div>
      </div>
    </section>
  );
}