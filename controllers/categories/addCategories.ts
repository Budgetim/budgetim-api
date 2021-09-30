import { Request, Response } from 'express';
import Category from '../../models/category';

interface AddCategoryRequest extends Request {
  body: {
    title: string;
    color: string | null;
    description: string | null;
  };
}

export const addCategory = async (req: AddCategoryRequest, res: Response) => {
  const { body } = req;
  // @ts-ignore
  const category = await Category.add(body);
  res.send(category);
};
