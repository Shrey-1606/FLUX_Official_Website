"use client";
import React, { createContext, useContext, useState } from 'react';

type LabsState = {
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  toggleOpen: () => void;
  setMinimized: (val: boolean) => void;
  setMaximized: (val: boolean) => void;
};

const LabsContext = createContext<LabsState | undefined>(undefined);

export const LabsProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setMinimized] = useState(false);
  const [isMaximized, setMaximized] = useState(false);

  const toggleOpen = () => {
    if (isOpen && isMinimized) {
      setMinimized(false);
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <LabsContext.Provider value={{ 
      isOpen, isMinimized, isMaximized, 
      toggleOpen, setMinimized, setMaximized 
    }}>
      {children}
    </LabsContext.Provider>
  );
};

export const useLabs = () => {
  const context = useContext(LabsContext);
  if (!context) throw new Error("useLabs must be used within LabsProvider");
  return context;
};