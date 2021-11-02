import { Category, CategoryWithoutId, RequestWithUser } from '../../types';

export interface AddCategoryRequest extends RequestWithUser {
  body: CategoryWithoutId;
}

export interface EditCategoryRequest extends RequestWithUser {
  body: Category;
}

export interface DeleteCategoryRequest extends RequestWithUser {
  body: {
    id: Category['id'];
  };
}

export interface StatisticCategoryRequest extends RequestWithUser {
  body: {
    month: number;
    year: number;
  };
}
