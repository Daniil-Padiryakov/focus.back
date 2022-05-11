const Pomodoro = require('../models/pomodoro.js')
const pool = require("../db/db");
const queries = require("../db/queries/pomodoro");

class pomodoroService {
    async create(pomodoro) {
        const {duration, user_id, category_id} = pomodoro
        const createdPomodoro = await pool.query(queries.addPomodoro, [duration, user_id, category_id])
            .then(async res => {
                const pomodoroRes = await pool.query(queries.getLastPomodoro, [user_id]).catch(err =>
                    setImmediate(() => {
                        throw err
                    })
                )
                return pomodoroRes.rows[0]
            })
            .catch(err =>
                setImmediate(() => {
                    throw err
                }))
        return createdPomodoro
    }

    async getAll(userId) {
        const pomodoros = await pool.query(queries.getAllPomodorosByUserId, [userId]).catch(err =>
            setImmediate(() => {
                throw err
            })
        )
        console.log(pomodoros.rows)
        return pomodoros.rows
    }
}

module.exports = new pomodoroService()
