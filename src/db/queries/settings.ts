const initSettings = `INSERT INTO "settings" (
    work_time, short_rest_time, long_rest_time, 
    work_for_long_rest, autostart_work, autostart_rest, 
    user_id) VALUES ($1, $2, $3, $4, $5, $6, $7)`;

const getSettings = 'SELECT * from "settings" WHERE user_id = $1';

const updateSettings = `UPDATE "settings" SET
    work_time = $1,
    short_rest_time = $2,
    long_rest_time = $3,
    work_for_long_rest = $4,
    autostart_work = $5,
    autostart_rest = $6
    WHERE user_id = $7`;

export default {
  initSettings,
  getSettings,
  updateSettings,
};
