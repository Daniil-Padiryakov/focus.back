const addPomodoro =
  'INSERT INTO "pomodoro" (duration, user_id, category_id) VALUES ($1, $2, $3)';
const getLastPomodoro =
  'SELECT * from "pomodoro" WHERE user_id = $1 ORDER BY id DESC LIMIT 1';
const getAllPomodorosByUserId = 'SELECT * from "pomodoro" WHERE user_id = $1';

export default {
  addPomodoro,
  getLastPomodoro,
  getAllPomodorosByUserId,
};
