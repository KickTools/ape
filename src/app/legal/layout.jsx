// app/(legal)/legal/layout.js
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import JumpToTop from "@/components/elements/jumpToTop.jsx";
import "../styles/legal.css";

export default function LegalLayout({ children }) {
  return (
    <div>
      <div className="min-h-screen flex flex-col relative z-0">
        <Header />

        <main className="grow">
            {children}
        </main>
        <JumpToTop />
        <Footer />
      </div>
    </div>
  );
}
