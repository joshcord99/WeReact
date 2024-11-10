import { Router } from 'express';
import { userRouter } from './userRoutes.js';
// import { studentRouter } from './studentRoutes.js';
const router = Router();
router.use('/users', userRouter);
// router.use('/students', studentRouter);
export default router;
