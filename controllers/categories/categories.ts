import { Response } from 'express';
import Category from '../../models/category';
import { RequestWithUser } from '../../types';

export const getCategories = async (req: RequestWithUser, res: Response) => {
  const { userId } = req;
  const categories = await Category.get(userId);
  res.send(categories);
};

interface AddCategoryRequest extends RequestWithUser {
  body: {
    title: string;
    color: string | null;
    description: string | null;
  };
}

export const addCategory = async (req: AddCategoryRequest, res: Response) => {
  const { body, userId } = req;
  // @ts-ignore
  const category = await Category.add({ ...body, userId });
  res.send(category);
};

export interface EditCategoryRequest extends RequestWithUser {
  body: {
    id: number;
    title: string;
    color: string | null;
    description: string | null;
  };
}

export const editCategory = async (req: EditCategoryRequest, res: Response) => {
  const { body, userId } = req;
  const category = await Category.edit({ ...body, userId });
  res.send(category);
};

export interface DeleteCategoryRequest extends RequestWithUser {
  params: {
    id: string;
  }
}

export const deleteCategory = async (req: DeleteCategoryRequest, res: Response) => {
  const { body: { id }, userId } = req;
  const category = await Category.delete(+id, userId);
  res.send(category);
};
