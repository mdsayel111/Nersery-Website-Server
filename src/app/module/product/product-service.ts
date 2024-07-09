import AppError from "../../errors/app-error";
import cloudinaryFileUploader from "../../lib/cloudinary/upload-image-to-cloudinary";
import { TProduct } from "./product-interface";
import Product from "./product-model";
import { productValidationSchema } from "./product-validation-schema";
import fs from "fs"

// create add product service
const addProduct = async (imgLocalUrl: string, galleryImgLocalPaths: string[], data: TProduct) => {
    // if imageLocalUrl is null
    if (!imgLocalUrl) {
        throw new AppError(400, "Image is required!")
    }
    // if galleryImgLocalPaths < 5
    if (galleryImgLocalPaths.length < 5) {
        throw new AppError(400, "Image list required 5 images!")
    }
    // upload img to cloudinary
    const mainImgUrl = await cloudinaryFileUploader.singleFile(imgLocalUrl)

    // upload gallery img to cloudinary
    const galleryImgUrls = await cloudinaryFileUploader.multipleFile(galleryImgLocalPaths)

    // create newData obj for add DB
    const newData = { ...data, imgUrl: mainImgUrl, imgList: galleryImgUrls }

    // delete main image from upload folder
    fs.unlinkSync(imgLocalUrl)

    // delete gellary image from upload foldr
    galleryImgLocalPaths.map(path => fs.unlinkSync(path))

    // validate data by zod
    const validateData = productValidationSchema.parse(newData)

    // create product into DB
    const result = Product.create(validateData)

    // if result is null
    if (!result) {
        throw new AppError(400, "Failed to add product!")
    }

    return result
}

const productServices = {
    addProduct
}

export default productServices