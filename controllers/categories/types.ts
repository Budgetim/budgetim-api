import { CategoryWithoutId, RequestWithUser } from '../../types';

export interface AddCategoryRequest extends RequestWithUser {
  body: CategoryWithoutId;
}

export interface EditCategoryRequest extends RequestWithUser {
  body: CategoryWithoutId;
  params: {
    id: string;
  };
}

export interface DeleteCategoryRequest extends RequestWithUser {
  params: {
    id: string;
  };
}

export interface StatisticCategoryRequest extends RequestWithUser {
  body: {
    month: number;
    year: number;
  };
}

export interface GetAllStatisticsByDaysRequest extends RequestWithUser {
  body: {
    month: number;
    year: number;
  };
}

export interface GetCategoryStatisticsByDaysRequest extends RequestWithUser {
  body: {
    categoryId: number;
  };
}
