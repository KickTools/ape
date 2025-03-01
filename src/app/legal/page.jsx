// src/app/legal/page.mjs
"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import TermsOfService from "./tos.jsx";
import PrivacyPolicy from "./privacy.jsx";

function LegalContent() {
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get("doc") || "tos";
  const [activeTab, setActiveTab] = useState(defaultTab);

  useEffect(() => {
    const doc = searchParams.get("doc");
    if (doc === "privacy" || doc === "tos") {
      setActiveTab(doc);
    }
  }, [searchParams]);

  return (
    <div className="w-full min-h-screen flex justify-center px-4 py-8 md:py-16">
      <div className="max-w-5xl w-full flex flex-col sm:flex-row gap-8">
        {/* Sidebar for navigation */}
        <div className="sm:w-64 bg-background-400/80 rounded-lg p-4 mt-4 mb-auto sticky top-32">
          <h2 className="text-md uppercase font-bold mb-4 px-4">Legal Docs</h2>
          <div className="flex sm:flex-col gap-2 sm:gap-4">
            <button
              onClick={() => setActiveTab("tos")}
              className={`w-full px-4 py-2 rounded-md transition-all text-left cursor-pointer ${
                activeTab === "tos"
                  ? "bg-apeRed/20 text-apeRed"
                  : "bg-transparent text-foreground hover:bg-apeRed/20 hover:text-apeRed"
              }`}
            >
              Terms of Service
            </button>
            <button
              onClick={() => setActiveTab("privacy")}
              className={`w-full px-4 py-2 rounded-md transition-all text-left cursor-pointer ${
                activeTab === "privacy"
                  ? "bg-apeRed/20 text-apeRed"
                  : "bg-transparent text-foreground hover:bg-apeRed/20 hover:text-apeRed"
              }`}
            >
              Privacy Policy
            </button>
          </div>
        </div>
  
        {/* Main content area */}
        <div className="flex-1 p-6 rounded-lg">
          {activeTab === "tos" ? <TermsOfService /> : <PrivacyPolicy />}
        </div>
      </div>
    </div>
  );
  
}

export default function LegalPage() {
  return (
    <Suspense fallback={<div>Loading legal information...</div>}>
      <LegalContent />
    </Suspense>
  );
}
