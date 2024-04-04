import connectDB from "../../../utils/connectDB";
const mysql = require("mysql2");
connectDB();
export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getSubserviceDirections(req, res);
      break;
    default:
      break;
  }
};

const getSubserviceDirections = async (req, res) => {
  try {
    const { subserviceId } = req.query;
    const connection = mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    connection.connect();

    const selectSubserviceDirectionsQuery = `SELECT * FROM subservice_direction WHERE subserviceId=?`;
    connection.query(
      selectSubserviceDirectionsQuery,
      [subserviceId],
      (error, results) => {
        if (error) {
          throw error;
        }
        const subServiceDirections = results;
        res.json({
          status: "success",
          result: subServiceDirections.length,
          subServiceDirections,
        });
      }
    );

    connection.end();
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
