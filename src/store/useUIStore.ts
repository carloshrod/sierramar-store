import { create } from "zustand";

interface UIState {
  isDarkMode: boolean;
  isSidebarOpen: boolean;
  toggleDarkMode: () => void;
  toggleSidebar: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isDarkMode: false,
  isSidebarOpen: false,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));
