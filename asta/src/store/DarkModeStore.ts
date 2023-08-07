import { create } from 'zustand'


interface DarkModeState {
    isDark: boolean;
    setDark: (checked: boolean) => void;

}

export const useDarkModeStore = create<DarkModeState>()((set) => ({
    isDark: false,
    setDark: () => set((state) => ({ isDark: !state.isDark })),

}))