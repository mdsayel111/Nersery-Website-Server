import mongoose from "mongoose";
import AppError from "../../errors/app-error";
import cloudinaryFileUploader from "../../lib/cloudinary/upload-image-to-cloudinary";
import QueryBuilder from "../../query-buelder";
import { TProduct } from "./product-interface";
import Product from "./product-model";
import {
  productUodateValidationSchema,
  productValidationSchema,
} from "./product-validation-schema";
import fs from "fs";

// create add product service
const addProduct = async (
  imgLocalUrl: string,
  galleryImgLocalPaths: string[],
  data: TProduct,
) => {
  // if imageLocalUrl is null
  if (!imgLocalUrl) {
    throw new AppError(400, "Image is required!");
  }

  // if galleryImgLocalPaths < 5
  if (galleryImgLocalPaths.length < 5) {
    throw new AppError(400, "Image list required 5 images!");
  }

  // upload img to cloudinary
  const mainImgUrl = await cloudinaryFileUploader.singleFile(imgLocalUrl);

  // upload gallery img to cloudinary
  const galleryImgUrls =
    await cloudinaryFileUploader.multipleFile(galleryImgLocalPaths);

  // create newData obj for add DB
  const newData = { ...data, imgUrl: mainImgUrl, imgList: galleryImgUrls };

  // delete main image from upload folder
  fs.unlinkSync(imgLocalUrl);

  // delete gellary image from upload foldr
  galleryImgLocalPaths.map((path) => fs.unlinkSync(path));

  // validate data by zod
  const validateData = productValidationSchema.parse(newData);

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
  modelQuery.search(["title", "description", "category"]).filter().sort();
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
  imgLocalUrl: string,
  galleryImgLocalPaths: string[],
  data: Partial<TProduct>,
) => {
  let mainImgUrl: string | undefined;
  let galleryImgUrls: string[] | undefined;

  // if imageLocalUrl is not null
  if (imgLocalUrl) {
    // upload img to cloudinary
    mainImgUrl = await cloudinaryFileUploader.singleFile(imgLocalUrl);
    // delete main image from upload folder
    fs.unlinkSync(imgLocalUrl);
  }

  // if galleryImgLocalPaths > 0
  if (galleryImgLocalPaths.length > 0) {
    // upload gallery img to cloudinary
    galleryImgUrls =
      await cloudinaryFileUploader.multipleFile(galleryImgLocalPaths);
    // delete gellary image from upload foldr
    galleryImgLocalPaths.map((path) => fs.unlinkSync(path));
  }

  // get data fromDB
  const productFromDB = await Product.findOne({
    _id: new mongoose.Types.ObjectId(id),
    isDeleted: false,
  });

  // if product not found
  if (!productFromDB) {
    throw new AppError(400, "Product not found!");
  }

  if (mainImgUrl) {
    data.imgUrl = mainImgUrl;
  }

  // if galleryImgUrls exist and galleryImgUrls.length > 0
  if (galleryImgUrls && galleryImgUrls.length > 0) {
    // create new imgList by slice imgList from Db
    const imgList = productFromDB?.imgList.slice(galleryImgUrls.length);

    // insert new imgList in data
    data.imgList = [...galleryImgUrls, ...imgList];
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

const productServices = {
  addProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
};

export default productServices;
