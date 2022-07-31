const addCategory = 'INSERT INTO "category" (title, user_id) VALUES ($1, $2)';
const getAllCategoriesByUserId = 'SELECT * from "category" WHERE user_id = $1';
const getLastCategory =
  'SELECT * from "category" WHERE user_id = $1 ORDER BY id DESC LIMIT 1';
const updateCategory = 'UPDATE "category" SET title = $1 WHERE id = $2';
const getCategoryById = 'SELECT * from "category" WHERE id = $1';
const deleteCategoryById = 'DELETE from "category" WHERE id = $1';

export const queries = {
  addCategory,
  getAllCategoriesByUserId,
  getLastCategory,
  updateCategory,
  getCategoryById,
  deleteCategoryById,
};
