import { Response } from "express";
import { TResponse } from "../types/response-type";

const sendResponse = (res: Response, data: Omit<TResponse, "status">) => {
    res.send({ ...data, status: 200 })
}

export default sendResponse