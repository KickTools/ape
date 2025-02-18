import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ViewerSettings } from '@/types/viewerFormData';

interface ViewerSettingsContextValue {
  formData: ViewerSettings;
  setFormData: React.Dispatch<React.SetStateAction<ViewerSettings>>;
}

const ViewerSettingsContext = createContext<ViewerSettingsContextValue | undefined>(undefined);

export const FormDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<ViewerSettings>({
    bitcoinAddress: '',
    contactAddress: ''
  });

  return (
    <ViewerSettingsContext.Provider value={{ formData, setFormData }}>
      {children}
    </ViewerSettingsContext.Provider>
  );
};

export const useFormData = () => {
  const context = useContext(ViewerSettingsContext);
  if (context === undefined) {
    throw new Error('useFormData must be used within a FormDataProvider');
  }
  return context;
};