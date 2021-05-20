import { Router } from 'express';
import transactionRouter from './transaction';
import userRouter from './user';

const router = Router();

router.use('/transaction', transactionRouter);
router.use('/user', userRouter);

export default router;
