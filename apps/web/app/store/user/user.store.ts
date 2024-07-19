import { persist, create, devtools } from "@repo/ui";
import { User, Action } from "../../interface";

export const useUserStore = create<Action>()(
  devtools(
    persist(
      (set) => ({
        // username: "",
        // phone: 0,
        // isAdmin: false,
        // email:"",
        // password: "",

        setUser: (user: User) => set(user),
        clearUser: () => set({ name: "", phone: 0 }),
      }),
      {
        name: "user-session",
        getStorage: () => sessionStorage,
      }
    )
  )
);
