import { Request, Response } from 'express';
import Categories from '../../models/categories';

interface AddCategoryRequest extends Request {
  body: {
    title: string;
    description: string;
  }
}

export const addCategory = async (req: AddCategoryRequest, res: Response) => {
  const { body } = req;
  await Categories.add(body);
  res.send(200);
};
