import { Router } from 'express';
import authRouter from './auth.routes';
import taskRouter from './task.routes';

const router = Router();

router.use('/auth', authRouter);
router.use('/tasks', taskRouter);

router.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

export default router;
