import connectDB from "../../../utils/connectDB";
const mysql = require("mysql2");
import auth from "../../../middleware/auth";
connectDB();
export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getSubservices(req, res);
      break;
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


