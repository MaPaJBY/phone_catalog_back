import express from "express";
import orderController from "../controllers/order.controller";

const orderRouter = express.Router();

orderRouter.get("/", orderController.getAllOrders);
orderRouter.get("/:orderId", orderController.getOrderById);
orderRouter.post("/", orderController.createOrder);
orderRouter.put("/:orderId", orderController.updateOrder);
orderRouter.delete("/:orderId", orderController.deleteOrder);

export default orderRouter;
