import { RequestHandler } from "express";

// create catch async function to avoid try catch
const catchAsync = (fun: RequestHandler) => {
    const middleware: RequestHandler = (req, res, next) => {
        Promise.resolve(fun(req, res, next)).catch(err => next(err))
    }
    return middleware
}

export default catchAsync