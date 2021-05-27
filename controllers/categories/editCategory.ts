import { Request, Response } from 'express';
import Categories from '../../models/categories';

export interface RequestEditCategory extends Request {
  body: {
    id: number;
    title: string;
    description: string;
  }
}

export const editCategory = async (req: RequestEditCategory, res: Response) => {
  const { body } = req;
  await Categories.edit(body);
  res.send(200);
};
