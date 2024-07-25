export interface OrderChefProduct {
  product_id: string;
  quantity: number;
}
export interface OrderChefData {
  products: OrderChefProduct[];
  table_id: string;
  status: "pending" | "completed" | "canceled";
  date: Date;
}
