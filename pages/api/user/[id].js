import connectDB from "../../../utils/connectDB";
import mysql from "mysql2";
import auth from "../../../middleware/auth";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "PATCH":
      await updateRole(req, res);
      break;
    case "DELETE":
      await deleteUser(req, res);
      break;
  }
};

const updateRole = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== "admin" || !result.root)
      return res.status(400).json({ err: "Authentication is not valid" });
    const { id } = req.query;
    const { role } = req.body;
    const connection = mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    connection.connect();
    const updateUsersQuery = `UPDATE users SET role = ? WHERE id = ?`;
    connection.query(updateUsersQuery, [role, id], (error, results) => {
      if (error) {
        throw error;
      }
      res.json({ msg: "Update Success!" });
      connection.end();
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== "admin" || !result.root)
      return res.status(400).json({ err: "Authentication is not valid" });
    const { id } = req.query;
    const connection = mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    connection.connect();
    const deleteUserQuery = `DELETE FROM users WHERE id = ?`;
    connection.query(deleteUserQuery, [id], (error, results) => {
      if (error) {
        throw error;
      }
      res.json({ msg: "Deleted Success!" });
      connection.end();
    });
    
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
