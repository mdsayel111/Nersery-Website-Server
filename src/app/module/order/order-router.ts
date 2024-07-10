import express from "express";
import { addOrder } from "./order-controller";

//creat order router
const orderRouter = express.Router();

// add create order route
orderRouter.post("/", addOrder);

export default orderRouter;
