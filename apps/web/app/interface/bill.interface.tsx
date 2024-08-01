export interface Product {
  product_id: string;
  quantity: number;
}

export interface Bill {
  _id: string;
  products: Product[];
  user_id: string;
  total: number;
  table_id: string;
  date: string;
}
