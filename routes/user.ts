import { Router } from 'express';
import { login } from '../controllers/auth';
import { createUser } from '../controllers/users';

const router = Router();

router.post('/login', login);
router.post('/signup', createUser);

export default router;
