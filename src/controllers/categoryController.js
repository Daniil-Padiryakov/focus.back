import CategoryService from "../services/categoryService.js";

class CategoryController {
    async create(req, res) {
        try {
            const category = await CategoryService.create(req.body)
            res.json(category)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getAll(req, res) {
        try {
            console.log(req.user.id)
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
            res.status(500).json(e.message)
        }
    }

    async delete(req, res) {
        try {
            const category = await CategoryService.delete(req.params.id)
            return res.json(category)
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

export default new CategoryController()