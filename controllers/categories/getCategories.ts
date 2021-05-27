import { Request, Response } from 'express';
import Categories from '../../models/categories';

export const getCategories = async (req: Request, res: Response) => {
  const [data] = await Categories.get();
  res.send(data);
}
