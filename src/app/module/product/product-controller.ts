/* eslint-disable @typescript-eslint/no-explicit-any */
import catchAsync from "../../middleware/HOF/catch-async";
import sendResponse from "../../utils/send-response";
import productServices from "./product-service";

// creat add product controller, wrap the middleware by catchAsync to avoid try catch
const addProduct = catchAsync(async (req, res) => {
  // get main image local path
  const mainImgLocalPath = (req.files as any)?.image
    ? (req.files as any).image[0].path
    : null;

  // get gellary images local paths
  const galleryImgLocalPaths = (req.files as any)?.imageList
    ? (req.files as any).imageList.map((img: { path: string }) => img.path)
    : [];

  // get data from body
  const data = req.body;

  // call service
  const result = await productServices.addProduct(
    mainImgLocalPath,
    galleryImgLocalPaths,
    data,
  );

  sendResponse(res, {
    message: "Product create successfully!",
    data: result,
  });
});

// getAllProduct controller, wrap the middleware by catchAsync to avoid try catch
const getAllProduct = catchAsync(async (req, res) => {
  // get query from req.query
  const query = req.query;
  const result = await productServices.getAllProduct(query);
  sendResponse(res, { message: "Product retrive successfully!", data: result });
});

// getSingleProduct controller, wrap the middleware by catchAsync to avoid try catch
const getSingleProduct = catchAsync(async (req, res) => {
  // get query from req.query
  const { id } = req.params;
  const result = await productServices.getSingleProduct(id);
  sendResponse(res, { message: "Product retrive successfully!", data: result });
});

// updateProduct controller, wrap the middleware by catchAsync to avoid try catch
const updateProduct = catchAsync(async (req, res) => {
  // get main image local path
  const mainImgLocalPath = (req.files as any)?.image
    ? (req.files as any).image[0].path
    : null;

  // get gellary images local paths
  const galleryImgLocalPaths = (req.files as any)?.imageList
    ? (req.files as any).imageList.map((img: { path: string }) => img.path)
    : [];

  // get data from body
  const data = req.body;

  // get id from req.params
  const { id } = req.params;

  // call service
  const result = await productServices.updateProduct(
    id,
    mainImgLocalPath,
    galleryImgLocalPaths,
    data,
  );

  sendResponse(res, { message: "Product updated successfully!", data: result });
});

export { addProduct, getAllProduct, getSingleProduct, updateProduct };
