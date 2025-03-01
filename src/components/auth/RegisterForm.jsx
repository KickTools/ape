// components/auth/RegisterForm.js
"use client";

import { useAuth } from "@/contexts/AuthContext";
import Icons from "@/assets/icons/index.jsx";

export default function RegisterForm({ setAuthState }) {
  const { loading } = useAuth();

  const changeState = (state) => {
    setAuthState(state);
  };

  return (
    <div className="space-y-8 text-left">
      {/* Title */}
      <div>
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-black tracking-wide">Get Verified</h1>
          <Icons.ShieldCheck size="2xl" className="text-apeRed my-auto" />
        </div>
        <p className="mt-2 mb-8 text-foreground-700 tracking-wide">
          Already have an account?{" "}
          <button
            onClick={() => setAuthState("login")}
            className="text-foreground hover:underline focus:outline-none cursor-pointer"
          >
            Sign In
          </button>
        </p>
        <p className="text-xl text-foreground tracking-wide">
          To complete verification, connect your <strong>Twitch</strong> and{" "}
          <strong>Kick</strong> accounts. After that, provide your profile info
          for giveaways and contact.
        </p>
      </div>

      {/* Process Explanation and Steps */}
      <div className="space-y-8">
        <div className="text-xl text-foreground-700 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-foreground font-black w-6 text-left">
              1<span className="text-apeRed ml-1">.</span>
            </span>{" "}
            Connect your <strong className="text-twitch">Twitch</strong>{" "}
            account.
          </div>
          <div className="flex items-center gap-2">
            <span className="text-foreground font-black w-6 text-left">
              2<span className="text-apeRed ml-1">.</span>
            </span>{" "}
            Connect your <strong className="text-kick">Kick</strong> account.
          </div>
          <div className="flex items-center gap-2">
            <span className="text-foreground font-black w-6 text-left">
              3<span className="text-apeRed ml-1">.</span>
            </span>
            <span>Fill out your profile information.</span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-4">
        <button
          className="flex items-center justify-center gap-4 border-2 border-apeRed text-foreground-500 font-bold py-3 px-6 rounded-lg bg-transparent hover:bg-apeRed hover:border-apeRed hover:text-foreground-500 transition cursor-pointer"
          onClick={() => changeState("twitchOAuthStart")}
        >
          <span>Start Verification</span>
          <Icons.ShieldCheck size="xl" className="my-auto -translate-y-0.5" />
        </button>
      </div>

      {/* Terms */}
      <p className=" text-foreground-700 tracking-wide leading-8">
        By registering, you agree to the{" "}
        <a href="/legal?doc=tos" className="text-foreground hover:underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a
          href="/legal?doc=privacy"
          className="text-foreground hover:underline"
        >
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
}
