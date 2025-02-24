export const siteConfig = {
  name: "Ape Gang Community",
  description: "Connect with other Ape Gang members and track your progress in the community.",
  navItems: [
    {
      label: "My Profile",
      href: "/dashboard",
      showWhenAuthenticated: true, 
    },
    {
      label: "Get Started",
      href: "/",
      showWhenAuthenticated: false, 
    },
    {
      label: "About",
      href: "/about",
      showWhenAuthenticated: false, 
    },
    {
      label: "Settings",
      href: "/settings",
      showWhenAuthenticated: true, 
    },
    {
      label: "Leaderboard",
      href: "/leaderboard",
      showWhenAuthenticated: true, 
    },
    {
      label: "Search",
      href: "/search",
      showWhenAuthenticated: true,
      showAdminOnly: true, 
    },
  ],
  navMenuItems: [
    {
      label: "My Profile",
      href: "/dashboard",
      showWhenAuthenticated: true,
    },
    {
      label: "About",
      href: "/about",
      showWhenAuthenticated: true, // Always show
    },
    {
      label: "Leaderboard",
      href: "/leaderboard",
      showWhenAuthenticated: true, 
    },
    {
      label: "Settings",
      href: "/settings",
      showWhenAuthenticated: true, 
    },
    {
      label: "Search",
      href: "/search",
      showWhenAuthenticated: true, 
    },
    {
      label: "Login",
      href: "/login",
      showWhenAuthenticated: false, // Only show when NOT authenticated
    },
  ],
  links: {
    twitter: "https://x.com/Trainwreckstv",
    discord: "https://discord.gg/trainwreckstv",
    login: "/login",
  },
  footer: {
    description: { footer: "KickTools, LLC. All Rights Reserved" },
    links: {
      privacy: "/privacy",
      terms: "/terms",
    },
  },
};