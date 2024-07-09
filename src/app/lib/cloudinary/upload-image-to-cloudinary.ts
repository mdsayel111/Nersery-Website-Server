import cloudinary from "cloudinary";
// cloudinary config
cloudinary.v2.config({
    cloud_name: "dqnrwhshc",
    api_key: "689878862434133",
    api_secret: "KHRBINkaDXRH1f0aGm5mNWvu1f0",
});

// creat cloudinary file uploader function
const singleFile = async (url: string) => {
    // upload image to cloudinary
    const response = await cloudinary.v2.uploader.upload(url)
    return response.url
}

const multipleFile = async (urls: string[]) => {
    // upload images to cloudinary and store returned promises as array. 
    // note: singleFile return cloudinary response promise
    const cloudinaryUrlsPromises = urls.map(singleFile)

    // create new promise for resolve all promise of cloudinaryUrlsPromises
    // note: the gellaryImgUrls will be the respone of cloudinary, here all cloudinary promise resolves.
    const gelleryImgUrls = await Promise.all(cloudinaryUrlsPromises)

    return gelleryImgUrls
}

const cloudinaryFileUploader = {
    singleFile,
    multipleFile
}

export default cloudinaryFileUploader