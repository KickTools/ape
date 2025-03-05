// src/app/(admin)/layout.jsx
import { GiveawayProvider } from "@/contexts/GiveawayContext";
import '@/app/styles/giveaway.css';

export default function AdminLayout({ children }) {
  return (
    <GiveawayProvider>
      {children}
    </GiveawayProvider>
  );
}