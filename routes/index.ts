import { Router } from 'express';
import transactionRouter from './transaction';
import categoriesRouter from './categories';
import userRouter from './user';

const router = Router();

router.use('/transaction', transactionRouter);
router.use('/categories', categoriesRouter);
router.use('/user', userRouter);

export default router;
