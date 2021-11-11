import { Router } from 'express';
import transactionRouter from './transaction';
import categoryRouter from './category';
import usersRouter from './users';
import currencyRouter from './currency';
import { authenticateToken } from '../middlewares/authenticateToken';

const router = Router();

router.use('/transaction', authenticateToken, transactionRouter);
router.use('/categories', authenticateToken, categoryRouter);
router.use('/users', usersRouter);
router.use('/currency', currencyRouter);

export default router;
