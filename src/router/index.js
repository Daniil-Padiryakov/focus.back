const Router = require('express')
const userRouter = require('./userRouter.js')
const pomodoroRouter = require('./pomodoroRouter.js')
const categoryRouter = require('./categoryRouter.js')

const router = new Router()

router.use('/user', userRouter)
router.use('/pomodoro', pomodoroRouter)
router.use('/category', categoryRouter)

module.exports = router
