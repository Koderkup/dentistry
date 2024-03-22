import connectDB from "../../../utils/connectDB";
import auth from "../../../middleware/auth";
const mysql = require("mysql2");

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getSubService(req, res);
      break;
    case "PUT":
      await updateSubService(req, res);
      break;
    default:
      break;
  }
};

const getSubService = async (req, res) => {
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

    const selectSubServiceQuery = `
     SELECT subservices.*, services.title, services.intro, services.image, services.description
     FROM subservices
     LEFT JOIN services ON subservices.serviceId = services.id
      WHERE subservices.id = ?
     `;
    connection.query(selectSubServiceQuery, [id], (error, result) => {
      if (error) {
        throw error;
      }
      const subservice = result;
      if (!subservice) return res.status(400).json({ err: "Такой услуги нет" });
      res.json({ subservice });
    });

    connection.end();
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const updateSubService = async (req, res) => {
  try {
    const results = await auth(req, res);
    if (!results || results.role !== "admin") {
      return res.status(500).json({ err: "Authtication is not valid" });
    }
    const { id } = req.query;
    const { subtitle, article, subimage, serviceId } = req.body;
    if (!subtitle || !article || subimage.length === 0 || !serviceId)
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
    const updateSubServiceQuery =
      "UPDATE subservices SET subtitle=?, article=?, subimage=?, serviceId=? WHERE id=?";
    await connection.execute(updateSubServiceQuery, [
      subtitle,
      article,
      subimage,
      serviceId,
      id,
    ]);
    res.json({ msg: "Данные успешно обновлены" });
    connection.end();
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
