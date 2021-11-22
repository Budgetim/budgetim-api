import { Response } from 'express';

import Category from '../../models/category';
import { RequestWithUser } from '../../types';
import {
  AddCategoryRequest,
  EditCategoryRequest,
  DeleteCategoryRequest,
  StatisticCategoryRequest,
  GetCategoryStatisticsByDaysRequest
} from './types';

export const getCategories = async (req: RequestWithUser, res: Response) => {
  const { userId } = req;
  const categories = await Category.get(userId);
  res.send(categories);
};

export const addCategory = async (req: AddCategoryRequest, res: Response) => {
  const { body, userId } = req;
  const category = await Category.add({ ...body, userId });
  res.send(category);
};

export const editCategory = async (req: EditCategoryRequest, res: Response) => {
  const { body, userId, params: { id } } = req;
  const category = await Category.edit({
    ...{
      id: +id,
      ...body,
    },
    userId
  });
  res.send(category);
};

export const deleteCategory = async (req: DeleteCategoryRequest, res: Response) => {
  const { params: { id }, userId } = req;
  const category = await Category.delete(+id, userId);
  res.send(category);
};

export const showStatistic = async (req: StatisticCategoryRequest, res: Response) => {
  const { body, userId } = req;
  const result = await Category.showStatistic(body.month, body.year, userId);
  res.send(result);
};

export const getAllStatisticsByDays = async (req: RequestWithUser, res: Response) => {
  const { userId } = req;
  const result = await Category.getAllStatisticsByDays(userId);
  res.send(result);
};

export const getCategoryStatisticsByDays = async (req: GetCategoryStatisticsByDaysRequest, res: Response) => {
  const { body, userId } = req;
  const result = await Category.getCategoryStatisticsByDays(body.categoryId, userId);
  res.send(result);
};
