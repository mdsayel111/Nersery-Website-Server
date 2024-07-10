import express from "express";
import productRouter from "../module/product/product-router";
import orderRouter from "../module/order/order-router";

// creat a route
const router = express.Router();

// creat routes array
const routes = [
  {
    path: "/products",
    router: productRouter,
  },
  {
    path: "/orders",
    router: orderRouter
  }
];

// add routes to router
routes.map((route) => router.use(route.path, route.router));

export default router;
