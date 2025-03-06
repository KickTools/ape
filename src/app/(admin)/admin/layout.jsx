// src/app/(admin)/admin/layout.jsx

export const metadata = {
  title: "Ape Gang Community - Admin Access - SquadW Online",
  description: "Admin access to the SquadW Online community portal. Manage users, view analytics, and more.",
};


import ProtectedRoute from "@/components/routes/ProtectedRoute";
import { AuthProvider } from "@/contexts/AuthContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "@/app/styles/admin.css";
import "@/app/styles/animatebg.css";

export default function AdminLayout({ children }) {
  return (
    <div className="relative">
      <div className="animatedBackground">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <AuthProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="grow">
            <ProtectedRoute requiredRole="admin">{children}</ProtectedRoute>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </div>
  );
}
