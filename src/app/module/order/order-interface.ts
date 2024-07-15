import mongoose from "mongoose";

type TCart = {
  _id: mongoose.Types.ObjectId;
  quantity: number;
};

export type TOrder = {
  name: string;
  email: string;
  phone: string;
  address: string;
  cart: TCart[];
  totalPrice: number
  status: "pending" | "confim" | "complete";
};
