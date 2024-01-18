import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark";

interface GlobalThemeState {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

export const useTheme = create<GlobalThemeState>()(
  persist(
    (set, get) => ({
      theme: "dark",
      toggleTheme: () => {
        if (get().theme === "dark") {
          set({ theme: "light" });
        } else {
          set({ theme: "dark" });
        }
      },
      setTheme: (theme) => set({ theme: theme }),
    }),
    { name: "preferred-theme" }
  )
);
