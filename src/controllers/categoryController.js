const CategoryService = require('../services/categoryService.js')

class CategoryController {
    async create(req, res) {
        try {
            const {title, user_id} = req.body
            const category = await CategoryService.create(title, user_id)
            res.json(category)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getAll(req, res) {
        try {
            const categories = await CategoryService.getAll(req.user.id)
            return res.json(categories)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async update(req, res) {
        try {
            const category = await CategoryService.update(req.body)
            return res.json(category)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async delete(req, res) {
        try {
            const deletedCategoryCount = await CategoryService.delete(req.params.id)
            return res.json(deletedCategoryCount)
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

module.exports = new CategoryController()
