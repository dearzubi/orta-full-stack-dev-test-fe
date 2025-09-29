import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import superjson from "superjson";

/** @typedef {{ id: string; name: string; email: string; role: string; authToken: string; }} AppUser */
/** @typedef {{ user: AppUser | null; setUser: (user: AppUser | null) => void; }} UserStore */

export const useUserStore = create()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: "user",
      serialize: (state) => superjson.stringify(state),
      deserialize: (str) => superjson.parse(str),
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? localStorage : undefined,
      ),
    },
  ),
);
