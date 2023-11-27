import connectDB from "../../../utils/connectDB";
const mysql = require("mysql2");

connectDB();
export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getServices(req, res);
      break;
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
