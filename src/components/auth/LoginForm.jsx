// components/auth/LoginForm.js
'use client';

import Icons from "@/assets/icons/index.jsx";
import Image from 'next/image';
import trainLogoLight from "@/assets/images/train_logo_light.png";

export default function LoginForm({ setAuthState }) {
  const handleAuthWithProvider = (provider) => {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';
    window.location.href = `${apiBaseUrl}/auth/${provider}/login`;
  };

  return (
    <div className="space-y-16 text-left">
      <div>
        <div className="apeFooter-brand">
          <Image
            src={trainLogoLight}
            alt="Trainwreck Logo"
            width={48}
            className="apeFooter-icon"
          />
        </div>
        <h1 className="text-2xl font-black tracking-wide">Sign in to Ape Gang</h1>
        <p className="mt-2 text-foreground-700 tracking-wide">
          Not verified? Don’t have an account?{' '}
          <button
            onClick={() => setAuthState('register')}
            className="text-apeGreen hover:underline focus:outline-none cursor-pointer"
          >
            Get Started
          </button>
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <button
          className="flex items-center justify-center gap-2 border-2 border-twitch text-foreground-500 font-bold py-3 px-6 rounded-lg bg-transparent hover:bg-twitch hover:border-twitch hover:text-foreground-500 transition cursor-pointer"
          onClick={() => handleAuthWithProvider('twitch')}
        >
          <Icons.BrandTwitch size="xl" />
          Sign in with Twitch
        </button>
        <button
          className="flex items-center justify-center gap-2 border-2 border-kick text-foreground-500 font-bold py-3 px-6 rounded-lg bg-transparent hover:bg-kick hover:border-kick hover:text-background-500 transition cursor-pointer"
          onClick={() => handleAuthWithProvider('kick')}
        >
          <Icons.BrandKick size="xl" />
          Sign in with Kick
        </button>
      </div>

      <p className="text-foreground-700 tracking-wide">
        By signing in, you agree to the{' '}
        <a href="/legal?doc=tos" className="text-apeGreen hover:underline">Terms of Service</a>{' '}
        and{' '}
        <a href="/legal?doc=privacy" className="text-apeGreen hover:underline">Privacy Policy</a>.
      </p>
      <p className="text-foreground-700 tracking-wide mt-1">
        Need help?{' '}
        <a href="/support" className="text-apeGreen hover:underline">Contact support</a>
      </p>
    </div>
  );
}