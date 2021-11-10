import { Router } from 'express';
import { registerUser, authenticateUser, verify, resetPassword } from '../controllers/users/users';

const router = Router();

router.post('/register', registerUser);
router.get('/verify/:id/:token', verify)
router.post('/authenticate', authenticateUser);
router.post('/resetPassword', resetPassword);

export default router;
