/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from "express";
import { TResponse } from "../types/response-type";
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

  // if error is instanse of ZodError
  if (err instanceof ZodError) {
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
