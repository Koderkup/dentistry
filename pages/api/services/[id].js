import connectDB from "../../../utils/connectDB";
import auth from "../../../middleware/auth";
const mysql = require("mysql2");

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getService(req, res);
      break;
    case "PUT":
      await updateService(req, res);
      break;
    default:
      break;
  }
};

const getService = async (req, res) => {
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

    const selectServiceQuery = `SELECT * FROM services WHERE id = ?`;
    connection.query(selectServiceQuery, [id], (error, result) => {
      if (error) {
        throw error;
      }
      const service = result;
      if (!service) return res.status(400).json({ err: "Такой услуги нет" });
      res.json({ service });
    });

    connection.end();
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const updateService = async (req, res) => {
  try {
    const results = await auth(req, res);
    if (!results || results.role !== "admin") {
      return res.status(500).json({ err: "Authtication is not valid" });
    }
    const { id } = req.query;
    const { title, intro, image, description } = req.body;
    if (!title || !intro || image.length === 0 || !description)
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
    const updateServiceQuery =
      "UPDATE services SET title=?, intro=?, image=?, description=? WHERE id=?";
    await connection.execute(updateServiceQuery, [
      title,
      intro,
      image,
      description,
      id,
    ]);
    res.json({ msg: "Данные успешно обновлены" });
    connection.end();
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
