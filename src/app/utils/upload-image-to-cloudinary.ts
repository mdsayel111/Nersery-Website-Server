import cloudinary from "cloudinary";
// cloudinary config
cloudinary.v2.config({
    cloud_name: "dqnrwhshc",
    api_key: "689878862434133",
    api_secret: "KHRBINkaDXRH1f0aGm5mNWvu1f0",
});

// creat cloudinary file uploader function
const cloudinaryFileUploader = async (url: string) => {
    const response = await cloudinary.v2.uploader.upload(url)
    return response
}

export default cloudinaryFileUploader