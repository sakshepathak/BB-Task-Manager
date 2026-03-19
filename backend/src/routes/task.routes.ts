import { Router } from 'express';
import { getTasks, createTask, updateTask, deleteTask, toggleTask } from '../controllers/task.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

// Apply authentication to all task routes
router.use(authenticate as any);

router.get('/', getTasks as any);
router.post('/', createTask as any);
router.patch('/:id', updateTask as any);
router.delete('/:id', deleteTask as any);
router.patch('/:id/toggle', toggleTask as any);

export default router;
