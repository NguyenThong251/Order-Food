export interface CartItem {
  product_id: string;
  quantity: number;
}
export interface CartProduct {
  product_id: string;
  quantity: number;
}

export interface CartDB {
  products: CartProduct[];
  user_id: string;
}
export interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateItemQuantity: (product_id: string, quantity: number) => void;
  clearCart: () => void;
}
