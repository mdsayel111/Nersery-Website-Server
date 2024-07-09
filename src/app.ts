import { Request, Response } from "express";
import express from "express";
import { globalErrorHandleMiddleware } from "./app/middleware/global-error-handle-middleware";
import router from "./app/routes";

// creat app
const app = express()

// add middleware to app
app.get("/", (req: Request, res: Response) => {
    res.send("hellow world!")
});

// add all root router to app
app.use("/api/v1", router)

// add not found route
app.all("*", (req: Request, res: Response) => {
    res.send({
        sucsess: false,
        status: 404,
        message: "No route find!"
    })
})

// add global error handler
app.use(globalErrorHandleMiddleware)

export default app