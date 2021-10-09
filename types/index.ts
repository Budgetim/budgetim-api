import { Request } from 'express';

export interface RequestWithUser extends Request {
  userId: number;
}

export interface Category {
  id: number;
  title: string;
  description: string;
  color: string;
}