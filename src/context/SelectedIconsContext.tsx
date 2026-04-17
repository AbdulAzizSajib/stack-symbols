// src/context/SelectedIconsContext.tsx
"use client";

import { createContext, useContext, useState } from "react";
import type { ISvg } from "@/types/svg.types";

interface SelectedIconsContextType {
  selected: ISvg[];
  toggle: (svg: ISvg) => void;
  clear: () => void;
  isSelected: (slug: string) => boolean;
}

const SelectedIconsContext = createContext<SelectedIconsContextType | null>(null);

export function SelectedIconsProvider({ children }: { children: React.ReactNode }) {
  const [selected, setSelected] = useState<ISvg[]>([]);

  const toggle = (svg: ISvg) => {
    setSelected((prev) =>
      prev.find((s) => s.slug === svg.slug)
        ? prev.filter((s) => s.slug !== svg.slug)
        : [...prev, svg],
    );
  };

  const clear = () => setSelected([]);
  const isSelected = (slug: string) => selected.some((s) => s.slug === slug);

  return (
    <SelectedIconsContext.Provider value={{ selected, toggle, clear, isSelected }}>
      {children}
    </SelectedIconsContext.Provider>
  );
}

export const useSelectedIcons = () => {
  const ctx = useContext(SelectedIconsContext);
  if (!ctx) throw new Error("useSelectedIcons must be used within SelectedIconsProvider");
  return ctx;
};