import Router from 'express'
import CategoryController from "../controllers/categoryController.js";
import authMiddleware from "../middlewares/auth-middleware.js";
const router = new Router()

router.post('/', authMiddleware, CategoryController.create)
router.get('/', authMiddleware, CategoryController.getAll)
router.put('/', authMiddleware, CategoryController.update)
router.delete('/:id', authMiddleware, CategoryController.delete)

export default router