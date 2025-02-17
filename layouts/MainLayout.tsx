// layouts/MainLayout.tsx
import { ReactNode, memo } from "react";
import { Navbar } from "@/components/navbar";

interface MainLayoutProps {
  children: ReactNode;
}

export default memo(function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex flex-grow">{children}</main>
      <footer className="py-4 text-center">© 2025 KickTools, LLC</footer>
    </div>
  );
});
