// src/app/(user)/layout.jsx
"use client";

import ProtectedRoute from '@/components/routes/ProtectedRoute';
import { AuthProvider } from '@/contexts/AuthContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import JumpToTop from '@/components/elements/jumpToTop.jsx';
import '../styles/index.css';
import '../styles/animatebg.css';
import '../styles/forms.css';

export default function UserLayout({ children }) {
    return (
        <div className="relative">
            <div className="animatedBackground">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className="gradientOverlay"></div>
            <AuthProvider>
                <div className="min-h-screen flex flex-col relative z-0">
                    <Header />
                    <main className="grow">
                        <ProtectedRoute>
                            {children}
                        </ProtectedRoute>
                    </main>
                    <JumpToTop />
                    <Footer />
                </div>
            </AuthProvider>
        </div>
    );
}