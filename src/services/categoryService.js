const Category = require('../models/category.js')

class CategoryService {
    async create(category) {
        const {title, userId} = category
        const createdCategory = await Category.create({title, userId})
        return createdCategory
    }

    async getAll(id) {
        if (!id) {
            throw new Error('Не был указан ID пользователя')
        }
        const categories = await Category.findAll({
            where: {
                userId: id
            }
        })
        return categories
    }

    async update(category) {
        if (!category.id) {
            throw new Error('Не был указан ID категории')
        }
        const updatedCategory = await Category.update(
            {
                title: category.title
            },
            {
                where: {
                    id: category.id
                },
                returning: true
            })
        return updatedCategory
    }

    async delete(id) {
        if (!id) {
            throw new Error('Не был указан ID категории')
        }
        const category = await Category.destroy({
            where: {
                id: id
            },
        })
        return category
    }
}

module.exports = new CategoryService()
