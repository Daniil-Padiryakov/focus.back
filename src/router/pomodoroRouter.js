import Router from 'express'
import PomodoroController from "../controllers/pomodoroController.js";
import authMiddleware from "../middlewares/auth-middleware.js";
const router = new Router()

router.post('/', PomodoroController.create)
router.get('/', authMiddleware, PomodoroController.getAll)

export default router