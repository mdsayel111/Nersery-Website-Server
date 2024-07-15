import mongoose, { Schema } from "mongoose";
import { TOrder } from "./order-interface";
import { status } from "./order-constants";

// creat product schema
const orderSchema = new mongoose.Schema<TOrder>(
  {
    name: String,
    email: String,
    phone: String,
    address: String,
    cart: [{ _id: Schema.Types.ObjectId, quantity: Number }],
    totalPrice: Number,
    status: {
      type: String,
      enum: status,
      default: "pending",
    },
  },
  { timestamps: true },
);

// creat product model
const Order = mongoose.model<TOrder>("Order", orderSchema);

export default Order;
