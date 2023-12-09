import connectDB from "../../../utils/connectDB";
const mysql = require("mysql2");
import auth from "../../../middleware/auth";
connectDB();
export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getServices(req, res);
      break;
    case "POST":
      await createService(req, res);
    default:
      break;
  }
};

const getServices = async (req, res) => {
  try {
    const connection = mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    connection.connect();

    const selectServicesQuery = `SELECT * FROM services`;
    connection.query(selectServicesQuery, (error, results) => {
      if (error) {
        throw error;
      }
      const services = results;
      res.json({
        status: "success",
        result: services.length,
        services,
      });
    });

    connection.end();
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const createService = async (req, res) => {
  try {
    const admin = await auth(req, res);
    if (!admin || admin.role !== "admin") {
      return res.status(500).json({ err: "Authentication is not valid" });
    }
    const { title, intro, image, description } = req.body;
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    const createServiceQuery = `INSERT INTO services (title, intro, image, description) VALUES (?, ?, ?, ?)`;
    const results = await connection.execute(createServiceQuery, [
      title,
      intro,
      image,
      description,
    ]);

    const services = results;
    res.json({
      status: "success",
      result: services ? services.length : 0,
      services,
      msg: "Услуга успешно добавлена",
    });

    connection.end();
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
