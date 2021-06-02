import { Request, Response } from 'express';
import Categories from '../../models/categories';

export interface RequestEditCategory extends Request {
  params: {
    id: string;
  }
  body: {
    title: string;
    description: string;
  }
}

export const editCategory = async (req: RequestEditCategory, res: Response) => {
  const { body, params } = req;
  await Categories.edit({ ...body, id: +params.id });
  res.send(200);
};
