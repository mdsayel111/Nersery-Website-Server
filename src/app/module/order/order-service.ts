import mongoose from "mongoose";
import AppError from "../../errors/app-error";
import Product from "../product/product-model";
import { TOrder } from "./order-interface";
import { orderValidationSchema } from "./order-validation-schema";
import Order from "./order-model";

// create addOrder service
const addOrder = async (data: TOrder) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const validateData = orderValidationSchema.parse(data);

    const productIds = validateData.cart.map(item => new mongoose.Types.ObjectId(item._id));

    const products = await Product.find({
      _id: { $in: productIds },
      isDeleted: false,
    }).session(session);

    const productQuantities: Record<string, number> = {};
    products.forEach(product => {
      productQuantities[product._id.toString()] = product.quantity;
    });

    for (const item of validateData.cart) {
      if (!productQuantities[item._id]) {
        throw new AppError(400, "Invalid Id!");
      }

      if (item.quantity > productQuantities[item._id]) {
        throw new AppError(
          400,
          `${products.find(product => product._id.toString() === item._id)?.title} has only ${productQuantities[item._id]} in stock!`,
        );
      }
    }

    const result = await Order.create([validateData], { session });

    // update quantity
    const updates = validateData.cart.map(async item => {
      const product = products.find(product => product._id.toString() === item._id);
      if (product) {
        const newQuantity = product.quantity - item.quantity;
        
        // update each product quantity
        const result = await Product.updateOne({ _id: product._id }, { quantity: newQuantity }, { session });

        // if any occurs on quabtity update
        if (!result) {
          throw new AppError(500, "Something went wrong!")
        }
      }
    });

    await Promise.all(updates);


    await session.commitTransaction();
    return result;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};


const orderServices = {
  addOrder,
};

export default orderServices;
