import mongoose from "mongoose";

type TCart = {
  id: mongoose.Types.ObjectId;
  quantity: number;
};

export type TOrder = {
  name: string;
  email: string;
  phone: string;
  adress: string;
  cart: TCart[];
  status: "pending" | "confim" | "complete";
};
