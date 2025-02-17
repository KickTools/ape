export const siteConfig = {
  name: "Next.js + HeroUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Home",
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
      showWhenAuthenticated: true, 
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
  ],
  navMenuItems: [
    {
      label: "Home",
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
};