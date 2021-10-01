import { Router } from 'express';
import transactionRouter from './transaction';
import categoryRouter from './category';
import usersRouter from './users';

const router = Router();

router.use('/transaction', transactionRouter);
router.use('/categories', categoryRouter);
router.use('/users', usersRouter);

export default router;
