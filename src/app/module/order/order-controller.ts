import catchAsync from "../../middleware/HOF/catch-async";
import sendResponse from "../../utils/send-response";
import orderServices from "./order-service";


// creat add order controller, wrap the middleware by catchAsync to avoid try catch
const addOrder = catchAsync(async (req, res) => {
    // get data from body
    const data = req.body;

    // call service
    const result = await orderServices.addOrder(data)

    sendResponse(res, {
        message: "Product create successfully!",
        data: result,
    });
});



export { addOrder };
