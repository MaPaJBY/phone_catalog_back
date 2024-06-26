import { Request, Response } from "express";
import orderService from "../services/order.services";
import { handleErrors } from "../utils/handleErrors";
import { OrderProduct } from "../utils/types";

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await orderService.getAllOrders();
    res.json(orders);
  } catch (error) {
    handleErrors(res, error);
  }
};

const getOrderById = async (req: Request, res: Response) => {
  try {
    const orderId = parseInt(req.params.id, 10);
    const order = await orderService.getOrderById(orderId);

    if (!order) {
      res.status(404).json({
        errType: "404",
        msg: "Order not found",
      });
      return;
    }

    res.json(order);
  } catch (error) {
    handleErrors(res, error);
  }
};

const createOrder = async (req: Request, res: Response) => {
  try {
    const { userId, products } = req.body;
    
    const totalAmount = products.reduce((sum: number, product: OrderProduct) => {
      return sum + (product.price * product.quantity);
    }, 0);

    const newOrder = await orderService.createOrder({ userId, totalAmount, products });
    res.status(201).json(newOrder);
  } catch (error) {
    handleErrors(res, error);
  }
};

const updateOrder = async (req: Request, res: Response) => {
  try {
    const orderId = parseInt(req.params.id, 10);
    const { userId, totalAmount, products } = req.body;
    const updatedOrder = await orderService.updateOrder(orderId, {
      userId,
      totalAmount,
      products,
    });

    if (!updatedOrder) {
      res.status(404).json({
        errType: "404",
        msg: "Order not found",
      });
      return;
    }

    res.json(updatedOrder);
  } catch (error) {
    handleErrors(res, error);
  }
};

const deleteOrder = async (req: Request, res: Response) => {
  try {
    const orderId = parseInt(req.params.id, 10);
    await orderService.deleteOrder(orderId);
    res.status(204).end();
  } catch (error) {
    handleErrors(res, error);
  }
};

const orderController = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};

export default orderController;
