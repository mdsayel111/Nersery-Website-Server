import catchAsync from "../../middleware/HOF/catch-async";
import sendResponse from "../../utils/send-response";
import productServices from "./product-service";

// creat add product controller, wrap the middleware by catchAsync to avoid try catch
const addProduct = catchAsync(async (req, res) => {
    const imgLocalFilePath = req.file!.path
    const data = req.body
    const result = await productServices.addProduct(imgLocalFilePath, data)
    sendResponse(res, { success: true, message: "Product create successfully!" })
})

export {
    addProduct,
}