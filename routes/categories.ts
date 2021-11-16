import { Router } from 'express';
import {
  getCategories,
  addCategory,
  deleteCategory,
  editCategory,
  showStatistic,
} from '../controllers/categories';

const router = Router();

router.get('/', getCategories);
router.post('/', addCategory);
router.put('/:id', editCategory);
router.delete('/:id', deleteCategory);

router.post('/statistic', showStatistic);

export default router;
