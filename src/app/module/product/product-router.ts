import express from "express";
import {
  addProduct,
  deleteProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
} from "./product-controller";
import uploader from "../../lib/multer";

//creat product router
const productRouter = express.Router();

// add create product route
productRouter.post(
  "/",
  uploader.uploadMultiple,
  (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  addProduct,
);

// add getAllProduct route
productRouter.get("/", getAllProduct);

// add getSingleProduct route
productRouter.get("/:id", getSingleProduct);

// add updateProduct route
productRouter.patch(
  "/:id",
  uploader.uploadMultiple,
  (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  updateProduct,
);

// add delete product route
productRouter.patch(
  "/:id",
  deleteProduct,
);

export default productRouter;
