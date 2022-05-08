const { Pool } = require('pg')

const pool = new Pool({
    host: '127.0.0.1',
    port: 5432,
    database: 'focus_test',
    user: 'postgres',
    password: 'root'
})

module.exports = pool
