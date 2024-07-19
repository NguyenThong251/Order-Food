// cartStore.ts
import { persist, create, devtools } from "@repo/ui";
import { TableState } from "../../interface";
export const useTableStore = create<TableState>()(
  devtools(
    persist((set) => ({ _id: "", setTableId: (id) => set({ _id: id }) }), {
      name: "table-storage", // Tên key trong localStorage
      getStorage: () => localStorage, // Lưu trữ vào localStorage
    })
  )
);
