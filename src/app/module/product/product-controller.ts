import catchAsync from "../../middleware/HOF/catch-async";
import sendResponse from "../../utils/send-response";
import productServices from "./product-service";

// creat add product controller, wrap the middleware by catchAsync to avoid try catch
const addProduct = catchAsync(async (req, res) => {
    // get main image local path
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mainImgLocalPath = (req.files as any).image ? (req.files as any).image[0].path : null;

    // get gellary images local paths
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const galleryImgLocalPaths = (req.files as any).imageList ? (req.files as any).imageList.map((img: { path: string }) => img.path) : [];
    const data = req.body

    const result = await productServices.addProduct(mainImgLocalPath, galleryImgLocalPaths, data)
    
    sendResponse(res, { success: true, message: "Product create successfully!", data: result })
})

export {
    addProduct,
}