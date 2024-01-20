import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserCredentials } from "@/types/t.user";

interface UserAuthState {
  user: UserCredentials | null;
  setCredentials: (credentials: UserCredentials) => void;
  clearCredentials: () => void;
}

export const useAuth = create<UserAuthState>()(
  persist(
    (set) => ({
      user: null,
      setCredentials: (credentials) => set({ user: credentials }),
      clearCredentials: () => set({ user: null }),
    }),
    { name: "taskify_auth" }
  )
);
