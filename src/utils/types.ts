import { Request, Response } from 'express';

export type ControllerAction = (req: Request, res: Response) => void;

export interface OrderAttributes {
  id: string;
  productId: string;
  userId: string;
  quantity: number;
  price: number;
  status: string;
}

export interface OrderWithTotalPrice extends OrderAttributes {
  totalPrice: number;
}