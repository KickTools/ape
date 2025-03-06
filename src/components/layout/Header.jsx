// components/layout/Header.js
"use client";

import Icons from "@/assets/icons/index.jsx";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const { user, logout, signedIn } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const userRole = user?.role || "user";

  const handleAuthToggle = () => {
    if (signedIn) {
      logout();
    } else {
      router.push("/auth?flow=login");
    }
  };

  return (
    <header className="apeHeader">
      <div className="apeHeader-container">
        <div className="apeHeader-logo hidden md:flex">
          <div className="apeHeader-avatar">
            {signedIn && user?.profileImage ? (
              <Link href="/">
                <Image
                  src={user.profileImage}
                  alt={user.username}
                  width={48}
                  height={48}
                  className="apeHeader-avatarPFP"
                />
              </Link>
            ) : signedIn ? (
              <Link href="/">
                <Icons.User size="xl" className="apeHeader-avatarIcon" />
              </Link>
            ) : (
              <Icons.User size="xl" className="apeHeader-avatarIcon" />
            )}
          </div>
        </div>

        <div className="apeHeader-center">
          {signedIn && (userRole === "admin" || userRole === "webmaster") ? (
            // Admin-only: Find Viewer search input
            <div className="apeHeader-links">
              <Link href="/user/welcome" className="apeHeader-link">
                Explore
              </Link>
              <Link href="/admin" className="apeHeader-link">
                Admin
              </Link>
            </div>
          ) : (
            // Links adjusted: no Home or Get Started when signed in
            <div className="apeHeader-links">
              {!signedIn && pathname !== "/" && <a href="/">Home</a>}
              {!signedIn && <a href="/auth?flow=register">Get Started</a>}
              {!signedIn && pathname !== "/about" && (
                <a href="/about">About Project</a>
              )}
              {signedIn && (
                <Link href="/user/welcome" className="apeHeader-link">
                  Explore
                </Link>
              )}
            </div>
          )}
        </div>

        <div className="apeHeader-auth">
          <button onClick={handleAuthToggle} className="apeHeader-signInBtn">
            <Icons.Lock size="2xl" className="apeHeader-lockIcon" />
            <span className="apeHeader-signInText">
              {signedIn ? "Log Out" : "Sign In"}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
