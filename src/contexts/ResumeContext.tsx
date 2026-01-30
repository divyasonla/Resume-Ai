import React, { createContext, useContext, useState, useCallback } from 'react';
import { ResumeData, INITIAL_RESUME_DATA, WizardStep, ResumeSettings } from '@/types/resume';

interface ResumeContextType {
  resumeData: ResumeData;
  updateResumeData: (updates: Partial<ResumeData>) => void;
  updatePersonalInfo: (field: keyof ResumeData['personalInfo'], value: string) => void;
  updateSettings: (settings: Partial<ResumeSettings>) => void;
  currentStep: WizardStep;
  setCurrentStep: (step: WizardStep) => void;
  resetResume: () => void;
  loadResume: (data: ResumeData) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

interface ResumeProviderProps {
  children: React.ReactNode;
  initialData?: ResumeData;
}

export function ResumeProvider({ children, initialData }: ResumeProviderProps) {
  const [resumeData, setResumeData] = useState<ResumeData>(initialData || INITIAL_RESUME_DATA);
  const [currentStep, setCurrentStep] = useState<WizardStep>('personal');

  const updateResumeData = useCallback((updates: Partial<ResumeData>) => {
    setResumeData(prev => ({ ...prev, ...updates }));
  }, []);

  const updatePersonalInfo = useCallback((field: keyof ResumeData['personalInfo'], value: string) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }));
  }, []);

  const updateSettings = useCallback((settings: Partial<ResumeSettings>) => {
    setResumeData(prev => ({
      ...prev,
      settings: { ...prev.settings, ...settings },
    }));
  }, []);

  const resetResume = useCallback(() => {
    setResumeData(INITIAL_RESUME_DATA);
    setCurrentStep('personal');
  }, []);

  const loadResume = useCallback((data: ResumeData) => {
    setResumeData(data);
  }, []);

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        updateResumeData,
        updatePersonalInfo,
        updateSettings,
        currentStep,
        setCurrentStep,
        resetResume,
        loadResume,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}
