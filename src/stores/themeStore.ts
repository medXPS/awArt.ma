import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (isDark: boolean) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      isDark: false,
      toggleTheme: () => {
        const newTheme = !get().isDark;
        set({ isDark: newTheme });
        // Force immediate DOM update
        if (newTheme) {
          document.documentElement.classList.add('dark');
          document.body.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
          document.body.classList.remove('dark');
        }
      },
      setTheme: (isDark: boolean) => {
        set({ isDark });
        // Force immediate DOM update
        if (isDark) {
          document.documentElement.classList.add('dark');
          document.body.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
          document.body.classList.remove('dark');
        }
      },
    }),
    {
      name: 'theme-storage',
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Force immediate DOM update on hydration
          if (state.isDark) {
            document.documentElement.classList.add('dark');
            document.body.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
            document.body.classList.remove('dark');
          }
        }
      },
    }
  )
);