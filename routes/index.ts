import { Router } from 'express';
import transactionRouter from './transaction';
import categoryRouter from './category';

const router = Router();

router.use('/transaction', transactionRouter);
router.use('/categories', categoryRouter);

export default router;
