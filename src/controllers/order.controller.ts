import { Request, Response } from "express";
import orderService from "../services/order.services";
import { handleErrors } from "../utils/handleErrors";

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
    const { orderId } = req.params;
    const order = await orderService.getOrderById(orderId);
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({
        errType: "404",
        msg: "Order not found"
      });
    }
  } catch (error) {
    handleErrors(res, error);
  }
};

const createOrder = async (req: Request, res: Response) => {
  const { id, productId, userId, quantity, price, status } = req.body;

  if (!id || !productId || !userId || !quantity || !price || !status) {
    return res.status(400).json({
      errType: "400",
      msg: "All fields are required: id, productId, userId, quantity, price, status"
    });
  }
  try {
    const order = await orderService.createOrder(req.body);
    res.status(201).json(order);
  } catch (error) {
    handleErrors(res, error);
  }
};

const updateOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const order = await orderService.updateOrder(orderId, req.body);
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({
        errType: "404",
        msg: "Order not found",
      });
    }
  } catch (error) {
    handleErrors(res, error);
  }
};

const deleteOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const order = await orderService.deleteOrder(orderId);
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({
        errType: "404",
        msg: "Order not found",
      });
    }
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
