// components/auth/TwitchOAuthStart.js
"use client";

import { useAuth } from "@/contexts/AuthContext";
import Icons from "@/assets/icons/index.jsx";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function TwitchOAuthStart({ setAuthState }) {
  const { loading } = useAuth();

  const handleTwitchOAuth = () => {
    window.location.href = `${apiBaseUrl}/auth/twitch/verify`;
  };

  return (
    <div className="space-y-8 text-left">
      <h1 className="text-6xl font-black">1<span className="text-twitch ml-2">.</span></h1>
      <div>

        <h1 className="text-2xl font-black tracking-wide">Connect Your Twitch Account</h1>
        <p className="mt-2 text-foreground-700 tracking-wide">
          Already verified?{' '}
          <button
            onClick={() => setAuthState('register')}
            className="text-twitch hover:underline focus:outline-none cursor-pointer"
          >
            Sign In Instead
          </button>
        </p>
      </div>
      {/* Title */}
      <div>
        <p className="text-xl text-foreground tracking-wide">
          To proceed, you need to connect your Twitch account. This will allow us
          to verify your identity and provide a seamless experience.
        </p>
      </div>


      {/* Buttons */}
      <div className="flex flex-col gap-4">
        <button
          className="flex items-center justify-center gap-4 border-2 border-twitch text-foreground-500 font-bold py-3 px-6 rounded-lg bg-transparent hover:bg-twitch hover:border-twitch hover:text-foreground-500 transition cursor-pointer"
          onClick={() => handleTwitchOAuth()}
        >
          <span>Connect your Twitch Account</span>
          <Icons.BrandTwitch size="xl" className="my-auto -translate-y-0.5" />

        </button>

      </div>

      {/* Terms */}
      <p className=" text-foreground-700 tracking-wide leading-8">
        By continuing, you agree to the{' '}
        <a href="/legal?doc=tos" className="text-foreground hover:underline">Terms of Service</a>{' '}
        and{' '}
        <a href="/legal?doc=privacy" className="text-foreground hover:underline">Privacy Policy</a>.
      </p>
    </div>
  );
}