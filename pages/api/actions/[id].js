import connectDB from "../../../utils/connectDB";
import auth from "../../../middleware/auth";
const mysql = require("mysql2");

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getAction(req, res);
      break;
    case "PUT":
      await updateAction(req, res);
      break;
    case "DELETE":
      await deleteAction(req, res);
      break;
    default:
      break;
  }
};

const getAction = async (req, res) => {
  try {
    const { id } = req.query;

    const connection = mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    connection.connect();

    const selectActionQuery = `SELECT * FROM actions WHERE id = ?`;
    connection.query(selectActionQuery, [id], (error, result) => {
      if (error) {
        throw error;
      }
      const action = result;
      if (!action) return res.status(400).json({ err: "Такой акции нет" });
      res.json({ action });
    });

    connection.end();
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const updateAction = async (req, res) => {
  try {
    const results = await auth(req, res);
    if (!results || results.role !== "admin") {
      return res.status(500).json({ err: "Authtication is not valid" });
    }
    const { id } = req.query;
    const { title, info, image } = req.body;
    if (!title || !info || image.length === 0)
      return res.status(500).json({ err: "Incomplete data" });
    const connection = mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    connection.connect((err) => {
      if (err) {
        return res.status(500).json({ err: err.message });
      }
    });
    const updateActionQuery =
      "UPDATE actions SET title=?, info=?, image=? WHERE id=?";
    await connection.execute(updateActionQuery, [title, info, image, id]);
    res.json({ msg: "Акция успешно обновлена" });
    connection.end();
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const deleteAction = async (req, res) => {
  try {
    const results = await auth(req, res);
    if (!results || results.role !== "admin") {
      return res.status(500).json({ err: "Authtication is not valid" });
    }
    const { id } = req.query;
    const connection = mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    connection.connect((err) => {
      if (err) {
        return res.status(500).json({ err: err.message });
      }
    });
    const deleteActionQuery = `DELETE FROM actions WHERE id=?`;
    await connection.execute(deleteActionQuery, [id]);
    res.json({ msg: "Акция успешно удалена" });
    connection.end();
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
