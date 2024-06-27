import Order from "../models/order";
import { OrderAttributes, OrderWithTotalPrice } from "../utils/types";

const calculateTotalPrice = (quantity: number, price: number): number => {
  return quantity * price;
};

const getAllOrders = async (): Promise<OrderWithTotalPrice[]> => {
  const orders = await Order.findAll();
  const ordersWithTotalPrice = orders.map(order => ({
    ...order.toJSON(),
    totalPrice: calculateTotalPrice(order.quantity, order.price),
  }));
  return ordersWithTotalPrice;
};

const getOrderById = async (orderId: string): Promise<OrderWithTotalPrice | null> => {
  const order = await Order.findByPk(orderId);
  if (order) {
    const totalPrice = calculateTotalPrice(order.quantity, order.price);
    return {
      ...order.toJSON(),
      totalPrice,
    } as OrderWithTotalPrice; 
  }
  return null;
};

const createOrder = async (orderData: Partial<OrderAttributes>): Promise<OrderWithTotalPrice> => {
  const order = await Order.create(orderData);
  const totalPrice = calculateTotalPrice(order.quantity, order.price);
  return {
    ...order.toJSON(),
    totalPrice,
  } as OrderWithTotalPrice;
};

const updateOrder = async (orderId: string, updatedOrder: Partial<OrderAttributes>): Promise<OrderWithTotalPrice | null> => {
  const order = await Order.findByPk(orderId);
  if (order) {
    await order.update(updatedOrder);
    const totalPrice = calculateTotalPrice(order.quantity, order.price);
    return {
      ...order.toJSON(),
      totalPrice,
    } as OrderWithTotalPrice;
  }
  return null;
};

const deleteOrder = async (orderId: string): Promise<Order | null> => {
  const order = await Order.findByPk(orderId);
  if (order) {
    await order.destroy();
    return order as Order;
  }
  return null;
};

const orderService = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};

export default orderService;
