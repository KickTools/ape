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
    <div className="w-full min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-center mb-8">Legal Information</h1>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab("tos")}
            className={`px-6 py-2 rounded-md transition-all ${
              activeTab === "tos"
                ? "bg-primary-600 text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-800"
            }`}
          >
            Terms of Service
          </button>
          <button
            onClick={() => setActiveTab("privacy")}
            className={`px-6 py-2 rounded-md transition-all ${
              activeTab === "privacy"
                ? "bg-primary-600 text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-800"
            }`}
          >
            Privacy Policy
          </button>
        </div>

        {activeTab === "tos" ? <TermsOfService /> : <PrivacyPolicy />}
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