import { Router } from 'express';
import { getCategories } from '../controllers/categories';
import { addCategory } from '../controllers/categories/addCategories';
import { editCategory } from '../controllers/categories/editCategory';
import { deleteCategory } from '../controllers/categories/deleteCategory';

const router = Router();

router.get('/', getCategories);
router.post('/add', addCategory);
router.post('/delete', deleteCategory);
router.post('/edit', editCategory);

export default router;
