import express from "express"
import { addProduct } from "./product-controller"
import uploader from "../../lib/multer"

//creat product router
const productRouter = express.Router()

// add create product route
productRouter.post("/", uploader.uploadMultiple, (req, res, next) => {
    req.body = JSON.parse(req.body.data)
    next()
}, addProduct)


export default productRouter