import { Request, Response } from "express";

export type ControllerAction = (req: Request, res: Response) => void;

export interface OrderItem {
  column: string;
  direction: "ASC" | "DESC";
}

export enum SortType {
  AZ = 'az',
  ZA = 'za',
  LOW_TO_HIGH = 'lowToHigh',
  HIGH_TO_LOW = 'highToLow',
  WITHOUT_SORT = 'without-sort',
  SHOW_ALL = 'show-all',
  NEWEST_TO_OLDEST = 'newest-to-oldest',
  OLDEST_TO_NEWEST = 'oldest-to-newest',
}
