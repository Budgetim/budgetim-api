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
router.get('/:id/delete', deleteCategory);
router.post('/:id/edit', editCategory);

export default router;
