import { pool } from "../db.js";

export const getPong = async (req, res) => {
  const [result] = await pool.query('SELECT "Pong" AS result');
  res.send(result[0]);
};
