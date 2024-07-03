import { persist, create } from "@repo/ui";
interface User {
  emailOrPhone: string;
  username: string;
}

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

const useUserStore = create<UserStore>(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user-storage",
      getStorage: () => localStorage,
    }
  )
);

export default useUserStore;
