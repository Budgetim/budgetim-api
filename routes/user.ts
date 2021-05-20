import { Router } from 'express';
import { logIn } from '../controllers/user';

const router = Router();

router.get('/login', logIn);

export default router;
