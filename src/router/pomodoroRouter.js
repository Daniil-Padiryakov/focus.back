const Router = require('express')
const PomodoroController = require('../controllers/pomodoroController.js')
const authMiddleware = require('../middlewares/auth-middleware.js')
const router = new Router()

router.post('/', PomodoroController.create)
router.get('/', authMiddleware, PomodoroController.getAll)

module.exports = router
