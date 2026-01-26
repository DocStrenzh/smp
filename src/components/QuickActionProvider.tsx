import React, { createContext, useContext, useMemo, useState } from "react";
import type { QuickActionId } from "../constants/quickActions";

type QuickActionsContextValue = {
  activeId: QuickActionId | null;
  isOpen: boolean;
  openAction: (id: QuickActionId) => void;
  closeAction: () => void;
  toggleAction: (id: QuickActionId) => void;
};

const QuickActionsContext = createContext<QuickActionsContextValue | null>(null);

export const QuickActionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeId, setActiveId] = useState<QuickActionId | null>(null);

  const value = useMemo<QuickActionsContextValue>(() => {
    return {
      activeId,
      isOpen: activeId !== null,
      openAction: (id) => setActiveId(id),
      closeAction: () => setActiveId(null),
      toggleAction: (id) => setActiveId((prev) => (prev === id ? null : id)),
    };
  }, [activeId]);

  return <QuickActionsContext.Provider value={value}>{children}</QuickActionsContext.Provider>;
};

export const useQuickActions = (): QuickActionsContextValue => {
  const ctx = useContext(QuickActionsContext);
  if (!ctx) {
    throw new Error("useQuickActions must be used within <QuickActionsProvider />");
  }
  return ctx;
};
