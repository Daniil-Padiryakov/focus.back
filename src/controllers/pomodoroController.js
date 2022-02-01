import PomodoroService from "../services/pomodoroService.js";

class PomodoroController {
    async create(req, res) {
        try {
            const pomodoro = await PomodoroService.create(req.body)
            res.json(pomodoro)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getAll(req, res) {
        try {
            const pomodoros = await PomodoroService.getAll()
            return res.json(pomodoros)
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

export default new PomodoroController()