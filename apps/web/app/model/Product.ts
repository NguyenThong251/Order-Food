// import mongoose, { Document, Schema } from "mongoose";

// export interface IProduct extends Document {
//   name: string;
//   price: number;
// }

// const productSchema: Schema = new mongoose.Schema({
//   name: { type: String, required: true },
//   price: { type: Number, required: true },
// });

// const Product = mongoose.model<IProduct>("Product", productSchema);

// export default Product;

import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  name: string;
  price: number;
}

const productSchema: Schema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

const Product =
  mongoose.models.Product || mongoose.model<IProduct>("Product", productSchema);

export default Product;
