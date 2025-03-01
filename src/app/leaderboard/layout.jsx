// app/(main)/layout.js
import { AuthProvider } from '@/contexts/AuthContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import JumpToTop from '@/components/elements/jumpToTop.jsx';
import '../styles/index.css';



export default function MainLayout({ children }) {
  return (
      <div className="relative">
        <div className="gradientOverlay"></div>
        <AuthProvider>
          <div className="min-h-screen flex flex-col relative z-0">
            <Header />
            <main className="grow">
              {children}
            </main>
            <JumpToTop />
            <Footer />
          </div>
        </AuthProvider>
      </div>
  );
}