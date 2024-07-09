import { ZodError } from "zod";
import { TResponse } from "../types/response-type";

// create zod error handler
const zodErrorHandler = (err: ZodError): TResponse => {
    // last index of err.errors[0].path array's
    const lastPathIndx = err.errors[0].path.length - 1;

    // create error path
    const path = err.errors[0].path[lastPathIndx]

    // create error message
    const message = `'${path}' is  ${err.errors[0].message.toLowerCase()}`



    // return errObj
    return {
        success: false,
        status: 403,
        message: message,
        path: [
            {
                path,
                message,
            },
        ],
        stackTrace: err.stack,
    };
}

export default zodErrorHandler