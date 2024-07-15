/* eslint-disable @typescript-eslint/no-explicit-any */
import catchAsync from "../../middleware/HOF/catch-async";
import sendResponse from "../../utils/send-response";
import productServices from "./product-service";

// creat add product controller, wrap the middleware by catchAsync to avoid try catch
const addProduct = catchAsync(async (req, res) => {

  // get data from body
  const data = req.body;

  // call service
  const result = await productServices.addProduct(
    data,
  );

  sendResponse(res, {
    message: "Product create successfully!",
    data: result,
  });
});

// productsByIds controller, wrap the middleware by catchAsync to avoid try catch
const getProductsByIds = catchAsync(async (req, res) => {
  // get ids from req.body
  const ids = req.body
  const result = await productServices.getProductsByIds(ids);
  sendResponse(res, { message: "Product retrive successfully!", data: result });
});

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

  // get data from body
  const data = req.body;

  // get id from req.params
  const { id } = req.params;

  // call service
  const result = await productServices.updateProduct(
    id,
    data,
  );

  sendResponse(res, { message: "Product updated successfully!", data: result });
});

// deleteProduct controller, wrap the middleware by catchAsync to avoid try catch
const deleteProduct = catchAsync(async (req, res) => {
  // get id from req.params
  const { id } = req.params;

  // call service
  const result = await productServices.deleteProduct(
    id
  );

  sendResponse(res, { message: "Product udeledet successfully!", data: result });
});

export { addProduct, getProductsByIds, getAllProduct, getSingleProduct, updateProduct, deleteProduct };
