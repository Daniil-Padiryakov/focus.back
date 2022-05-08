const addUser = `INSERT INTO "user" (email, password) VALUES ($1, $2)`;
const getLastUser = `SELECT id, email from "user" ORDER BY id DESC LIMIT 1`;

module.exports = {
    addUser,
    getLastUser
}
