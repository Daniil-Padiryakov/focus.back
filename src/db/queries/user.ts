const addUser = 'INSERT INTO "user" (email, password) VALUES ($1, $2)';
const getLastUser = 'SELECT id, email from "user" ORDER BY id DESC LIMIT 1';
const getUserByEmail = 'SELECT * from "user" WHERE email = $1';

export default {
  addUser,
  getLastUser,
  getUserByEmail,
};
