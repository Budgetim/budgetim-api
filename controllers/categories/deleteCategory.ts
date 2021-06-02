import { Request, Response } from 'express';
import Categories from '../../models/categories';

export interface RequestDeleteCategory extends Request {
  params: {
    id: string;
  }
}

export const deleteCategory = async (req: RequestDeleteCategory, res: Response) => {
  const { params } = req;
  const [data] = await Categories.delete(+params.id);
  res.send(data);
};
