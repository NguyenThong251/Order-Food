export interface UserVoucher {
  _id: string;
  code: string;
  voucher_id: string;
}
export interface User {
  _id: string;
  username: string;
  phone: string;
  isAdmin: boolean;
  email: string;
  password: string;
  point: number;
  vouchers: UserVoucher[];
}
export interface Action {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}
