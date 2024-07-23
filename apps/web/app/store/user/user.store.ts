import { persist, create, devtools } from "@repo/ui";
import { User, Action } from "../../interface";

export const useUserStore = create<Action>()(
  devtools(
    persist(
      (set) => ({
        user: null as User | null,
        setUser: (user: User) => set({ user }),
        clearUser: () => set({ user: null }),
      }),
      {
        name: "user-session",
        getStorage: () => sessionStorage,
      }
    )
  )
);
