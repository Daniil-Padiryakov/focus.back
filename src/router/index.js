import Router from 'express'
import userRouter from './userRouter.js'
import pomodoroRouter from './pomodoroRouter.js'
import categoryRouter from "./categoryRouter.js";

const router = new Router()

router.use('/user', userRouter)
router.use('/pomodoro', pomodoroRouter)
router.use('/category', categoryRouter)

export default router