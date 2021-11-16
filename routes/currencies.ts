import { Router } from 'express';
import { getCurrencies } from '../controllers/currency';

const router = Router();

router.get('/', getCurrencies);

export default router;
