import { Router } from 'express';
import transactionsRouter from './transactions';
import categoriesRouter from './categories';
import usersRouter from './users';
import currenciesRouter from './currencies';
import { authenticateToken } from '../middlewares/authenticateToken';

const router = Router();

router.use('/users', usersRouter);
router.use('/transactions', authenticateToken, transactionsRouter);
router.use('/categories', authenticateToken, categoriesRouter);
router.use('/currencies', currenciesRouter);

export default router;
