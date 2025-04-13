import express from 'express';
import authRouter from './auth/authRouter';
import mappingRouter from './mappings/mappingRouter';
import studentRouter from './student/studentRouter';

const router = express.Router();
router.use('/auth', authRouter);
router.use('/mappings', mappingRouter)
router.use('/student', studentRouter)

export default router;