import { Router } from 'express';
import {
  getCategories,
  addCategory,
  deleteCategory,
  editCategory,
} from '../controllers/categories';

const router = Router();

router.get('/', getCategories);
router.post('/add', addCategory);
router.get('/delete', deleteCategory);
router.post('/edit', editCategory);

export default router;
