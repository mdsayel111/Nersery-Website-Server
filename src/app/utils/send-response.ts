import { Response } from "express";
import { TResponse } from "../types/response-type";

const sendResponse = (
  res: Response,
  data: Omit<TResponse, "status" | "success">,
) => {
  res.send({ success: true, status: 200, ...data });
};

export default sendResponse;
