"use client";

import Icons from "@/assets/icons";
import sectionTexture from "@/assets/images/section-textures.jpg";

export default function ProfileFiller() {
  return (
    <div className="flex flex-col min-h-screen">
      <section
        className="py-24 text-center bg-background text-foreground"
        style={{
          backgroundImage: `url(${sectionTexture.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex justify-center mb-6">
            <Icons.Ape size="6xl" color="apeBlue" />
          </div>
          <h1 className="text-4xl lg:text-6xl font-black mb-6 uppercase">
            Your Profile
          </h1>
          <p className="text-xl md:text-2xl text-foreground-700 px-16 mb-8">
            Profile data is loading...
          </p>
          <div className="space-y-4">
            <div className="border p-4 rounded-md">
              <h3 className="font-semibold">Username:</h3>
              <p>Loading...</p>
            </div>
            <div className="border p-4 rounded-md">
              <h3 className="font-semibold">Twitch Status:</h3>
              <p>Loading...</p>
            </div>
            <div className="border p-4 rounded-md">
              <h3 className="font-semibold">Kick Status:</h3>
              <p>Loading...</p>
            </div>
            <div className="border p-4 rounded-md">
              <h3 className="font-semibold">Join Date:</h3>
              <p>Loading...</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}