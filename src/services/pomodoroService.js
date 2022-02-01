import Pomodoro from "../models/pomodoro.js";

class pomodoroService {
    async create(pomodoro) {
        const createdPomodoro = await Pomodoro.create(pomodoro)
        return createdPomodoro
    }

    async getAll() {
        const pomodoros = await Pomodoro.find()
        return pomodoros
    }
}

export default new pomodoroService()