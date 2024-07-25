export interface OrderProduct {
  product_id: string;
  quantity: number;
}

export interface OrderData {
  user_id: string | null;
  products: OrderProduct[];
  table_id: string;
  sub_total: number;
}

export interface OrderState {
  orderId: string | null;
  setOrderId: (id: string) => void;
  clearOrderId: () => void;
}
