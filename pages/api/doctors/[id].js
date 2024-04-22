import connectDB from "../../../utils/connectDB";
import auth from "../../../middleware/auth";
const mysql = require("mysql2");

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getDoctor(req, res);
      break;
    case "PUT":
      await updateDoctor(req, res);
      break;
    case "DELETE":
      await deleteDoctor(req, res);
      break;
    default:
      break;
  }
};

const getDoctor = async (req, res) => {
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

    const selectDoctorQuery = `SELECT * FROM doctors WHERE id = ?`;
    connection.query(selectDoctorQuery, [id], (error, result) => {
      if (error) {
        throw error;
      }
      const doctor = result;
      if (!doctor) return res.status(400).json({ err: "Такого врача нет" });
      res.json({ doctor });
    });

    connection.end();
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const updateDoctor = async (req, res) => {
  try {
    const results = await auth(req, res);
    if (!results || results.role !== "admin") {
      return res.status(500).json({ err: "Authtication is not valid" });
    }
    const { id } = req.query;
    const { sirname, fullname, proff, avatar, description } = req.body;
    if (!sirname || !fullname || !proff || avatar.length === 0 || !description)
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
    const updateDoctorQuery =
      "UPDATE doctors SET sirname=?, fullname=?, proff=?, avatar=?, description=? WHERE id=?";
    await connection.execute(updateDoctorQuery, [
      sirname,
      fullname,
      proff,
      avatar,
      description,
      id,
    ]);
    res.json({ msg: "Данные успешно обновлены" });
    connection.end();
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const deleteDoctor = async (req, res) => {
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
    const deleteDoctorQuery = "DELETE FROM doctors WHERE id=?";
    await connection.execute(deleteDoctorQuery, [id]);
    res.json({ msg: "Данные успешно удалены" });
    connection.end();
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
