export interface OrderProduct {
  product_id: string;
  quantity: number;
}

export interface OrderData {
  _id: string;
  user_id: string | null;
  products: OrderProduct[];
  table_id: string;
  sub_total: number;
  date: Date;
  status: "Pending" | "Paid";
}

export interface OrderState {
  orderId: string | null;
  setOrderId: (id: string) => void;
  clearOrderId: () => void;
}
