import Order from '../models/order';
import { OrderProduct } from '../utils/types';

const getAllOrders = async (): Promise<Order[]> => {
  return Order.findAll();
};

const getOrderById = async (orderId: number): Promise<Order | null> => {
  return Order.findByPk(orderId);
};

const createOrder = async (orderData: {
  userId: string;
  totalAmount: number;
  products: OrderProduct[];
}): Promise<Order> => {
  return Order.create(orderData);
};

const updateOrder = async (
  orderId: number,
  orderData: Partial<{
    userId: string;
    totalAmount: number;
    products: string;
  }>
): Promise<Order | null> => {
  const order = await Order.findByPk(orderId);
  if (!order) {
    return null;
  }

  return order.update(orderData);
};

const deleteOrder = async (orderId: number) => {
  const order = await Order.findByPk(orderId);
  if (!order) {
    return false;
  }

  await order.destroy();
  return true;
};

const orderService = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};

export default orderService;