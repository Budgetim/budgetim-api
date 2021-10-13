import { Router } from 'express';
import { getCategories, addCategory, deleteCategory, editCategory, showStatistic } from '../controllers/categories';

const router = Router();

router.get('/', getCategories);
router.post('/add', addCategory);
router.post('/delete', deleteCategory);
router.post('/edit', editCategory);
router.post('/statistic', showStatistic);

export default router;
