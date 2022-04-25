const Router = require('express')
const CategoryController = require('../controllers/categoryController.js')
const authMiddleware = require('../middlewares/auth-middleware.js')
const router = new Router()

router.post('/', authMiddleware, CategoryController.create)
router.get('/', authMiddleware, CategoryController.getAll)
router.put('/', authMiddleware, CategoryController.update)
router.delete('/:id', authMiddleware, CategoryController.delete)

module.exports = router
