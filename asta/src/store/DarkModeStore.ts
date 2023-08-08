import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface DarkModeState {
  isDark: boolean;
  setDark: (checked: boolean) => void;
}

export const useDarkModeStore = create<DarkModeState>()(
  persist(
    (set) => ({
      isDark: false,
      setDark: () => set((state) => ({ isDark: !state.isDark })),
    }),
    {
      name: 'dark-mode-store',
    }
  )
);

export default useDarkModeStore;
