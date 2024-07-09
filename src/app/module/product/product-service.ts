import cloudinaryFileUploader from "../../utils/upload-image-to-cloudinary";
import { TProduct } from "./product-interface";
import { productValidationSchema } from "./product-validation-schema";

// create add product service
const addProduct = async (imgLocalUrl: string, data: TProduct) => {
    const resFromCloudinary = await cloudinaryFileUploader(imgLocalUrl)
    const newData = { ...data, imgUrl: resFromCloudinary.url }
    const validateData = productValidationSchema.parse(newData)
    console.log(validateData);
}

const productServices = {
    addProduct
}

export default productServices