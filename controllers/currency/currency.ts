import { Response, Request } from 'express';

import Currency from '../../models/currency';

export const getCurrencies = async (req: Request, res: Response) => {
  //const categories = await Currency.get();
  //res.send(categories);
  res.send({
    secret: process.env.BUDGETIM_SECRET,
    more: 2,
  })
};
