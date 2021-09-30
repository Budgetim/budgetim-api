import { Request, Response } from 'express';
import Category from '../../models/category';

export interface EditCategoryRequest extends Request {
  body: {
    id: number;
    title: string;
    color: string | null;
    description: string | null;
  };
}

export const editCategory = async (req: EditCategoryRequest, res: Response) => {
  const { body } = req;
  const category = await Category.edit(body);
  res.send(category);
};
