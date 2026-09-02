import { create } from "zustand";

export type CursorVariant = "default" | "hover" | "view" | "drag" | "hidden";

interface UIState {
  isLoading: boolean;
  loadProgress: number;
  menuOpen: boolean;
  cursorVariant: CursorVariant;
  cursorLabel: string;
  setLoadProgress: (n: number) => void;
  finishLoading: () => void;
  setMenuOpen: (v: boolean) => void;
  setCursor: (variant: CursorVariant, label?: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isLoading: true,
  loadProgress: 0,
  menuOpen: false,
  cursorVariant: "default",
  cursorLabel: "",
  setLoadProgress: (n) => set({ loadProgress: n }),
  finishLoading: () => set({ isLoading: false }),
  setMenuOpen: (v) => set({ menuOpen: v }),
  setCursor: (variant, label = "") => set({ cursorVariant: variant, cursorLabel: label }),
}));
