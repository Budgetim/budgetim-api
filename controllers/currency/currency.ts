import { Response, Request } from 'express';

import Currency from '../../models/currency';

export const getCurrencies = async (req: Request, res: Response) => {
  const categories = await Currency.get();
  res.send(categories);
};
