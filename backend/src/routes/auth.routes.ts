import { Router } from 'express';
import { register, login, refresh, logout, resetPassword } from '../controllers/auth.controller';

const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/reset-password', resetPassword);
authRouter.post('/refresh', refresh);
authRouter.post('/logout', logout);

export default authRouter;
