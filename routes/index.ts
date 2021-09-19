import { Router } from 'express';
import transactionRouter from './transaction';

const router = Router();

router.use('/transaction', transactionRouter);

export default router;
