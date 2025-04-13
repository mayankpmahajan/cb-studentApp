import express, {Router} from 'express';
import { googleController } from './authController';
import { authMiddleware } from '../../middleware/authMiddleware';


const authRouter = Router();


authRouter.post('/google', googleController);

export default authRouter;