// components/layout/Header.js
"use client";

import Icons from "@/assets/icons/index.jsx";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

const Header = () => {
  const { user, logout, signedIn } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

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
        <div className="apeHeader-logo">
          <div className="apeHeader-avatar">
            {signedIn && user?.profileImage ? (
              <Image
                src={user.profileImage}
                alt={user.username}
                width={48}
                height={48}
                className="apeHeader-avatarPFP"
              />
            ) : (
              <Icons.User size="xl" className="apeHeader-avatarIcon" />
            )}
          </div>
        </div>

        <div className="apeHeader-center">
          {signedIn ? (
            <input
              type="text"
              placeholder="Find Viewer ..."
              className="apeHeader-searchInput"
            />
          ) : (
            <div className="apeHeader-links">
              {pathname !== "/" && <a href="/">Home</a>}
              <a href="/auth?flow=register">Get Started</a>
              {pathname !== "/about" && <a href="/about">About Project</a>}
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
