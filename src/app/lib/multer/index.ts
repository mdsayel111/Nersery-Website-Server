import { Request } from "express";
import multer, { FileFilterCallback } from "multer";

// create storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + "/uploads");
  },
  filename: function (req, file, cb) {
    // extact file extention
    const ext = file.originalname.substring(
      file.originalname.lastIndexOf("."),
      file.originalname.length,
    );

    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

// create file filter function
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
) => {
  // extact file extention
  const ext = file.originalname.substring(
    file.originalname.lastIndexOf("."),
    file.originalname.length,
  );

  // if file is not image
  if (![".png", ".jpg", ".jpeg"].includes(ext.toLowerCase())) {
    // occur error
    return cb(new Error("Only images are allowed!"));
  }

  // if no error occur
  cb(null, true);
};

// create uploader
const upload = multer({ storage: storage, fileFilter: fileFilter });

const uploadMultiple = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "imageList", maxCount: 5 },
]);

const uploader = { upload, uploadMultiple };
export default uploader;
