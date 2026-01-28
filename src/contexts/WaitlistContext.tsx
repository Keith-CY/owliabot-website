'use client'

import { createContext, useContext, useState, ReactNode } from 'react';

type WaitlistContextType = {
  selectedOptions: Set<string>;
  toggleOption: (optionId: string) => void;
  clearSelections: () => void;
};

const WaitlistContext = createContext<WaitlistContextType | undefined>(undefined);

export function WaitlistProvider({ children }: { children: ReactNode }) {
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(new Set());

  const toggleOption = (optionId: string) => {
    setSelectedOptions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(optionId)) {
        newSet.delete(optionId);
      } else {
        newSet.add(optionId);
      }
      return newSet;
    });
  };

  const clearSelections = () => {
    setSelectedOptions(new Set());
  };

  return (
    <WaitlistContext.Provider value={{ selectedOptions, toggleOption, clearSelections }}>
      {children}
    </WaitlistContext.Provider>
  );
}

export function useWaitlist() {
  const context = useContext(WaitlistContext);
  if (!context) {
    throw new Error('useWaitlist must be used within WaitlistProvider');
  }
  return context;
}
