const Pomodoro = require('../models/pomodoro.js')

class pomodoroService {
    async create(pomodoro) {
        console.log(pomodoro)
        const {duration, categoryId, userId} = pomodoro
        const createdPomodoro = await Pomodoro.create({duration, categoryId, userId})
        console.log(createdPomodoro)
        return createdPomodoro
    }

    async getAll() {
        const pomodoros = await Pomodoro.findAll()
        return pomodoros
    }
}

module.exports = new pomodoroService()
