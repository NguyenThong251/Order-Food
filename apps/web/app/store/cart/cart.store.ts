// cartStore.ts
import { persist, create, devtools } from "@repo/ui";
import { CartItem, CartState } from "../../interface";
export const useCartStore = create<CartState>()(
  devtools(
    persist(
      (set) => ({
        items: [],
        addItem: (item) =>
          set((state) => {
            const existingItem = state.items.find(
              (cartItem) => cartItem.product_id === item.product_id
            );
            let newItems;
            if (existingItem) {
              newItems = state.items.map((cartItem) =>
                cartItem.product_id === item.product_id
                  ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                  : cartItem
              );
            } else {
              newItems = [...state.items, item];
            }
            return { items: newItems };
          }),
        removeItem: (productId) =>
          set((state) => ({
            items: state.items.filter((item) => item.product_id !== productId),
          })),
        clearCart: () => set({ items: [] }),
      }),
      {
        name: "cart-storage", // Tên key trong localStorage
        getStorage: () => localStorage, // Lưu trữ vào localStorage
      }
    )
  )
);
