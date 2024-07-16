import express from "express";
import {
  addProduct,
  deleteProduct,
  getAllProduct,
  getProductsByIds,
  getSingleProduct,
  updateProduct,
} from "./product-controller";

//creat product router
const productRouter = express.Router();

// add create product route
productRouter.post(
  "/",
  addProduct,
);

// add getAllProduct route
productRouter.get("/", getAllProduct);

// add get products by ids route
productRouter.post("/products-by-ids", getProductsByIds);

// add getSingleProduct route
productRouter.get("/:id", getSingleProduct);

// add updateProduct route
productRouter.patch(
  "/:id",
  updateProduct,
);

// add delete product route
productRouter.delete(
  "/:id",
  deleteProduct,
);

export default productRouter;
