"use client";
import { useRouter } from "next/navigation";
import UserStats from "@/components/sections/userStats";
import BrandScrollers from "@/components/sections/brandScroller";
import Friends from "@/components/sections/friendsSection";
import ContactProject from "@/components/sections/contactProject";
import Icons from "@/assets/icons";
import { useAuth } from "@/contexts/AuthContext";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  const handleAuthNavigation = (page) => {
    router.push(`/auth?flow=${page}`);
  };

  const continueToWelcome = () => {
    router.push("/user/welcome");
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-24 md:py-40 text-center">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-4xl lg:text-6xl font-black mb-6 uppercase">
            Welcome <span className="text-apeRed">Ape Gang</span> Community
          </h1>
          <p className="flex justify-center gap-4 font-medium text-2xl md:text-2xl text-foreground-500 text-center">
            <Icons.ShieldCheck
              size="2xl"
              color="apeGreen-500"
              className="my-auto"
            />
            The "Un" Official Verification Process
          </p>
          <p className="text-xl md:text-2xl text-foreground-700 p-8">
            This app helps you verify your Kick and Twitch accounts to gain
            access to exclusive features, communities, giveaways and rewards.
          </p>
          <div className="flex gap-4 justify-center">
            {!user && (
              <>
                <button
                  onClick={() => handleAuthNavigation("register")}
                  className="bg-apeGreen text-background font-bold py-3 px-6 rounded-full transition hover:shadow-apeGreen/20 hover:shadow-lg hover:scale-105 cursor-pointer"
                >
                  Verify Now
                </button>
                <button
                  onClick={() => handleAuthNavigation("login")}
                  className="bg-apeRed text-foreground font-bold py-3 px-6 rounded-full transition hover:shadow-apeRed/20 hover:shadow-lg hover:scale-105 cursor-pointer"
                >
                  Sign In
                </button>
              </>
            )}
            {!!user && (
              <button
                onClick={() => continueToWelcome()}
                className="bg-apeRed text-foreground font-bold py-3 px-6 rounded-full transition hover:shadow-apeRed/20 hover:shadow-lg hover:scale-105 cursor-pointer"
              >
                Continue
              </button>
            )}
          </div>
        </div>
      </section>

      {/* User Stats Section */}
      <UserStats />

      {/* Friends Section (Replace About Section) */}
      <Friends />

      <section id="brands" className="py-16 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <BrandScrollers />
        </div>
      </section>

      {/* Contact Section */}
      <ContactProject />
    </div>
  );
}
