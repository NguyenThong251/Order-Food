// import { persist, create, devtools } from "@repo/ui";
// import { User, Action } from "../../interface";

// export const useUserStore = create<User & Action>()(
//   devtools(
//     persist(
//       (set) => ({
//         name: "",
//         phone: 0,
//         setUser: (user: User) => set(user),
//         clearUser: () => set({ name: "", phone: 0 }),
//       }),
//       {
//         name: "user-session",
//         getStorage: () => sessionStorage,
//       }
//     )
//   )
// );
