import { Router } from 'express';
import { registerUser, authenticateUser, verify } from '../controllers/users/users';

const router = Router();

router.post('/register', registerUser);
router.get('/verify/:id/:token', verify)
router.post('/authenticate', authenticateUser);

export default router;
