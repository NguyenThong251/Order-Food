export interface CartItem {
  product_id: string;
  quantity: number;
}
export interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateItemQuantity: (product_id: string, quantity: number) => void;
  clearCart: () => void;
}
