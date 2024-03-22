import connectDB from "../../../utils/connectDB";
const mysql = require("mysql2");
import auth from "../../../middleware/auth";
connectDB();
export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getSubservices(req, res);
      break;
      case "POST":
        await createSubservices(req, res);
    default:
      break;
  }
};

const getSubservices = async (req, res) => {
  try {
    const connection = mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    connection.connect();

    const selectSubservicesQuery = `SELECT * FROM subservices`;
    connection.query(selectSubservicesQuery, (error, results) => {
      if (error) {
        throw error;
      }
      const subServices = results;
      res.json({
        status: "success",
        result: subServices.length,
        subServices,
      });
    });

    connection.end();
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const createSubservices = async (req, res) => {
  try {
    const admin = await auth(req, res);
    if (!admin || admin.role !== "admin") {
      return res.status(500).json({ err: "Authentication is not valid" });
    }
    const { subtitle, article, subimage, serviceId } = req.body;
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    const createSubserviceQuery = `INSERT INTO subservices (subtitle, article, subimage, serviceId) VALUES (?, ?, ?, ?)`;
    const results = await connection.execute(createSubserviceQuery, [
      subtitle,
      article,
      subimage,
      serviceId,
    ]);

    const subservices = results;
    res.json({
      status: "success",
      result: subservices ? subservices.length : 0,
      subservices,
      msg: "Услуга успешно добавлена",
    });

    connection.end();
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};


