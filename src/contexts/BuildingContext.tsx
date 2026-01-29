'use client'

import { createContext, useContext, useState, ReactNode } from 'react';

type BuildingContextType = {
  selectedOptions: Set<string>;
  toggleOption: (optionId: string) => void;
  clearSelections: () => void;
};

const BuildingContext = createContext<BuildingContextType | undefined>(undefined);

export function BuildingProvider({ children }: { children: ReactNode }) {
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
    <BuildingContext.Provider value={{ selectedOptions, toggleOption, clearSelections }}>
      {children}
    </BuildingContext.Provider>
  );
}

export function useBuilding() {
  const context = useContext(BuildingContext);
  if (!context) {
    throw new Error('useBuilding must be used within BuildingProvider');
  }
  return context;
}
