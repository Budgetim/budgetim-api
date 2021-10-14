import { Router } from 'express';
import { registerUser, authenticateUser } from '../controllers/users/users';

const router = Router();

router.post('/register', registerUser);
router.post('/authenticate', authenticateUser);

export default router;
