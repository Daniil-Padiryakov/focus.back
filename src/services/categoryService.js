import Category from "../models/category.js";

class CategoryService {
    async create(category) {
        const createdCategory = await Category.create(category)
        return createdCategory
    }

    async getAll(id) {
        if (!id) {
            throw new Error('Не был указан ID пользователя')
        }
        const categories = await Category.find({
            user: id
        })
        return categories
    }

    async update(category) {
        if (!category._id) {
            throw new Error('Не был указан ID категории')
        }
        const updatedCategory = await Category.findByIdAndUpdate(
            category._id,
            category,
            {new: true}
        )
        return updatedCategory
    }

    async delete(id) {
        if (!id) {
            throw new Error('Не был указан ID категории')
        }
        const category = await Category.findByIdAndDelete(id)
        return category
    }
}

export default new CategoryService()