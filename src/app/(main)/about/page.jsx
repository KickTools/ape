// app/about/page.jsx
"use client";

import Link from "next/link";
import Image from "next/image";
import Icons from "@/assets/icons";
import babzPfp from "@/assets/images/pfp-ayybabz.jpg";
import sectionTexture from "@/assets/images/section-textures.jpg";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="py-16 md:py-24 text-center">
        <div className="max-w-5xl mx-auto px-6">
          {/* Small centered Ape Icon */}
          <div className="flex justify-center mb-6">
            <Icons.Ape size="6xl" color="apeRed" />
          </div>

          {/* Title */}
          <h1 className="text-4xl lg:text-6xl font-black mb-6 uppercase">
            About This Project
          </h1>

          {/* Short description */}
          <p className="text-xl md:text-2xl text-foreground-700 px-4 md:px-16 ">
            Welcome to{" "}
            <span className="text-foreground">Ape Gang Verification</span>, a
            streamlined way to verify your{" "}
            <span className="text-twitch">Twitch</span> and{" "}
            <span className="text-kick">Kick</span> accounts. This verification
            process helps ensure authenticity and allows users to participate in
            giveaways and community events.
          </p>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="py-16 md:py-32 px-8 text-center bg-background text-foreground">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl lg:text-6xl font-black mb-6 uppercase">
            Disclaimer<span className="text-apeRed"> .</span>
          </h2>
          <p className="text-xl md:text-2xl text-foreground-700 px-4 md:px-8 mb-16">
            This platform is intended for verification purposes only. We
            strongly advise against engaging in any form of gambling.
          </p>
          <div className="flex justify-center mb-16">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/M2VHu7-riUw?si=w8GfUG9w48D2N2R1"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              style={{ border: "4px solid red", borderRadius: "8px" }}
            ></iframe>
          </div>
          <blockquote className="text-lg italic px-8 mb-16">
            "Do not get it twisted, do not gamble. Do not start gambling.
            Gambling is entertainment and entertainment only. You won't break
            even, you won't win. You won't do any of that, you understand? You
            will only go into debt and ruin your fucking life." - Trainwreckstv
          </blockquote>
          <p className="text-2xl md:text-3xl text-foreground px-8 leading-10">
            Please gamble responsibly, or preferably, not at all. If you or
            someone you know is struggling with problem gambling, PLEASE, seek
            professional help.
          </p>
        </div>
      </section>

      {/* Babz and KickTools Section */}
      <section className="p-16 text-center bg-background-400 text-foreground">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
            {/* Profile Image with Skew Effect */}
            <div className="col-span-1 flex justify-center">
              <div className="w-44 h-52 p-2 border-4 border-apeBlue rounded hover:border-apeRed cursor-pointer hover:scale-105 transition-all overflow-hidden">
                <div className="w-full h-full">
                  <Image
                    src={babzPfp}
                    alt="AyyBabz"
                    width={300}
                    height={300}
                    className="w-[125%] h-[125%] object-cover rounded-sm"
                  />
                </div>
              </div>
            </div>

            {/* Creator Info */}
            <div className="col-span-1 md:col-span-3 text-left space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground/90">
                  Created by AyyBabz
                </h3>
                <p className="text-medium text-foreground/80">
                  Founder of{" "}
                  <Link
                    href="https://kicktools.app"
                    className="text-apeBlue font-semibold"
                  >
                    KickTools, LLC
                  </Link>
                </p>
              </div>
              <h1 className="text-xl font-medium">
                The #1 third-party resource for{" "}
                <Link
                  href="https://kick.com"
                  className="text-kick font-semibold"
                >
                  Kick
                </Link>{" "}
                streamers
              </h1>
              <p className="text-xl text-foreground-700">
                Developed by <strong>AyyBabz</strong>, this project reflects{" "}
                <Link
                  href="https://kicktools.app"
                  className="text-secondary font-semibold text-foreground"
                >
                  KickTools, LLC
                </Link>
                ’s commitment to enhancing the streaming experience for{" "}
                <Link
                  href="https://kick.com"
                  className="text-kick font-semibold"
                >
                  Kick
                </Link>{" "}
                creators and viewers alike.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trainwreck Outreach Section */}
      <section className="py-16 md:py-32 px-8 text-center bg-background text-foreground">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-6xl font-black mb-6 uppercase">
            Endorsement<span className="text-apeRed">.</span>
          </h2>
          <p className="text-2xl md:text-2xl text-foreground-800 text-center mb-8 px-2 lg:px-8 leading-9">
            This project is not officially endorsed by{" "}
            <span className="text-foreground">Trainwreck</span>... yet! But
            let's change that! Help us get his attention by reaching out to him
            on X (Twitter) and letting him know that you want him to endorse
            this verification tool! Use #squadWonline
          </p>
          <button
            onClick={() =>
              window.open("https://x.com/trainwreckstv/", "_blank")
            }
            className="bg-apeRed text-foreground font-bold py-3 px-6 rounded-full transition hover:shadow-apeRed/20 hover:shadow-lg hover:scale-105 cursor-pointer mt-4"
          >
            Tweet @Trainwreckstv
          </button>
        </div>
      </section>
    </div>
  );
}
