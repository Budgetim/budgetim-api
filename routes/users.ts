import { Router } from 'express';
import {
  registerUser,
  authenticateUser,
  verify,
  resetPassword,
  updateCurrency,
  getUser,
} from '../controllers/users/users';
import { authenticateToken } from '../middlewares/authenticateToken';

const router = Router();

router.post('/register', registerUser);
router.get('/verify/:id/:token', verify)
router.post('/authenticate', authenticateUser);
router.post('/resetPassword', resetPassword);

router.get('/', authenticateToken, getUser);
router.post('/updateCurrency', authenticateToken, updateCurrency);

export default router;
