// src/app/(admin)/admin/layout.jsx
"use client";

import ProtectedRoute from '@/components/routes/ProtectedRoute';
import { AuthProvider } from '@/contexts/AuthContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import '@/app/styles/admin.css';


export default function AdminLayout({ children }) {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="grow">
          <ProtectedRoute requiredRole="admin">
            {children}
          </ProtectedRoute>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}