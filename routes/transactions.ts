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
router.post('/', addTransaction);
router.put('/:id', editTransaction);
router.delete('/:id', deleteTransaction);

router.get('/availableMonths', getAvailableMonths);

export default router;
