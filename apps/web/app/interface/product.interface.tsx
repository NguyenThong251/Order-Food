export interface Products {
  _id: string;
  name: string;
  price: number;
  description: string;
  seller: number;
  quantity: number;
  category: {
    _id: string;
    name: string;
    image: string;
  };
  thumbnails: string[];
}
