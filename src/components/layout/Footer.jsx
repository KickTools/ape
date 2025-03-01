// components/layout/Footer.js
import Link from "next/link";
import Icons from "@/assets/icons/index.jsx";
import Image from "next/image";
import trainLogoLight from "@/assets/images/train_logo_light.png";

const Footer = () => {
  return (
    <footer className="apeFooter">
      <div className="apeFooter-container">
        {/* Top Row */}
        <div className="apeFooter-topRow">
          {/* Left Column */}
          <div className="apeFooter-brandColumn">
            <div className="apeFooter-brand">
              <Image
                src={trainLogoLight}
                alt="Trainwreck Logo"
                width={40} // Adjust width as needed
                className="apeFooter-icon"
              />
              <span className="apeFooter-brandName">Ape Gang</span>
            </div>
            <p className="apeFooter-description">
              Ape Gang is a community created site dedicated to TrainwrecksTV
              and his SquadW community. Ape Gang is not endorsed by Trainwreck.
            </p>
            <div className="apeFooter-socials">
              <a
                href="https://kick.com/trainwreckstv"
                target="_blank"
                className="apeFooter-socialLink hover:text-kick"
              >
                <Icons.BrandKick size="3xl" />
              </a>
              <a
                href="https://kick.com/trainwreckstv"
                target="_blank"
                className="apeFooter-socialLink hover:text-twitch"
              >
                <Icons.BrandTwitch size="3xl" />
              </a>
              <a
                href="https://x.com/trainwreckstv"
                target="_blank"
                className="apeFooter-socialLink"
              >
                <Icons.BrandX size="3xl" />
              </a>
              <a
                href="https://www.youtube.com/trainwreckstv"
                target="_blank"
                className="apeFooter-socialLink hover:text-youtube"
              >
                <Icons.BrandYoutube size="3xl" />
              </a>
              <a
                href="https://discord.gg/trainwreckstv"
                target="_blank"
                className="apeFooter-socialLink hover:text-discord"
              >
                <Icons.BrandDiscord size="3xl" />
              </a>
            </div>
          </div>
          {/* Middle Column */}
          <div className="apeFooter-linkColumn">
            <h3 className="apeFooter-linkHeader">Resources</h3>
            <ul>
              <li>
                <a
                  href="https://www.ncpgambling.org/help-treatment/"
                  className="apeFooter-link"
                >
                  Gambling Problem?
                </a>
              </li>
              <li>
                <a href="/about" className="apeFooter-link">
                  About Project
                </a>
              </li>
              <li>
                <a href="#" className="apeFooter-link">
                  Connect
                </a>
              </li>
              <li>
                <a href="/typography" className="apeFooter-link">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          {/* Right Column */}
          <div className="apeFooter-linkColumn">
            <h3 className="apeFooter-linkHeader">Community</h3>
            <ul>
              <li>
                <a href="/leaderboard" className="apeFooter-link">
                  Leaderboards
                </a>
              </li>
              <li>
                <a href="#" className="apeFooter-link">
                  Moments
                </a>
              </li>
              <li>
                <a href="#" className="apeFooter-link">
                  Events
                </a>
              </li>
            </ul>
          </div>
          <div className="apeFooter-linkColumn">
            <h3 className="apeFooter-linkHeader">Account</h3>
            <ul>
              <li>
                <a href="/user/profile" className="apeFooter-link">
                  Profile
                </a>
              </li>
              <li>
                <a href="/user/settings" className="apeFooter-link">
                  Settings
                </a>
              </li>
              <li>
                <a href="/user/verification" className="apeFooter-link">
                  Verification
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* Bottom Row */}
        <div className="apeFooter-bottomRow">
          <div className="apeFooter-legal">
            <a href="/legal?doc=privacy">Privacy Policy</a>
            <span className="apeFooter-separator">|</span>
            <a href="/legal?doc=tos">Terms of Service</a>
          </div>
          <div className="apeFooter-copyright">
            <p>© 2025 KickTools, LLC. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
