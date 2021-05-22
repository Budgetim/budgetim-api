import { Router } from 'express';
import {
  addTransaction,
  deleteTransaction,
  editTransaction,
  getTransactions,
} from '../controllers/transaction';

const router = Router();

router.get('/', getTransactions);
router.post('/add', addTransaction);
router.get('/delete', deleteTransaction);
router.post('/edit', editTransaction);

export default router;
