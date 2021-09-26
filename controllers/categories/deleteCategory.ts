import { Request, Response } from 'express';
import Category from '../../models/category';

export interface DeleteCategoryRequest extends Request {
  params: {
    id: string;
  }
}

export const deleteCategory = async (req: DeleteCategoryRequest, res: Response) => {
  const { body: { id } } = req;
  const category = await Category.delete(+id);
  res.send(category);
};
