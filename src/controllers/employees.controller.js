import { pool } from "../db.js";

export const getEmployees = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM employees");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getEmployeeById = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM employees WHERE id = ?", [
      req.params.id,
    ]);
    if (rows.length <= 0)
      return res.status(404).json({ message: "Employee Not Found" });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Something goes wrong" });
  }
};

export const createEmployees = async (req, res) => {
  const { name, salary } = req.body;
  try {
    const [row] = await pool.query(
      "INSERT INTO employees (name, salary) VALUES (?, ?)",
      [name, salary]
    );
    res.send({
      id: row.insertId,
      name,
      salary,
    });
  } catch (error) {
    res.status(500).json({ message: "Something goes wrong" });
  }
};

export const updateEmployees = async (req, res) => {
  const { id } = req.params;
  const { name, salary } = req.body;
  try {
    const [result] = await pool.query(
      "UPDATE employees SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id = ?",
      [name, salary, id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Employee Not Found" });
    const [rows] = await pool.query("SELECT * FROM employees WHERE id = ?", [
      id,
    ]);
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Something goes wrong" });
  }
};

export const deleteEmployees = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM employees WHERE id = ?", [
      req.params.id,
    ]);
    if (result.affectedRows <= 0)
      return res.status(404).json({ message: "Employee Not Found" });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: "Something goes wrong" });
  }
};
