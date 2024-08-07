// export interface UserID {
//   user_id: string;
//   redeemedAt: Date;
// }
export interface CodeVoucher {
  code: String;
  redeemedAt: Date;
  status: "used" | "unused";
}

export interface Voucher {
  _id: string;
  codeVoucher: CodeVoucher[];
  // users: UserID[];
  discount: number;
  point: number;
  status: "public" | "private";
}
