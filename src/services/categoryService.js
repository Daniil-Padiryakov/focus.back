const Category = require('../models/category.js')
const pool = require("../db/db");
const queries = require("../db/queries/category");

class CategoryService {
    async create(title, user_id) {
        const createdCategory = await pool.query(queries.addCategory, [title, user_id])
            .then(async res => {
                const categoryRes = await pool.query(queries.getLastCategory, [user_id]).catch(err =>
                    setImmediate(() => {
                        throw err
                    })
                )
                return categoryRes.rows[0]
            })
            .catch(err =>
                setImmediate(() => {
                throw err
            }))
        return createdCategory
    }

    async getAll(user_id) {
        if (!user_id) {
            throw new Error('Не был указан ID пользователя')
        }
        const allCategories = await pool
            .query(queries.getAllCategoriesByUserId, [user_id])
            .catch(err =>
                setImmediate(() => {
                    throw err
                })
            )
        return allCategories.rows
    }

    async update(category) {
        if (!category.id) {
            throw new Error('Не был указан ID категории')
        }
        const updatedCategory = await pool
            .query(queries.updateCategory, [category.title, category.id]).then(
                (async res => {
                    const categoryRes = await pool.query(queries.getCategoryById, [category.id]).catch(err =>
                        setImmediate(() => {
                            throw err
                        })
                    )
                    return categoryRes.rows[0]
                })
            )
            .catch(err =>
                setImmediate(() => {
                    throw err
                })
            )
        return updatedCategory
    }

    async delete(id) {
        if (!id) {
            throw new Error('Не был указан ID категории')
        }
        const deleteCategoryRes = await pool
            .query(queries.deleteCategoryById, [id])
            .catch(err =>
                setImmediate(() => {
                    throw err
                })
            )
        return {rowCount: deleteCategoryRes.rowCount}
    }
}

module.exports = new CategoryService()
