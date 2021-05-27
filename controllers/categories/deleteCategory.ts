import { Request, Response } from 'express';
import Categories from '../../models/categories';

export interface RequestDeleteCategory extends Request {
  query: {
    id: string;
  }
}

export const deleteCategory = async (req: RequestDeleteCategory, res: Response) => {
  const { query } = req;
  const [data] = await Categories.delete(+query.id);
  res.send(data);
};
