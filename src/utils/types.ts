import { Request, Response } from 'express';

export type ControllerAction = (req: Request, res: Response) => void;

export interface OrderProduct {
  productId: number;
  quantity: number;
  price: number;
}