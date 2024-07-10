/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from "express";
import { TResponse } from "../types/response-type";
import multer from "multer";
import { ZodError } from "zod";
import zodErrorHandler from "../error-handler/zod-error-handler";

// creat global error handle middleware
export const globalErrorHandleMiddleware: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  // status variable for send status code
  let status = 500;
  // creat errObj for send response
  let errObj: TResponse = {
    success: false,
    status,
    message: "Internal server error!",
  };

  // if err is instanse of multer error
  if (err instanceof multer.MulterError) {
    console.log(err);
  }
  // if error is instanse of ZodError
  else if (err instanceof ZodError) {
    status = 403;
    errObj = zodErrorHandler(err);
  }
  // if no error match above
  else if (err) {
    // set error response status
    status = 400;
    // set errObj
    errObj = {
      success: false,
      status,
      message: err.message,
    };
  }
  console.log(err);

  res.status(status).send(errObj);
};
