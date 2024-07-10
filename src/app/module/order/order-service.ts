import mongoose from "mongoose";
import AppError from "../../errors/app-error";
import Product from "../product/product-model";
import { TOrder } from "./order-interface";
import { orderValidationSchema } from "./order-validation-schema";
import Order from "./order-model";

// create addOrder service
const addOrder = async (data: TOrder) => {
  // validate data by zod
  const validateData = orderValidationSchema.parse(data);

  // create an array of productId comes from cart
  const productIds = validateData.cart.map(
    (item) => new mongoose.Types.ObjectId(item.id),
  );

  // find all all product from DB which is in cart
  const products = await Product.find(
    {
      _id: { $in: productIds },
      isDeleted: false,
    },
    "quantity",
  );

  // Create a map of product quantities and deleted status for quick lookup
  const productQuantities: Record<string, number> = {};
  // const productStatus: Record<string, boolean> = {};
  products.forEach((product) => {
    productQuantities[product._id.toString()] = product.quantity;
    // productStatus[product._id.toString()] = product.isDeleted;
  });

  // Validate the cart items
  for (const item of validateData.cart) {
    // if product id in cart is invalid
    if (!productQuantities[item.id]) {
      throw new AppError(400, "Invalid Id!");
    }

    // if product in cart quantity is getter stock
    if (item.quantity > productQuantities[item.id]) {
      throw new AppError(
        400,
        `${
          products.find(
            (product) => product._id === new mongoose.Types.ObjectId(item.id),
          )?.title
        } has only ${productQuantities[item.id]} in stock!`,
      );
    }
  }

  const result = await Order.create(validateData);

  // if order not created successfully
  if (!result) {
    throw new AppError(500, "Something went wrong!");
  }

  return result;
};

const orderServices = {
  addOrder,
};

export default orderServices;
