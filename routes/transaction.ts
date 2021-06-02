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
router.get('/:id/delete', deleteTransaction);
router.post('/:id/edit', editTransaction);

export default router;
