import { create, devtools, persist } from "@repo/ui";
import { OrderState } from "../../interface";
export const useOrderStore = create<OrderState>()(
  devtools(
    persist(
      (set) => ({ orderId: "", setOrderId: (id) => set({ orderId: id }) }),
      {
        name: "order-storage", // Tên key trong localStorage
        getStorage: () => localStorage, // Lưu trữ vào localStorage
      }
    )
  )
);
