import { Router } from 'express';
import {
  addTransaction,
  deleteTransaction,
  editTransaction,
  getTransactions,
} from '../controllers/transactions';

const router = Router();

router.get('/', getTransactions);
router.post('/add', addTransaction);
router.post('/delete', deleteTransaction);
router.post('/edit', editTransaction);

export default router;
