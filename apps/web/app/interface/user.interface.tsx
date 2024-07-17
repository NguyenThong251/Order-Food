export interface User {
  _id: string;

  username: string;
  phone: number;
  isAdmin: boolean;
  email: string;
  password: string;
  point: number;
}
export interface Action {
  setUser: (user: User) => void;
  clearUser: () => void;
}
