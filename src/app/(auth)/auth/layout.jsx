// app/(auth)/auth/layout.js
import { AuthProvider } from '@/contexts/AuthContext';
import { BannerProvider } from '@/contexts/BannerContext';
import FloatingHome from '@/components/elements/floatingHome';
import { BannerImage } from '@/components/auth/BannerImage';

export default function AuthLayout({ children }) {
  return (
    <AuthProvider>
      <BannerProvider>
        <div className="min-h-screen flex flex-col md:flex-row">
          {/* Left side - solid color with login content */}
          <div className="w-full md:w-1/2 bg-background-500 min-h-screen flex items-center justify-center p-16">
            <div className="w-full max-w-md">
              {children}
            </div>
          </div>
          
          {/* Right side - image with gradient overlay (hidden on mobile) */}
          <div className="hidden md:block w-1/2 relative">
            <BannerImage />
            <div className="absolute inset-0 gradientOverlay"></div>
          </div>
          <FloatingHome />
        </div>
      </BannerProvider>
    </AuthProvider>
  );
}