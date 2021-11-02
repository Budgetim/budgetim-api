import { Router } from 'express';
import {
  addTransaction,
  deleteTransaction,
  editTransaction,
  getTransactions,
  getAvailableMonths,
} from '../controllers/transactions';

const router = Router();

router.get('/', getTransactions);
router.post('/add', addTransaction);
router.post('/delete', deleteTransaction);
router.post('/edit', editTransaction);
router.get('/availableMonths', getAvailableMonths);

export default router;
