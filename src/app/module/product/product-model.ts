import mongoose from "mongoose";
import { TProduct } from "./product-interface";

// creat product schema
const productSchema = new mongoose.Schema<TProduct>(
  {
    title: String,
    description: String,
    imgUrl: String,
    imgList: [String],
    quantity: Number,
    price: Number,
    category: String,
    rating: Number,
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

// creat product model
const Product = mongoose.model<TProduct>("Product", productSchema);

export default Product;
