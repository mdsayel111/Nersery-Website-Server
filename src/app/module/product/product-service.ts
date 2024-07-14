import mongoose from "mongoose";
import AppError from "../../errors/app-error";
import QueryBuilder from "../../query-buelder";
import { TProduct } from "./product-interface";
import Product from "./product-model";
import {
  productUodateValidationSchema,
  productValidationSchema,
} from "./product-validation-schema";

// create add product service
const addProduct = async (
  data: TProduct,
) => {

  // validate data by zod
  const validateData = productValidationSchema.parse(data);

  // create product into DB
  const result = Product.create(validateData);

  // if product not created successfully
  if (!result) {
    throw new AppError(500, "Something went wrong!");
  }

  // if result is null
  if (!result) {
    throw new AppError(400, "Failed to add product!");
  }

  return result;
};

// create  getAllProduct service
const getAllProduct = async (query: Record<string, unknown>) => {
  // creat an instance of Query builder
  const modelQuery = new QueryBuilder(Product.find(), query);
  modelQuery.search(["title", "description", "category"]).filter().sort().limit();

  // get data from DB
  const result = await modelQuery.model;

  // if product not retrive successfully
  if (!result) {
    throw new AppError(500, "Something went wrong!");
  }

  return result;
};

// create  getSingleProduct service
const getSingleProduct = async (id: string) => {
  const result = await Product.findOne({
    _id: new mongoose.Types.ObjectId(id),
    isDeleted: false,
  });

  // if product not found
  if (!result) {
    throw new AppError(400, "Product not found!");
  }
  return result;
};

// create  updateProduct service
const updateProduct = async (
  id: string,
  data: Partial<TProduct>,
) => {

  // get data fromDB
  const productFromDB = await Product.findOne({
    _id: new mongoose.Types.ObjectId(id),
    isDeleted: false,
  });

  // if product not found
  if (!productFromDB) {
    throw new AppError(400, "Product not found!");
  }

  if (data?.imgList?.length && data?.imgList?.length > 0) {
    productFromDB.imgList = [...data.imgList, ...productFromDB.imgList.slice(0, data.imgList?.length - 1)]
  }

  // validate data
  const validateData = productUodateValidationSchema.parse(data);

  // update product
  const result = Product.findByIdAndUpdate(id, validateData, { new: true });

  // if product not updated successfully
  if (!result) {
    throw new AppError(500, "Something went wrong!");
  }

  return result;
};

// create  getSingleProduct service
const deleteProduct = async (id: string) => {
  // find the product and update
  const result = await Product.findByIdAndUpdate(id, { isDeleted: true });

  // if product not deled successfully
  if (!result) {
    throw new AppError(400, "Product not found!");
  }
  return result;
};

const productServices = {
  addProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct
};

export default productServices;
