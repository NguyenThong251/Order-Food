export interface UserID {
  user_id: string;
}

export interface Voucher {
  _id: string;
  users: UserID[];
  discount: number;
  point: number;
  status: "public" | "private";
}
