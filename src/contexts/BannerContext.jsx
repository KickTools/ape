'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

// Import all your banner images here
import defaultBanner from '@/assets/images/banner-ape.png';
import loginBanner from '@/assets/images/bg-ape_train.jpg';
import registerBanner from '@/assets/images/bg-ape_trainvsgorilla.jpg';
import twitchBanner from '@/assets/images/bg-ape_chef.jpg';
import kickBanner from '@/assets/images/bg-ape_riddler.jpg';

const BannerContext = createContext();

export function BannerProvider({ children }) {
  const searchParams = useSearchParams();
  const [currentBanner, setCurrentBanner] = useState(defaultBanner);

  const bannerMap = {
    login: loginBanner,
    register: registerBanner,
    twitchOAuthStart: twitchBanner,
    kickOAuthStart: kickBanner,
    default: defaultBanner,
  };

  const updateBanner = (state) => {
    setCurrentBanner(bannerMap[state] || bannerMap.default);
  };

  // Update banner based on URL parameters
  useEffect(() => {
    const authFlow = searchParams.get('auth_flow');
    if (authFlow && bannerMap[authFlow]) {
      updateBanner(authFlow);
    }
  }, [searchParams]);

  return (
    <BannerContext.Provider value={{ currentBanner, updateBanner }}>
      {children}
    </BannerContext.Provider>
  );
}

export const useBanner = () => {
  const context = useContext(BannerContext);
  if (!context) {
    throw new Error('useBanner must be used within a BannerProvider');
  }
  return context;
};