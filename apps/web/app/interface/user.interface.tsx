export interface User {
  _id: string;
  username: string;
  phone: string;
  isAdmin: boolean;
  email: string;
  password: string;
  point: number;
}
export interface Action {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}
