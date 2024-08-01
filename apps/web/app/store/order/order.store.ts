import { create, devtools, persist } from "@repo/ui";
import { OrderState } from "../../interface";
export const useOrderStore = create<OrderState>()(
  devtools(
    persist(
      (set) => ({
        orderId: "",
        setOrderId: (id) => set({ orderId: id }),
        clearOrderId: () => set({ orderId: null }),
      }),
      {
        name: "order-storage",
        getStorage: () => localStorage,
      }
    )
  )
);
